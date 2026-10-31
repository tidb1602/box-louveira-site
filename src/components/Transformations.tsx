import { SectionHeader } from "./SectionHeader";
import { TransformationsList } from "./transformations/TransformationsList";
import { transformations } from "../data/site";

export function Transformations() {
  return (
    <section className="bg-[#050505] px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        <SectionHeader
          eyebrow="Transformações"
          title="Resultados que aparecem fora do treino."
          description="Cada transformação representa disciplina, constância e uma decisão diária de não desistir."
        />

        <TransformationsList items={transformations} />

      </div>
    </section>
  );
}