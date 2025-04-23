import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function FloatingSidebarTrigger({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { state, toggleSidebar } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "rounded-full  p-2 text-white shadow-md transition-opacity bg-[#1a1a4a]- border border-white opacity-100 aspect-square",
        // isExpanded
        //   ? "translate-x-[calc(100%-8px)]"
        //   : "translate-x-[calc(100%-8px)]",
        className
      )}
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      {...props}
    >
      {isExpanded ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
}
