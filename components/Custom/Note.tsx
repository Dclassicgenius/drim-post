import { Lightbulb } from "lucide-react";

interface NoteProps {
  children: React.ReactNode;
}

export function Note({ children }: NoteProps) {
  return (
    <div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
      <div className="flex items-start space-x-3">
        <Lightbulb className="mt-1 h-5 w-5 text-yellow-600 dark:text-yellow-500" />
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          {children}
        </div>
      </div>
    </div>
  );
}
