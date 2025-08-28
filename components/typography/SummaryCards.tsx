import { Card } from "@/components/ui/card";

interface SummaryCardsProps {
  summary: {
    totalElements: number;
    uniqueFonts: readonly string[];
    fontSizes: readonly string[];
    colors: readonly string[];
  };
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: "Text Elements",
      value: summary.totalElements,
      gradient: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      textColor: "text-blue-700",
      subtitleColor: "text-blue-600",
    },
    {
      title: "Font Families",
      value: summary.uniqueFonts.length,
      gradient: "from-emerald-50 to-emerald-100",
      border: "border-emerald-200",
      textColor: "text-emerald-700",
      subtitleColor: "text-emerald-600",
    },
    {
      title: "Font Sizes",
      value: summary.fontSizes.length,
      gradient: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      textColor: "text-purple-700",
      subtitleColor: "text-purple-600",
    },
    {
      title: "Text Colors",
      value: summary.colors.length,
      gradient: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      textColor: "text-orange-700",
      subtitleColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`p-4 bg-gradient-to-br ${card.gradient} ${card.border}`}
        >
          <div className="text-center">
            <div className={`text-2xl font-bold ${card.textColor}`}>
              {card.value}
            </div>
            <div className={`text-sm ${card.subtitleColor} font-medium`}>
              {card.title}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
