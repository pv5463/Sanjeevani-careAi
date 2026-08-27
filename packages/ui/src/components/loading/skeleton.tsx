import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export function PatientCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

export function SummaryCardSkeleton() {
  return (
    <div className="p-6 border rounded-xl space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="pt-4 grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
    </div>
  )
}
