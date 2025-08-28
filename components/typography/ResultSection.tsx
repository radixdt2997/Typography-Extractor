import { TypographyData } from "@/types/typography";
import { ActionsBar } from "./ActionsBar";
import { CSSPropertiesPanel } from "./CssPropertiesPanel";
import { FontFamiliesPreview } from "./FontFamiliesPreview";
import { SummaryCards } from "./SummaryCards";
import { WebsitePreview } from "./WebsitePreview";

interface ResultsSectionProps {
  typographyData: TypographyData;
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
  onExportData: () => void;
  onCopyStyles: () => void;
}

export function ResultsSection({
  typographyData,
  selectedElement,
  onElementSelect,
  onExportData,
  onCopyStyles,
}: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      <SummaryCards summary={typographyData.summary} />

      <ActionsBar typographyData={typographyData} onExportData={onExportData} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <WebsitePreview
            typographyData={typographyData}
            selectedElement={selectedElement}
            onElementSelect={onElementSelect}
          />
        </div>

        <div className="xl:col-span-1">
          <CSSPropertiesPanel
            typographyData={typographyData}
            selectedElement={selectedElement}
            onCopyStyles={onCopyStyles}
          />
        </div>
      </div>

      <FontFamiliesPreview fonts={typographyData.summary.uniqueFonts} />
    </div>
  );
}
