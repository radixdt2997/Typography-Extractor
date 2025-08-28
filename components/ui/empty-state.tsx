import { Card } from "@/components/ui/card";
import { Type, Search, Globe, Zap } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="p-12 text-center bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-gray-200">
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto w-fit">
            <Type className="w-12 h-12 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 p-1 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Ready to Analyze Typography
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Enter a website URL above to extract and analyze its typography
            styles. Get detailed insights about fonts, sizes, colors, and more.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg mb-2">
              <Search className="w-6 h-6 text-blue-600 mx-auto" />
            </div>
            <div className="text-xs text-gray-600 font-medium">Extract</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-50 rounded-lg mb-2">
              <Type className="w-6 h-6 text-purple-600 mx-auto" />
            </div>
            <div className="text-xs text-gray-600 font-medium">Analyze</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-emerald-50 rounded-lg mb-2">
              <Globe className="w-6 h-6 text-emerald-600 mx-auto" />
            </div>
            <div className="text-xs text-gray-600 font-medium">Visualize</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
