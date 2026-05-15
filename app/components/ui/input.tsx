import { cn } from "~/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-chai-200">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-chai-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm",
            "bg-white/10 border border-white/15",
            "text-cream-100 placeholder:text-chai-500",
            "focus:outline-none focus:ring-2 focus:ring-chai-400/40 focus:border-chai-400/50",
            "transition-all duration-200",
            icon && "pl-10",
            error && "border-spice-500/50 focus:ring-spice-500/30",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-spice-400">{error}</p>
      )}
    </div>
  )
);

Input.displayName = "Input";

export { Input };
