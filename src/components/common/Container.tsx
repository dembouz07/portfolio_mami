import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/cn";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  readonly size?: "default" | "wide" | "narrow";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "wide" && "max-w-[90rem]",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-5xl",
        className,
      )}
      {...props}
    />
  ),
);

Container.displayName = "Container";

export default Container;
