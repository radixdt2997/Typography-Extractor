"use client";

import { useCallback } from "react";
import { TypographyData } from "@/types/typography";

interface UseElementSelectionProps {
  typographyData: TypographyData;
  onElementSelect: (elementId: string | null) => void;
  selectedElement: string | null;
}

export function useElementSelection({
  typographyData,
  onElementSelect,
  selectedElement,
}: UseElementSelectionProps) {
  const handleElementClick = useCallback(
    (event: React.MouseEvent, elementId: string) => {
      event.stopPropagation();
      onElementSelect(elementId === selectedElement ? null : elementId);
    },
    [selectedElement, onElementSelect]
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
        onElementSelect(
          clickedElement.id === selectedElement ? null : clickedElement.id
        );
      }
    },
    [typographyData, selectedElement, onElementSelect]
  );

  return {
    handleElementClick,
    handleScreenshotClick,
  };
}
