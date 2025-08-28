"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useElementSelection } from "@/hooks/use-element-selection";
import { cn } from "@/lib/cn";
import { TypographyData } from "@/types/typography";
import {
  ExternalLink,
  Eye,
  Globe,
  MousePointer,
  Maximize2,
} from "lucide-react";
import { useRef, useState } from "react";

interface WebsitePreviewProps {
  typographyData: TypographyData;
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
}

export function WebsitePreview({
  typographyData,
  selectedElement,
  onElementSelect,
}: WebsitePreviewProps) {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { handleScreenshotClick, handleElementClick } = useElementSelection({
    typographyData,
    onElementSelect,
    selectedElement,
  });

  return (
    <Card className="p-6 bg-white shadow-lg border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="font-bold text-gray-800 text-lg">
              Website Preview
            </span>
            <div className="flex items-center space-x-2 mt-1">
              {selectedElement && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-700"
                >
                  <MousePointer className="w-3 h-3 mr-1" />
                  Element Selected
                </Badge>
              )}
              <Badge variant="outline" className="text-xs text-gray-600">
                Click elements to inspect
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(typographyData.url, "_blank")}
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Original
          </Button>
        </div>
      </div>

      <div
        className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 relative group"
        style={{ height: "700px" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {typographyData.screenshot ? (
          <div
            ref={screenshotRef}
            className="relative cursor-crosshair h-full overflow-auto"
            onClick={handleScreenshotClick}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={typographyData.screenshot}
              alt="Website Screenshot"
              className="max-w-none h-auto transition-transform duration-300 hover:scale-105"
              style={{ minHeight: "100%", objectFit: "contain" }}
            />

            {/* Element Overlays */}
            {typographyData.elements.map((element) => (
              <div
                key={element.id}
                className={cn(
                  "absolute border-2 transition-all duration-300 cursor-pointer",
                  selectedElement === element.id
                    ? "border-blue-500 bg-blue-500/20 shadow-xl ring-2 ring-blue-300 ring-opacity-50"
                    : "border-transparent hover:border-blue-400 hover:bg-blue-400/10 hover:shadow-lg"
                )}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.position.width,
                  height: element.position.height,
                }}
                onClick={(e) => handleElementClick(e, element.id)}
                title={`${element.tagName}: ${element.text.substring(
                  0,
                  50
                )}...`}
              >
                {selectedElement === element.id && (
                  <div className="absolute -top-8 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    {element.tagName} • {element.styles.fontSize}
                  </div>
                )}
              </div>
            ))}

            {/* Hover Instructions */}
            {isHovering && !selectedElement && (
              <div className="absolute top-4 left-4 bg-black/80 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm">
                <MousePointer className="w-4 h-4 inline mr-2" />
                Click on any text element to inspect
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-full mx-auto w-fit">
                <Globe className="w-12 h-12 opacity-50" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Screenshot not available
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  The website screenshot couldn't be captured, but you can still
                  view the original site.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open(typographyData.url, "_blank")}
                  className="hover:bg-blue-50 hover:border-blue-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Original Site
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
