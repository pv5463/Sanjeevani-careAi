import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'LISTENING' | 'PROCESSING' | 'VERIFIED' | 'PENDING' | 'CRITICAL';
  label?: string;
}

export function StatusIndicator({ status, label, className, ...props }: StatusIndicatorProps) {
  const dotColor = {
    LISTENING: "bg-blue-500 animate-pulse",
    PROCESSING: "bg-yellow-500 animate-pulse",
    VERIFIED: "bg-green-500",
    PENDING: "bg-gray-400",
    CRITICAL: "bg-red-600 animate-ping",
  }[status];

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <span className="relative flex h-3 w-3">
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", dotColor)}></span>
        <span className={cn("relative inline-flex rounded-full h-3 w-3", dotColor.replace('animate-pulse', '').replace('animate-ping', ''))}></span>
      </span>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    </div>
  )
}
