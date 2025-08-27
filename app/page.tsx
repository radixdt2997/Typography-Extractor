"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyData } from "@/types/typography";
import {
  AlertCircle,
  AlignLeft,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Globe,
  Hash,
  Loader2,
  Palette,
  Search,
  Type,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typographyData, setTypographyData] = useState<TypographyData | null>(
    null
  );
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const screenshotRef = useRef<HTMLDivElement>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const analyzeTypography = useCallback(async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    if (!validateUrl(url)) {
      alert("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedElement(null);

    try {
      const response = await fetch("/api/analyze-typography", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze typography");
      }

      const data: TypographyData = await response.json();
      setTypographyData(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const exportData = useCallback(() => {
    if (!typographyData) return;

    const dataStr = JSON.stringify(typographyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `typography-analysis-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [typographyData]);

  const copyStyles = useCallback(() => {
    if (!selectedElement || !typographyData) return;

    const element = typographyData.elements.find(
      (el) => el.id === selectedElement
    );
    if (!element) return;

    const cssText = `/* ${element.tagName.toUpperCase()} - "${element.text.slice(
      0,
      30
    )}..." */
font-family: ${element.styles.fontFamily};
font-size: ${element.styles.fontSize};
font-weight: ${element.styles.fontWeight};
font-style: ${element.styles.fontStyle};
line-height: ${element.styles.lineHeight};
color: ${element.styles.color};
text-align: ${element.styles.textAlign};
text-transform: ${element.styles.textTransform};
letter-spacing: ${element.styles.letterSpacing};`;

    navigator.clipboard.writeText(cssText);
  }, [selectedElement, typographyData]);

  const handleElementClick = useCallback(
    (elementId: string) => {
      setSelectedElement(elementId === selectedElement ? null : elementId);
    },
    [selectedElement]
  );

  const handleScreenshotClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!typographyData) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Find the element at the clicked position
      const clickedElement = typographyData.elements.find((element) => {
        const { position } = element;
        return (
          x >= position.x &&
          x <= position.x + position.width &&
          y >= position.y &&
          y <= position.y + position.height
        );
      });

      if (clickedElement) {
        handleElementClick(clickedElement.id);
      }
    },
    [typographyData, handleElementClick]
  );

  const selectedElementData =
    selectedElement && typographyData
      ? typographyData.elements.find((el) => el.id === selectedElement)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* URL Input Section */}
        <Card className="p-6 mb-6 bg-white shadow-sm border-0 ring-1 ring-gray-100">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <Search className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Analyze Website Typography</span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                  onKeyDown={(e) => e.key === "Enter" && analyzeTypography()}
                />
              </div>
              <Button
                onClick={analyzeTypography}
                disabled={isLoading || !url.trim()}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="p-6 mb-6 bg-red-50 border border-red-200">
            <div className="flex items-start space-x-3 text-red-800">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Analysis Failed</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Results Section */}
        {typographyData && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {typographyData.summary.totalElements}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    Text Elements
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {typographyData.summary.uniqueFonts.length}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">
                    Font Families
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {typographyData.summary.fontSizes.length}
                  </div>
                  <div className="text-sm text-purple-600 font-medium">
                    Font Sizes
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-700">
                    {typographyData.summary.colors.length}
                  </div>
                  <div className="text-sm text-orange-600 font-medium">
                    Text Colors
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-gray-600 bg-gray-50">
                  Analyzed:{" "}
                  {new Date(typographyData.timestamp).toLocaleString()}
                </Badge>
                <Badge variant="outline" className="text-blue-600 bg-blue-50">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {new URL(typographyData.url).hostname}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={exportData} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Website Preview - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <Card className="p-4 bg-white shadow-sm border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-700">
                        Website Preview
                      </span>
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
                            className={`absolute border-2 transition-all duration-200 hover:bg-blue-500/20 cursor-pointer ${
                              selectedElement === element.id
                                ? "border-blue-500 bg-blue-500/15 shadow-lg"
                                : "border-transparent hover:border-blue-400"
                            }`}
                            style={{
                              left: element.position.x,
                              top: element.position.y,
                              width: element.position.width,
                              height: element.position.height,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleElementClick(element.id);
                            }}
                            title={`${
                              element.tagName
                            }: ${element.text.substring(0, 50)}...`}
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
                            onClick={() =>
                              window.open(typographyData.url, "_blank")
                            }
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Original
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* CSS Properties Panel - Takes 1 column on xl screens */}
              <div className="xl:col-span-1">
                <Card className="p-4 bg-white shadow-sm border-gray-200 h-fit">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Type className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-700">
                        CSS Properties
                      </span>
                    </div>
                    {selectedElementData && (
                      <Button variant="outline" size="sm" onClick={copyStyles}>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy CSS
                      </Button>
                    )}
                  </div>

                  {selectedElementData ? (
                    <div className="space-y-4">
                      {/* Element Info */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                          Element Info
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tag:</span>
                            <code className="bg-gray-200 px-1 rounded text-xs">
                              {selectedElementData.tagName}
                            </code>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="text-gray-900 font-mono text-xs">
                              {selectedElementData.position.width} ×{" "}
                              {selectedElementData.position.height}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">
                            Text Content:
                          </div>
                          <div className="text-xs text-gray-700 bg-white p-2 rounded border max-h-16 overflow-y-auto">
                            {selectedElementData.text}
                          </div>
                        </div>
                      </div>

                      {/* Typography Styles */}
                      <div className="space-y-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Typography Styles
                        </div>

                        {/* Font Family */}
                        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                          <Type className="w-4 h-4 text-blue-600" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-blue-600 font-medium">
                              Font Family
                            </div>
                            <div className="text-sm text-gray-900 truncate font-mono">
                              {selectedElementData.styles.fontFamily}
                            </div>
                          </div>
                        </div>

                        {/* Font Size & Weight */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
                            <Hash className="w-4 h-4 text-purple-600" />
                            <div>
                              <div className="text-xs text-purple-600 font-medium">
                                Size
                              </div>
                              <div className="text-sm text-gray-900 font-mono">
                                {selectedElementData.styles.fontSize}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg">
                            <Hash className="w-4 h-4 text-emerald-600" />
                            <div>
                              <div className="text-xs text-emerald-600 font-medium">
                                Weight
                              </div>
                              <div className="text-sm text-gray-900 font-mono">
                                {selectedElementData.styles.fontWeight}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Color */}
                        <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                          <Palette className="w-4 h-4 text-orange-600" />
                          <div className="flex-1">
                            <div className="text-xs text-orange-600 font-medium">
                              Color
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded border border-gray-300"
                                style={{
                                  backgroundColor:
                                    selectedElementData.styles.color,
                                }}
                              />
                              <span className="text-sm text-gray-900 font-mono">
                                {selectedElementData.styles.color}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Line Height & Text Align */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 font-medium">
                              Line Height
                            </div>
                            <div className="text-sm text-gray-900 font-mono">
                              {selectedElementData.styles.lineHeight}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                            <AlignLeft className="w-4 h-4 text-gray-600" />
                            <div>
                              <div className="text-xs text-gray-600 font-medium">
                                Align
                              </div>
                              <div className="text-sm text-gray-900 font-mono">
                                {selectedElementData.styles.textAlign}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Properties */}
                        {(selectedElementData.styles.fontStyle !== "normal" ||
                          selectedElementData.styles.textTransform !== "none" ||
                          selectedElementData.styles.letterSpacing !==
                            "normal") && (
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Additional Properties
                            </div>
                            {selectedElementData.styles.fontStyle !==
                              "normal" && (
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-600 font-medium">
                                  Font Style
                                </div>
                                <div className="text-sm text-gray-900 font-mono">
                                  {selectedElementData.styles.fontStyle}
                                </div>
                              </div>
                            )}
                            {selectedElementData.styles.textTransform !==
                              "none" && (
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-600 font-medium">
                                  Text Transform
                                </div>
                                <div className="text-sm text-gray-900 font-mono">
                                  {selectedElementData.styles.textTransform}
                                </div>
                              </div>
                            )}
                            {selectedElementData.styles.letterSpacing !==
                              "normal" && (
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-600 font-medium">
                                  Letter Spacing
                                </div>
                                <div className="text-sm text-gray-900 font-mono">
                                  {selectedElementData.styles.letterSpacing}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        Click on any text element in the preview to view its CSS
                        properties
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Font Families Preview */}
            <Card className="p-6 bg-white shadow-sm border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Type className="w-5 h-5 mr-2 text-blue-600" />
                Font Families Used
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typographyData.summary.uniqueFonts
                  .slice(0, 9)
                  .map((font, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-blue-300"
                    >
                      <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        Font Family
                      </div>
                      <div
                        className="font-semibold text-gray-900 truncate mb-2"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </div>
                      <div
                        className="text-sm text-gray-600"
                        style={{ fontFamily: font }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!typographyData && !isLoading && !error && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Type className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Analyze Typography
            </h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
              Enter any website URL above to extract and analyze its complete
              typography information. Click on elements to view their CSS
              properties.
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
        )}
      </main>
    </div>
  );
}
