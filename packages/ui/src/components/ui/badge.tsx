import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        critical: "border-transparent bg-red-600 text-white hover:bg-red-600/80",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80",
        success: "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        pending: "border-transparent bg-gray-500 text-white hover:bg-gray-500/80",
        verified: "border-transparent bg-green-600 text-white hover:bg-green-600/80",
        aiGenerated: "border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-100/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
