import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyData } from "@/types/typography";
import { Copy, Type } from "lucide-react";
import { ElementInfo } from "./ElementInfo";
import { TypographyStyles } from "./TypographyStyles";

interface CSSPropertiesPanelProps {
  typographyData: TypographyData;
  selectedElement: string | null;
  onCopyStyles: () => void;
}

export function CSSPropertiesPanel({
  typographyData,
  selectedElement,
  onCopyStyles,
}: CSSPropertiesPanelProps) {
  const selectedElementData = selectedElement
    ? typographyData.elements.find((el) => el.id === selectedElement)
    : null;

  return (
    <Card className="p-4 bg-white shadow-sm border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-gray-600" />
          <span className="font-semibold text-gray-700">CSS Properties</span>
        </div>
        {selectedElementData && (
          <Button variant="outline" size="sm" onClick={onCopyStyles}>
            <Copy className="w-3 h-3 mr-1" />
            Copy CSS
          </Button>
        )}
      </div>

      {selectedElementData ? (
        <div className="space-y-4">
          <ElementInfo element={selectedElementData} />
          <TypographyStyles styles={selectedElementData.styles} />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">
            Click on any text element in the preview to view its CSS properties
          </p>
        </div>
      )}
    </Card>
  );
}
