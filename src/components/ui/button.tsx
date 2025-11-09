import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import ChronicleButton from "./RefinedChronicleButton"

// Kept for compatibility, though no longer applies styles
const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      outline: "",
      secondary: "",
      ghost: "",
      link: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, onClick, variant, size, asChild = false, ...props }, ref) => {
    // Still compute this so the function signature matches previous structure
    const computedClasses = cn(buttonVariants({ variant, size, className }))

    return (
      <ChronicleButton
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={computedClasses}
        backgroundColor="hsl(var(--foreground))"
        hoverBackgroundColor="hsl(var(--accent))"
        textColor="hsl(var(--background))"
        hoverTextColor="hsl(var(--foreground))"
        borderVisible={false}
        borderRadius="var(--radius)"
        fontWeight={500}
        width="100%"
        {...props}
      >
        {children}
      </ChronicleButton>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
