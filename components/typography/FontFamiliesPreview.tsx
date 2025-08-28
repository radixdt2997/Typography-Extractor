import { Card } from "@/components/ui/card";
import { Type } from "lucide-react";

interface FontFamiliesPreviewProps {
  fonts: readonly string[];
}

export function FontFamiliesPreview({ fonts }: FontFamiliesPreviewProps) {
  return (
    <Card className="p-6 bg-white shadow-sm border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Type className="w-5 h-5 mr-2 text-blue-600" />
        Font Families Used
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fonts.slice(0, 9).map((font, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-blue-300"
          >
            <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
              Font Family
            </div>
            <div
              className="font-semibold text-gray-900 truncate mb-2"
              style={{ fontFamily: font }}
            >
              {font}
            </div>
            <div className="text-sm text-gray-600" style={{ fontFamily: font }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
