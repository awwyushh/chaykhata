import { cn } from "~/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chai-400/50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-chai-500 to-chai-600 hover:from-chai-400 hover:to-chai-500 text-cream-50 shadow-lg shadow-chai-900/30",
        secondary:
          "glass text-cream-100 hover:bg-white/15 border border-white/10",
        ghost:
          "text-chai-300 hover:text-cream-100 hover:bg-white/10",
        danger:
          "bg-gradient-to-r from-spice-500 to-spice-600 hover:from-spice-400 hover:to-spice-500 text-cream-50",
        outline:
          "border border-chai-500/50 text-chai-300 hover:bg-chai-500/10 hover:text-chai-200 hover:border-chai-400",
        success:
          "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
        icon: "p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
