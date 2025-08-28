import { Card } from "./card";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Card className="p-6 mb-6 bg-red-50 border border-red-200">
      <div className="flex items-start space-x-3 text-red-800">
        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Analysis Failed</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      </div>
    </Card>
  );
}
