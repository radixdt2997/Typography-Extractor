import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyData } from "@/types/typography";
import { Copy, Type, CheckCircle, Code } from "lucide-react";
import { ElementInfo } from "./ElementInfo";
import { TypographyStyles } from "./TypographyStyles";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);
  const selectedElementData = selectedElement
    ? typographyData.elements.find((el) => el.id === selectedElement)
    : null;

  const handleCopyStyles = () => {
    onCopyStyles();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 bg-white shadow-lg border-gray-200 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl">
            <Code className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <span className="font-bold text-gray-800 text-lg">
              CSS Properties
            </span>
            <p className="text-sm text-gray-600">Typography styles & details</p>
          </div>
        </div>
        {selectedElementData && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyStyles}
            className={`transition-all duration-200 ${
              copied
                ? "bg-green-50 border-green-300 text-green-700"
                : "hover:bg-purple-50 hover:border-purple-300"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-3 h-3 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-2" />
                Copy CSS
              </>
            )}
          </Button>
        )}
      </div>

      {selectedElementData ? (
        <div className="space-y-6">
          <ElementInfo element={selectedElementData} />
          <TypographyStyles styles={selectedElementData.styles} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <div className="p-4 bg-gray-50 rounded-full mx-auto w-fit mb-4">
            <Type className="w-8 h-8 opacity-50" />
          </div>
          <div className="space-y-2">
            <p className="font-medium text-gray-700">No Element Selected</p>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Click on any text element in the website preview to view its
              detailed CSS properties and typography styles
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
