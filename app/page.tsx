"use client";

import { Header } from "@/components/layout/Header";
import { ResultsSection } from "@/components/typography/ResultSection";
import { URLInput } from "@/components/typography/URLInput";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorDisplay } from "@/components/ui/error-display";
import { useState } from "react";
import { useTypographyAnalysis } from "@/hooks/use-typography-analysis";

export default function Home() {
  const [url, setUrl] = useState("");
  const {
    isLoading,
    typographyData,
    selectedElement,
    error,
    analyzeTypography,
    setSelectedElement,
    exportData,
    copyStyles,
  } = useTypographyAnalysis();

  const handleAnalyze = () => analyzeTypography(url);
  const handleUrlChange = (newUrl: string) => setUrl(newUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <URLInput
          url={url}
          onUrlChange={handleUrlChange}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {error && <ErrorDisplay error={error} />}

        {typographyData && (
          <ResultsSection
            typographyData={typographyData}
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
            onExportData={exportData}
            onCopyStyles={copyStyles}
          />
        )}

        {!typographyData && !isLoading && !error && <EmptyState />}
      </main>
    </div>
  );
}
