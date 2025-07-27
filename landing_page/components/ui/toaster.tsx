import { useToast } from "../../hooks/use-toast";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Toaster() {
	const { toasts, dismiss } = useToast();
	const [dismissingToasts, setDismissingToasts] = useState<Set<string>>(
		new Set()
	);

	// Only show toasts that are open
	const visibleToasts = toasts.filter((toast) => toast.open !== false);

	const handleDismiss = (id: string) => {
		setDismissingToasts((prev) => new Set([...prev, id]));
		// Add a small delay for animation, then actually dismiss
		setTimeout(() => {
			dismiss(id);
			setDismissingToasts((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		}, 200);
	};

	return (
		<div className="fixed top-4 right-4 z-[100] flex max-h-screen w-full flex-col space-y-3 md:max-w-[420px]">
			{visibleToasts.map(({ id, title, description, variant, ...props }) => {
				const isDismissing = dismissingToasts.has(id);
				return (
					<div
						key={id}
						className={`group pointer-events-auto relative flex w-full items-start space-x-4 overflow-hidden rounded-xl border backdrop-blur-sm shadow-2xl transition-all duration-300 ${
							isDismissing
								? "animate-out slide-out-to-right-full"
								: "animate-in slide-in-from-top-5"
						} ${
							variant === "destructive"
								? "bg-red-500/10 border-red-500/20 text-red-100"
								: "bg-green-500/10 border-green-500/20 text-green-100"
						} p-4 hover:scale-105 cursor-pointer`}
						style={{
							background:
								variant === "destructive"
									? "rgba(239, 68, 68, 0.1)"
									: "rgba(34, 197, 94, 0.1)",
							borderColor:
								variant === "destructive"
									? "rgba(239, 68, 68, 0.2)"
									: "rgba(34, 197, 94, 0.2)",
							backdropFilter: "blur(12px)",
						}}
						{...props}
					>
						{/* Icon */}
						<div
							className={`w-6 h-6 flex items-center justify-center rounded-full ${
								variant === "destructive" ? "bg-red-500/20" : "bg-green-500/20"
							}`}
						>
							{variant === "destructive" ? (
								<AlertCircle className="w-4 h-4 text-red-400" />
							) : (
								<CheckCircle className="w-4 h-4 text-green-400" />
							)}
						</div>

						{/* Content */}
						<div className="flex-1 grid gap-1">
							{title && (
								<div className="text-sm font-semibold text-white">{title}</div>
							)}
							{description && (
								<div className="text-sm text-white/80">{description}</div>
							)}
						</div>

						{/* Close button */}
						<button
							onClick={() => handleDismiss(id)}
							className="opacity-60 hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10"
						>
							<X className="w-4 h-4 text-white" />
						</button>
					</div>
				);
			})}
		</div>
	);
}
