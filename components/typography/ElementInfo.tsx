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
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        Element Info
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Tag:</span>
          <code className="bg-gray-200 px-1 rounded text-xs">
            {element.tagName}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Size:</span>
          <span className="text-gray-900 font-mono text-xs">
            {element.position.width} × {element.position.height}
          </span>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-1">Text Content:</div>
        <div className="text-xs text-gray-700 bg-white p-2 rounded border max-h-16 overflow-y-auto">
          {element.text}
        </div>
      </div>
    </div>
  );
}
