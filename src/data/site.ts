import {
  Activity,
  ArrowUpRight,
  Dumbbell,
  Flame,
  HeartPulse,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Oi! Vim pelo site e quero saber como funciona a aula experimental na Box Louveira"
);

const whatsappNumber =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "5519998099158";

export const links = {
  plans:
    import.meta.env.VITE_PLANS_URL ??
    "https://app.tecnofit.com.br/ng/online-sale/ODk5NA",

  whatsapp: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
};

export const heroImages = [
  "/Hero/IMG_8323.jpg",
  "/Hero/image00008.jpeg",
  "/Hero/image00010.jpeg",   
];

export const transformations = [
  {
    label: "Evolução Física",
    text: 
      `Ele também achou que não ia dar conta dos exercícios.
      Começou no ritmo dele,com acompanhamento de perto.
      O tempo e a constância fizeram o resto.`,
    before: "/transformations/aluno1-before.jpeg",
    after: "/transformations/aluno1-after.jpeg",
  },

  {
    label: "Mais performance",
    text: 
      `Chegou cheia de receio, como muita gente chega. 
      Ficou pelo grupo, pela leveza de treinar junto. 
      Hoje faz parte da rotina dela.`,
    before: "/transformations/aluno2-before.jpeg",
    after: "/transformations/aluno2-after.jpeg",
  },

  {
    label: "Consistência",
    text: `Não começou atleta. 
    Começou do zero, com treino adaptado ao nível dele desde o primeiro dia. 
    O que mudou não foi só o corpo — foi a disposição do dia a dia.`,

    before: "/transformations/aluno3-before.jpeg",
    after: "/transformations/aluno3-after.jpeg",
  },
];
export const benefits = [
  {
    icon: Target,
    title: "COMEÇA DE ONDE VOCÊ ESTÁ",
    text: "Nunca treinou? Parou faz anos? Tudo bem. O treino se adapta a você — não o contrário. Seu primeiro dia é no seu ritmo.",
  },
  {
    icon: ShieldCheck,
    title: "NINGUÉM TE JOGA NO PESO",
    text: "Movimento certo vem antes de qualquer peso. O professor fica do seu lado, corrige e ajusta. Sem pular etapa e sem se machucar.",
  },
  {
    icon: HeartPulse,
    title: "VOCÊ NÃO DEPENDE SÓ DA VONTADE",
    text: "Já começou e parou várias vezes? A diferença aqui é que tem gente te esperando. Quando a motivação some, a turma te puxa.",
  },
  {
    icon: Users,
    title: "GENTE NORMAL, COMO VOCÊ",
    text: "Mães, pais, quem trabalha o dia todo, quem nunca pisou numa academia. Aqui ninguém olha torto — todo mundo já foi novato um dia.",
  },
];

export const schedules = [
  {
    title: "Cross Training",
    description:
      "Treinos para todos os níveis, com foco em condicionamento, força e performance.",
    button: "Conhecer os Planos",
    href: "https://app.tecnofit.com.br/ng/online-sale/ODk5NA/checkout/Mzc0NDky",
    icon: Dumbbell,
    times: [
      "06:00",
      "07:00",
      "08:00",
      "16:00",
      "17:20",
      "18:20",
      "19:20",
      "20:20",
    ],
  },

  {
    title: "Muay Thai",
    description:
      "Aulas para iniciantes e avançados, desenvolvendo técnica, disciplina e condicionamento.",
    button: "Conhecer os Planos",
    href: "https://app.tecnofit.com.br/ng/online-sale/ODk5NA/checkout/NTYzODg4",
    icon: Trophy,
    times: [
      "Terça • 06:30",
      "Quinta • 06:30",
      "Segunda • 19:00",
      "Quarta • 19:00",
      "Segunda a Quinta • 20:20",
    ],
  },
];

export const methodSteps = [
  {
    title: "CONVERSA",
    text: "A gente escuta você primeiro. Quanto tempo parada, o que já tentou, o que te trava.",
  },
  {
    title: "SEU PONTO DE PARTIDA",
    text: "Sem comparação com ninguém. O treino começa de onde você está hoje.",
  },
  {
    title: "PRIMEIRO TREINO",
    text: "Alguém do seu lado, movimento por movimento. Sem peso, sem pressa.",
  },
  {
    title: "ALGUÉM TE ESPERA",
    text: "Sumiu? A gente chama. Aqui você não passa batido.",
  },
  {
    title: "VOCÊ SENTE A DIFERENÇA",
    text: "Subir escada sem cansar, dormir melhor, ter disposição. A vida muda antes do espelho.",
  },
  {
    title: "VIRA ROTINA",
    text: "Chega o dia em que você não precisa de motivação — você só não quer faltar.",
  },
];

export const numbers = [
  {
    value: "+130",
    label: "alunos ativos",
    icon: Users,
  },
  {
    value: "8 anos",
    label: "de história",
    icon: Flame,
  },
  {
    value: "+1000",
    label: "vidas transformadas",
    icon: Trophy,
  },
  {
    value: "Treinos",
    label: "Todos os dias",
    icon: Dumbbell,
  },
];

export const testimonials = [
  {
    name: "Pedro",
    role: "Aluno Box Louveira",

    text:
      "Os resultados apareceram muito mais rápido do que eu imaginava.",

    title: "Feedback do Pedro",

    video: "/TestimonialsVideo/Pedro.mp4",
  },

  {
    name: "Ana",
    role: "Aluna Box Louveira",

    text:
      "Aqui eu descobri que sou capaz de muito mais do que imaginava.",

    title: "Feedback da Ana",

    video: "/TestimonialsVideo/Ana.mp4",
  },

  {
    name: "Melhores momentos",
    role: "Alunos Box Louveira",

    text:
      "A melhor parte não é chegar ao objetivo, é perceber o quanto você evoluiu no caminho.",

    title: "Transformações Reais",

    video: "/TestimonialsVideo/Melhoresmomentos.mp4",
  },
];

export const footerLinks = [
  { label: "Instagram", href: "https://www.instagram.com/boxlouveira" },
  { label: "WhatsApp", href: links.whatsapp },
  { label: "Planos", href: links.plans },
];

export const visualIcons = {
  activity: Activity,
  arrow: ArrowUpRight,
  trophy: Trophy,
};

export const quotes = {
  wellington: {
    quote:
      "Eu achava que Cross Training era só para quem já era atleta. Hoje vejo que qualquer pessoa consegue evoluir quando encontra um lugar que realmente acompanha você.",
    author: "Wellington",
  },

  adilma: {
    quote:
      "Achei que não conseguiria acompanhar os treinos, mas descobri que cada pessoa evolui no seu próprio ritmo.",
    author: "Adilma",
  },

  vera: {
    quote:
      "O Muay Thai me fez recuperar minha confiança e ainda encontrei uma equipe que me incentivou desde o primeiro dia.",
    author: "Vera",
  },

  joyce: {
    quote:
      "Eu já tinha tentado academia várias vezes. Aqui foi a primeira vez que realmente consegui criar uma rotina.",
    author: "Joyce",
  },

  marinalva: {
    quote:
      "Mais do que um lugar para treinar, encontrei pessoas que me acolheram e me fizeram sentir parte da família Box Louveira.",
    author: "Marinalva",
  },

  bruna: {
    quote:
      "Eu tinha vergonha de começar. Hoje percebo que dar o primeiro passo foi a melhor decisão que tomei.",
    author: "Bruna",
  },
};