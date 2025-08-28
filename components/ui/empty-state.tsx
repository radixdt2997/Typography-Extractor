import { Type } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Type className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Ready to Analyze Typography
      </h3>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
        Enter any website URL above to extract and analyze its complete
        typography information. Click on elements to view their CSS properties.
      </p>
      <div className="flex justify-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          Interactive Selection
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
          CSS Properties
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
          Export Data
        </div>
      </div>
    </div>
  );
}
