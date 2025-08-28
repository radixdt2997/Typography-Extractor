import { Card } from "@/components/ui/card";
import { Type, Sparkles } from "lucide-react";

interface FontFamiliesPreviewProps {
  fonts: readonly string[];
}

export function FontFamiliesPreview({ fonts }: FontFamiliesPreviewProps) {
  return (
    <Card className="p-8 bg-white shadow-lg border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
          <Type className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Font Families Used
          </h3>
          <p className="text-sm text-gray-600">
            {fonts.length} unique font{" "}
            {fonts.length === 1 ? "family" : "families"} detected
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fonts.slice(0, 12).map((font, index) => (
          <div
            key={index}
            className="group p-6 border-2 border-gray-100 rounded-xl hover:shadow-lg hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                Font Family #{index + 1}
              </div>
              {index < 3 && <Sparkles className="w-4 h-4 text-yellow-500" />}
            </div>

            <div
              className="font-bold text-gray-900 truncate mb-3 text-lg group-hover:text-emerald-700 transition-colors duration-200"
              style={{ fontFamily: font }}
              title={font}
            >
              {font}
            </div>

            <div className="space-y-2">
              <div
                className="text-sm text-gray-600 leading-relaxed"
                style={{ fontFamily: font }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div
                className="text-xs text-gray-500 uppercase tracking-wide"
                style={{ fontFamily: font }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </div>
              <div
                className="text-lg text-gray-700 font-bold"
                style={{ fontFamily: font }}
              >
                1234567890
              </div>
            </div>
          </div>
        ))}
      </div>

      {fonts.length > 12 && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
            <Type className="w-4 h-4 mr-2" />+{fonts.length - 12} more font
            families detected
          </div>
        </div>
      )}
    </Card>
  );
}
