"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useElementSelection } from "@/hooks/use-element-selection";
import { cn } from "@/lib/cn";
import { TypographyData } from "@/types/typography";
import { ExternalLink, Eye, Globe } from "lucide-react";
import { useRef } from "react";

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
  const { handleScreenshotClick, handleElementClick } = useElementSelection({
    typographyData,
    onElementSelect,
    selectedElement,
  });

  return (
    <Card className="p-4 bg-white shadow-sm border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-gray-600" />
          <span className="font-semibold text-gray-700">Website Preview</span>
          {selectedElement && (
            <Badge variant="secondary" className="text-xs">
              Element Selected
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(typographyData.url, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Open Original
        </Button>
      </div>

      <div
        className="border rounded-lg overflow-hidden bg-gray-50 relative"
        style={{ height: "600px" }}
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
              className="max-w-none h-auto"
              style={{ minHeight: "100%", objectFit: "contain" }}
            />

            {/* Element Overlays */}
            {typographyData.elements.map((element) => (
              <div
                key={element.id}
                className={cn(
                  "absolute border-2 transition-all duration-200 hover:bg-blue-500/20 cursor-pointer",
                  selectedElement === element.id
                    ? "border-blue-500 bg-blue-500/15 shadow-lg"
                    : "border-transparent hover:border-blue-400"
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
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Screenshot not available</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.open(typographyData.url, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Original
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
