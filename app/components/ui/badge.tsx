import { cn } from "~/lib/utils";
import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-chai-500/20 text-chai-300 border border-chai-500/30",
        paid: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        unpaid: "bg-spice-500/20 text-spice-300 border border-spice-500/30",
        chay: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
        lunch: "bg-green-500/20 text-green-300 border border-green-500/30",
        snacks: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
        custom: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
