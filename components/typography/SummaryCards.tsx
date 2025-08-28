import { Card } from "@/components/ui/card";
import { Type, Palette, Hash, FileText } from "lucide-react";

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
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      textColor: "text-blue-700",
      subtitleColor: "text-blue-600",
      iconColor: "text-blue-600",
    },
    {
      title: "Font Families",
      value: summary.uniqueFonts.length,
      icon: Type,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      border: "border-emerald-200",
      textColor: "text-emerald-700",
      subtitleColor: "text-emerald-600",
      iconColor: "text-emerald-600",
    },
    {
      title: "Font Sizes",
      value: summary.fontSizes.length,
      icon: Hash,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      textColor: "text-purple-700",
      subtitleColor: "text-purple-600",
      iconColor: "text-purple-600",
    },
    {
      title: "Text Colors",
      value: summary.colors.length,
      icon: Palette,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      textColor: "text-orange-700",
      subtitleColor: "text-orange-600",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card
            key={index}
            className={`p-6 bg-gradient-to-br ${card.bgGradient} ${card.border} hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-default`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 bg-white rounded-lg shadow-sm`}>
                <IconComponent className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </div>
            </div>
            <div className={`text-sm ${card.subtitleColor} font-semibold`}>
              {card.title}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
