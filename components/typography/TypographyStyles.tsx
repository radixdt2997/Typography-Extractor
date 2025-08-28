import { Type, Hash, Palette, AlignLeft } from "lucide-react";

interface TypographyStylesProps {
  styles: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    lineHeight: string;
    color: string;
    textAlign: string;
    textTransform: string;
    letterSpacing: string;
  };
}

export function TypographyStyles({ styles }: TypographyStylesProps) {
  const hasAdditionalProperties =
    styles.fontStyle !== "normal" ||
    styles.textTransform !== "none" ||
    styles.letterSpacing !== "normal";

  return (
    <div className="space-y-3">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Typography Styles
      </div>

      {/* Font Family */}
      <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
        <Type className="w-4 h-4 text-blue-600" />
        <div className="flex-1 min-w-0">
          <div className="text-xs text-blue-600 font-medium">Font Family</div>
          <div className="text-sm text-gray-900 truncate font-mono">
            {styles.fontFamily}
          </div>
        </div>
      </div>

      {/* Font Size & Weight */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
          <Hash className="w-4 h-4 text-purple-600" />
          <div>
            <div className="text-xs text-purple-600 font-medium">Size</div>
            <div className="text-sm text-gray-900 font-mono">
              {styles.fontSize}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg">
          <Hash className="w-4 h-4 text-emerald-600" />
          <div>
            <div className="text-xs text-emerald-600 font-medium">Weight</div>
            <div className="text-sm text-gray-900 font-mono">
              {styles.fontWeight}
            </div>
          </div>
        </div>
      </div>

      {/* Color */}
      <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
        <Palette className="w-4 h-4 text-orange-600" />
        <div className="flex-1">
          <div className="text-xs text-orange-600 font-medium">Color</div>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: styles.color }}
            />
            <span className="text-sm text-gray-900 font-mono">
              {styles.color}
            </span>
          </div>
        </div>
      </div>

      {/* Line Height & Text Align */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 font-medium">Line Height</div>
          <div className="text-sm text-gray-900 font-mono">
            {styles.lineHeight}
          </div>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
          <AlignLeft className="w-4 h-4 text-gray-600" />
          <div>
            <div className="text-xs text-gray-600 font-medium">Align</div>
            <div className="text-sm text-gray-900 font-mono">
              {styles.textAlign}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Properties */}
      {hasAdditionalProperties && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Additional Properties
          </div>
          {styles.fontStyle !== "normal" && (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 font-medium">
                Font Style
              </div>
              <div className="text-sm text-gray-900 font-mono">
                {styles.fontStyle}
              </div>
            </div>
          )}
          {styles.textTransform !== "none" && (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 font-medium">
                Text Transform
              </div>
              <div className="text-sm text-gray-900 font-mono">
                {styles.textTransform}
              </div>
            </div>
          )}
          {styles.letterSpacing !== "normal" && (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 font-medium">
                Letter Spacing
              </div>
              <div className="text-sm text-gray-900 font-mono">
                {styles.letterSpacing}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
