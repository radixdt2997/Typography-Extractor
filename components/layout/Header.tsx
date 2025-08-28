import { Badge } from "@/components/ui/badge";
import { Type, Globe } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Type className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Typography Analyzer
              </h1>
              <p className="text-sm text-gray-600">
                Extract and analyze website typography
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50"
          >
            <Globe className="w-3 h-3 mr-1" />
            Web Tool
          </Badge>
        </div>
      </div>
    </header>
  );
}
