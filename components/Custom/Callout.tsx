import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  default: Info,
  info: Info,
  warning: AlertCircle,
  error: XCircle,
  success: CheckCircle2,
} as const;

type CalloutProps = {
  children?: React.ReactNode;
  type?: keyof typeof icons;
  icon?: keyof typeof icons;
  title?: string;
  variant?: keyof typeof variantStyles;
};

const variantStyles = {
  default: {
    container:
      "bg-blue-950/10 dark:bg-blue-900/20 border-blue-900/20 dark:border-blue-900/30",
    icon: "text-blue-500 dark:text-blue-400",
  },
  info: {
    container:
      "bg-blue-950/10 dark:bg-blue-900/20 border-blue-900/20 dark:border-blue-900/30",
    icon: "text-blue-500 dark:text-blue-400",
  },
  warning: {
    container:
      "bg-yellow-950/10 dark:bg-yellow-900/20 border-yellow-900/20 dark:border-yellow-900/30",
    icon: "text-yellow-500 dark:text-yellow-400",
  },
  error: {
    container:
      "bg-red-950/10 dark:bg-red-900/20 border-red-900/20 dark:border-red-900/30",
    icon: "text-red-500 dark:text-red-400",
  },
  success: {
    container:
      "bg-green-950/10 dark:bg-green-900/20 border-green-900/20 dark:border-green-900/30",
    icon: "text-green-500 dark:text-green-400",
  },
} as const;

export function Callout({
  children,
  icon,
  title,
  variant = "default",
}: CalloutProps) {
  const Icon = icons[icon ?? variant];
  const styles = variantStyles[variant];

  return (
    <div className={cn("my-6 rounded-lg border p-4", styles.container)}>
      <div className="flex items-start space-x-4">
        <Icon className={cn("mt-1 h-5 w-5 flex-shrink-0", styles.icon)} />
        <div className="flex-1 space-y-2">
          {title && <h4 className="font-medium">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
