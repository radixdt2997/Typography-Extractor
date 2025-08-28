import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Zap, Globe } from "lucide-react";

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

  const exampleUrls = [
    "https://stripe.com",
    "https://github.com",
    "https://tailwindcss.com",
    "https://vercel.com",
  ];

  return (
    <div className="mb-8">
      <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 ring-1 ring-gray-100/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 text-gray-800 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold">
                Analyze Website Typography
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Enter any website URL to extract and analyze its typography styles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                type="url"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                className="h-14 pl-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-4 transition-all duration-200 bg-white/90"
                disabled={isLoading}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={onAnalyze}
              disabled={isLoading || !url.trim()}
              className="h-14 px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Analyze Typography
                </>
              )}
            </Button>
          </div>

          {/* Example URLs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm text-gray-500 font-medium">
              Try examples:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {exampleUrls.map((exampleUrl) => (
                <button
                  key={exampleUrl}
                  onClick={() => onUrlChange(exampleUrl)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 rounded-full transition-colors duration-200 font-medium"
                  disabled={isLoading}
                >
                  {new URL(exampleUrl).hostname}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
