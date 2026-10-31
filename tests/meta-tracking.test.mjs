import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { compileFunction } from "node:vm";
import { fileURLToPath } from "node:url";
import { beforeEach, afterEach, test } from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modules = new Map();

// Usa o TypeScript já instalado, sem gerar arquivos ou adicionar dependências.
// Só useMemo/animação são substituídos; os elementos e handlers React são reais.
function load(relativePath) {
  const path = resolve(root, relativePath);
  if (modules.has(path)) return modules.get(path).exports;
  const source = readFileSync(path, "utf8").replaceAll("import.meta.env", "({})");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    fileName: path,
  });
  const module = { exports: {} };
  modules.set(path, module);
  const localRequire = (name) => {
    if (name === "react") return { ...require("react"), useMemo: (factory) => factory() };
    if (name === "motion/react") return { motion: new Proxy({}, { get: (_, tag) => tag }) };
    if (!name.startsWith(".")) return require(name);
    const base = resolve(dirname(path), name);
    return load([base, `${base}.ts`, `${base}.tsx`].find(existsSync));
  };
  compileFunction(outputText, ["require", "module", "exports"], { filename: path })(localRequire, module, module.exports);
  return module.exports;
}

const { trackWhatsAppLead } = load("src/utils/metaPixel.ts");
const handler = load("api/meta-event.ts").default;
const { links } = load("src/data/site.ts");
const components = ["Hero", "Footer", "FinalCta", "Schedule"].map((name) =>
  load(`src/components/${name}.tsx`)[name]
);

function anchors(node) {
  if (Array.isArray(node)) return node.flatMap(anchors);
  if (!node || typeof node !== "object") return [];
  return [...(node.type === "a" ? [node] : []), ...anchors(node.props?.children)];
}

let pixelCalls, requests, savedEnv;
const originalFetch = globalThis.fetch;
beforeEach(() => {
  pixelCalls = [];
  requests = [];
  globalThis.window = { fbq: (...args) => pixelCalls.push(args), location: { href: "https://box.example/aula?utm_source=test" } };
  globalThis.document = { cookie: "_fbp=fb.1.123.browser;_fbc=fb.1.123.click" };
  globalThis.fetch = (url, options) => {
    requests.push({ url, options, body: JSON.parse(options.body) });
    return Promise.resolve({ ok: true, status: 200, json: async () => ({ events_received: 1 }) });
  };
  savedEnv = { ...process.env };
  process.env.META_PIXEL_ID = "test-pixel";
  process.env.META_ACCESS_TOKEN = "test-token";
});
afterEach(() => {
  process.env = savedEnv;
  globalThis.fetch = originalFetch;
  delete globalThis.window;
  delete globalThis.document;
});

function request(overrides = {}) {
  return {
    method: "POST",
    body: { event_name: "Lead", event_id: "click-123", event_source_url: "https://box.example/aula", fbp: "browser", fbc: "click" },
    headers: { "user-agent": "Test browser", "x-forwarded-for": "invalid, 203.0.113.7, 198.51.100.2" },
    ...overrides,
  };
}
async function invoke(req = request()) {
  const res = { status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
  await handler(req, res);
  return res;
}

test("Pixel Lead e API usam exatamente o mesmo ID, cookies e keepalive", () => {
  assert.equal(trackWhatsAppLead(), undefined);
  assert.equal(pixelCalls.length, 1);
  assert.equal(requests.length, 1);
  const id = requests[0].body.event_id;
  assert.ok(id.length >= 32);
  assert.deepEqual(pixelCalls[0], ["track", "Lead", { content_name: "aula_experimental" }, { eventID: id }]);
  assert.equal(requests[0].url, "/api/meta-event");
  assert.equal(requests[0].options.method, "POST");
  assert.equal(requests[0].options.keepalive, true);
  assert.deepEqual(requests[0].body, { event_name: "Lead", event_id: id, fbp: "fb.1.123.browser", fbc: "fb.1.123.click", event_source_url: window.location.href });
});

test("Cliques distintos recebem IDs distintos", () => {
  trackWhatsAppLead();
  trackWhatsAppLead();
  assert.notEqual(requests[0].body.event_id, requests[1].body.event_id);
});

test("Cookies ausentes ou inacessíveis e Pixel ausente não impedem API", () => {
  delete window.fbq;
  document.cookie = "";
  trackWhatsAppLead();
  assert.equal(requests[0].body.fbp, undefined);
  assert.equal(requests[0].body.fbc, undefined);
  Object.defineProperty(document, "cookie", { get() { throw Error("blocked"); } });
  assert.doesNotThrow(trackWhatsAppLead);
  assert.equal(requests.length, 2);
});

test("Falha do Pixel ainda permite o envio à API", () => {
  window.fbq = () => { throw Error("pixel failed"); };
  assert.doesNotThrow(trackWhatsAppLead);
  assert.equal(requests.length, 1);
});

for (const Component of components.slice(0, 2)) {
  test(`${Component.name}: WhatsApp inicia um Lead e uma requisição sem cancelar navegação`, async () => {
    const whatsapp = anchors(Component()).filter((a) => a.props.href === links.whatsapp);
    assert.equal(whatsapp.length, 1);
    const event = { preventDefault() { assert.fail("Navegação foi cancelada"); } };
    assert.equal(whatsapp[0].props.onClick(event), undefined);
    assert.equal(pixelCalls.length, 1);
    assert.equal(requests.length, 1);
    assert.equal(pixelCalls[0][1], "Lead");
    assert.equal(pixelCalls[0][3].eventID, requests[0].body.event_id);

    for (const failure of [() => Promise.reject(Error("offline")), () => { throw Error("sync failure"); }, () => new Promise(() => {})]) {
      globalThis.fetch = failure;
      assert.equal(whatsapp[0].props.onClick(event), undefined);
      await new Promise((done) => setImmediate(done));
    }
  });
}

for (const Component of components) {
  test(`${Component.name}: links Tecnofit disparam somente InitiateCheckout`, () => {
    const planLinks = anchors(Component()).filter((a) => a.props.href?.includes("tecnofit.com.br"));
    assert.ok(planLinks.length > 0);
    for (const anchor of planLinks) {
      anchor.props.onClick({ currentTarget: { textContent: " Planos " } });
    }
    assert.equal(pixelCalls.length, planLinks.length);
    assert.ok(pixelCalls.every((call) => call[1] === "InitiateCheckout"));
    assert.equal(requests.length, 0);
  });
}

test("Servidor preserva ID, segundos, website, URL, IP, user agent e cookies", async () => {
  const before = Math.floor(Date.now() / 1000);
  assert.equal((await invoke()).code, 200);
  const event = requests[0].body.data[0];
  assert.equal(event.event_id, "click-123");
  assert.equal(event.event_name, "Lead");
  assert.ok(Number.isInteger(event.event_time));
  assert.ok(event.event_time >= before && event.event_time <= Math.floor(Date.now() / 1000));
  assert.equal(event.action_source, "website");
  assert.equal(event.event_source_url, "https://box.example/aula");
  assert.deepEqual(event.user_data, { client_ip_address: "203.0.113.7", client_user_agent: "Test browser", fbp: "browser", fbc: "click" });
});

test("Mesmo clique percorre navegador e servidor sem mudar ID", async () => {
  trackWhatsAppLead();
  await invoke(request({ body: requests[0].body }));
  assert.equal(requests.length, 2);
  assert.equal(requests[1].body.data[0].event_id, pixelCalls[0][3].eventID);
});

test("Servidor aceita IPv6 e headers em lista; seleciona primeiro IP válido", async () => {
  await invoke(request({ headers: { "x-forwarded-for": ["unknown, 2001:db8::1", "203.0.113.8"] } }));
  assert.equal(requests[0].body.data[0].user_data.client_ip_address, "2001:db8::1");
});

test("Servidor omite dados opcionais ausentes ou inválidos sem inventar valores", async () => {
  for (const headers of [{}, { "x-forwarded-for": "unknown, 999.1.1.1", "user-agent": ["invalid"] }]) {
    const req = request({ headers });
    req.body.fbp = {};
    req.body.fbc = "\r\n";
    assert.equal((await invoke(req)).code, 200);
    assert.deepEqual(requests.at(-1).body.data[0].user_data, {});
  }
});

test("Servidor rejeita método, corpo, evento, ID e URL inválidos sem enviar à Meta", async () => {
  assert.equal((await invoke(request({ method: "GET" }))).code, 405);
  for (const body of [undefined, null, [], "{}", {}, { event_name: "Contact" }]) {
    assert.equal((await invoke(request({ body }))).code, 400);
  }
  for (const event_id of [undefined, "", 123, {}, "x".repeat(129), "bad\nID"]) {
    const req = request();
    req.body.event_id = event_id;
    assert.equal((await invoke(req)).code, 400);
  }
  for (const event_source_url of [undefined, {}, "invalid", "javascript:alert(1)", "https://user:pass@box.example"]) {
    const req = request();
    req.body.event_source_url = event_source_url;
    assert.equal((await invoke(req)).code, 400);
  }
  assert.equal(requests.length, 0);
});

test("Configuração ausente é tratada sem enviar requisição", async () => {
  delete process.env.META_ACCESS_TOKEN;
  assert.equal((await invoke()).code, 500);
  assert.equal(requests.length, 0);
});

test("Falhas da Meta não expõem resposta externa nem erro com token", async () => {
  globalThis.fetch = async () => ({ ok: false, status: 400, json: async () => ({ secret: "private details" }) });
  assert.deepEqual((await invoke()).body, { error: "Meta event request failed." });
  globalThis.fetch = async () => { throw Error("private URL with token"); };
  assert.deepEqual((await invoke()).body, { error: "Internal server error." });
});

test("PageView e ID de inicialização permanecem no HTML", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.equal((html.match(/fbq\('track', 'PageView'\)/g) || []).length, 1);
  assert.match(html, /fbq\('init', '1120547154485793'\)/);
});
