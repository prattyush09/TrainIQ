import { cn } from "@/lib/utils";

/**
 * EmptyState — Unified empty state component for consistent UX across the app.
 * Replaces inconsistent empty states in Dashboard, Diet, Progress, WorkoutProgress.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = "default"
}) {
  const sizeStyles = {
    sm: "p-4 gap-3",
    default: "p-8 gap-4",
    lg: "p-12 gap-6"
  };

  const iconSizes = {
    sm: "w-8 h-8",
    default: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const titleSizes = {
    sm: "text-sm",
    default: "text-lg",
    lg: "text-xl"
  };

  const descSizes = {
    sm: "text-xs",
    default: "text-body-sm",
    lg: "text-base"
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-xl bg-surface",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-border text-fg-muted",
          iconSizes[size]
        )}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className={cn("font-medium text-fg", titleSizes[size])}>{title}</h3>
      <p className={cn("text-fg-muted max-w-xs", descSizes[size])}>
        {description}
      </p>
      {action && (
        <div className="mt-2" role="group" aria-label={action.label}>
          {action.variant === "primary" ? (
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                "disabled:pointer-events-none disabled:opacity-50",
                "bg-[var(--color-accent)] text-[var(--color-obsidian-950)] hover:bg-[var(--color-accent-hover)]",
                "h-10 px-4"
              )}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon && <span aria-hidden="true">{action.icon}</span>}
              {action.label}
            </button>
          ) : (
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                "disabled:pointer-events-none disabled:opacity-50",
                "bg-[var(--color-surface-hover)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]",
                "h-10 px-4"
              )}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon && <span aria-hidden="true">{action.icon}</span>}
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default EmptyState;