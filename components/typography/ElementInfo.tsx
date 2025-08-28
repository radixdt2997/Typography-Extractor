import { Tag, Ruler, FileText } from "lucide-react";

interface ElementInfoProps {
  element: {
    tagName: string;
    text: string;
    position: {
      width: number;
      height: number;
    };
  };
}

export function ElementInfo({ element }: ElementInfoProps) {
  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
      <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3 flex items-center">
        <Tag className="w-3 h-3 mr-1" />
        Element Info
      </div>

      <div className="space-y-3 text-sm">
        {/* Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-700 font-medium">Tag:</span>
          </div>
          <code className="bg-white px-2 py-1 rounded border border-indigo-200 text-xs font-mono text-indigo-800">
            {element.tagName}
          </code>
        </div>

        {/* Size */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ruler className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-700 font-medium">Size:</span>
          </div>
          <span className="text-indigo-900 font-mono text-xs bg-white px-2 py-1 rounded border border-indigo-200">
            {element.position.width} × {element.position.height}
          </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-4">
        <div className="text-xs text-indigo-600 mb-2 font-medium flex items-center">
          <FileText className="w-3 h-3 mr-1" />
          Text Content:
        </div>
        <div className="text-xs text-indigo-800 bg-white p-3 rounded-lg border border-indigo-200 max-h-20 overflow-y-auto leading-relaxed">
          {element.text}
        </div>
      </div>
    </div>
  );
}
