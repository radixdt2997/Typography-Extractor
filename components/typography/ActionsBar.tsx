import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypographyData } from "@/types/typography";
import { Download, ExternalLink } from "lucide-react";

interface ActionsBarProps {
  typographyData: TypographyData;
  onExportData: () => void;
}

export function ActionsBar({ typographyData, onExportData }: ActionsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-gray-600 bg-gray-50">
          Analyzed: {new Date(typographyData.timestamp).toLocaleString()}
        </Badge>
        <Badge variant="outline" className="text-blue-600 bg-blue-50">
          <ExternalLink className="w-3 h-3 mr-1" />
          {new URL(typographyData.url).hostname}
        </Badge>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onExportData} size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
      </div>
    </div>
  );
}
