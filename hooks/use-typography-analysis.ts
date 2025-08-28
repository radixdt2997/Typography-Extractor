"use client";

import { useState, useCallback } from "react";
import { TypographyData } from "@/types/typography";
import { validateUrl } from "@/utils/validation";
import { handleApiError } from "@/utils/error-handling";
import { API_ENDPOINTS } from "@/config/constants";

export function useTypographyAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [typographyData, setTypographyData] = useState<TypographyData | null>(
    null
  );
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeTypography = useCallback(async (url: string) => {
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
      const response = await fetch(API_ENDPOINTS.ANALYZE_TYPOGRAPHY, {
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
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  return {
    isLoading,
    typographyData,
    selectedElement,
    error,
    analyzeTypography,
    setSelectedElement,
    exportData,
    copyStyles,
  };
}
