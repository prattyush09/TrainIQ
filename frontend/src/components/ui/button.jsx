import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:scale-[0.98] min-h-[44px]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-accent)] text-[var(--color-obsidian-950)] hover:bg-[var(--color-accent-hover)] rounded-[var(--radius-button)]",
        destructive:
          "bg-[var(--color-danger)] text-[var(--color-warm-white)] hover:bg-[var(--color-danger-hover)] rounded-[var(--radius-button)]",
        outline:
          "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)] rounded-[var(--radius-button)]",
        secondary:
          "bg-[var(--color-surface-hover)] text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] rounded-[var(--radius-button)]",
        ghost: "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)] rounded-[var(--radius-button)]",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-base min-h-[44px]",
        sm: "h-9 rounded-[var(--radius-input)] px-4 text-sm min-h-[40px]",
        lg: "h-12 rounded-[var(--radius-button)] px-8 text-lg min-h-[48px]",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
        touch: "h-11 min-h-[44px] px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
