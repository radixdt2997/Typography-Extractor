import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

interface URLInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export function URLInput({
  url,
  onUrlChange,
  onAnalyze,
  isLoading,
}: URLInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAnalyze();
    }
  };

  return (
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
              onChange={(e) => onUrlChange(e.target.value)}
              className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            onClick={onAnalyze}
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
  );
}
