import { TransformationCard } from "./TransformationCard";
import { TransformationCardMobile } from "./TransformationCardMobile";

interface Transformation {
  label: string;
  text: string;
  before: string;
  after: string;
}

interface Props {
  items: Transformation[];
}

export function TransformationsList({ items }: Props) {
  return (
    <div className="space-y-10 lg:space-y-24">
      {items.map((item) => (
        <div key={item.label}>
          <div className="hidden lg:block">
            <TransformationCard item={item} />
          </div>
          <div className="lg:hidden">
            <TransformationCardMobile item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}