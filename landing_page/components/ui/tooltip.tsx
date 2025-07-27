import * as React from "react";

// Simple tooltip implementation

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

const TooltipTrigger = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
	<div ref={ref} {...props}>
		{children}
	</div>
));
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
	<div
		ref={ref}
		className={`z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md ${className}`}
		{...props}
	>
		{children}
	</div>
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
