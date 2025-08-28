import { Badge } from "@/components/ui/badge";
import { Type, Globe, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Type className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                Typography Analyzer
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Extract, analyze & visualize website typography
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className="text-blue-600 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200"
            >
              <Globe className="w-3 h-3 mr-1" />
              Web Tool
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
