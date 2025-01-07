import { BadgeAlert, CircleCheckBig, Info, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  default: Info,
  info: Info,
  warning: BadgeAlert,
  error: Bug,
  success: CircleCheckBig,
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
    container: "bg-blue-900/10 dark:bg-blue-800/20  border-l-blue-800",
    icon: "text-blue-500 dark:text-blue-400",
  },
  info: {
    container: "bg-blue-900/10 dark:bg-blue-800/20  border-l-blue-800",
    icon: "text-blue-500 dark:text-blue-400",
  },
  warning: {
    container:
      "bg-yellow-900/10 dark:bg-yellow-800/20 border-l-yellow-600 dark:border-l-yellow-800",
    icon: "text-yellow-500 dark:text-yellow-400",
  },
  error: {
    container:
      "bg-red-900/10 dark:bg-red-900/20 border-l-red-600 dark:border-l-red-800",
    icon: "text-red-500 dark:text-red-400",
  },
  success: {
    container:
      "bg-green-900/10 dark:bg-green-900/20 border-l-green-600 dark:border-l-green-800",
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
    <div
      className={cn(
        "my-6 p-4 border-l-4 border-solid rounded-tr-lg rounded-br-lg",
        styles.container
      )}
    >
      <div className="flex items-start space-x-4">
        <Icon className={cn("mt-1 h-6 w-6 flex-shrink-0", styles.icon)} />
        <div className="flex-1 space-y-2">
          {title && <h4 className="font-bold">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
