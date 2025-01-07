import { Lightbulb } from "lucide-react";
import { ReactNode } from "react";

interface NoteProps {
  children: ReactNode;
}

export function Note({ children }: NoteProps) {
  return (
    <div className="my-6 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
      <div className="flex items-start space-x-3">
        <Lightbulb className="mt-1 h-6 w-6 text-yellow-600 dark:text-yellow-500" />
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          {children}
        </div>
      </div>
    </div>
  );
}
