// Modern Sonner-style toasts
import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface SonnerToast {
	id: string;
	message: string;
	type: "success" | "error" | "info" | "warning";
	duration?: number;
}

let toastId = 0;
const toasts = new Map<string, SonnerToast>();
const listeners = new Set<(toasts: SonnerToast[]) => void>();

function notify(
	message: string,
	type: SonnerToast["type"] = "info",
	duration = 4000
) {
	const id = (++toastId).toString();
	const toast: SonnerToast = { id, message, type, duration };

	toasts.set(id, toast);
	notifyListeners();

	if (duration > 0) {
		setTimeout(() => {
			toasts.delete(id);
			notifyListeners();
		}, duration);
	}

	return id;
}

function dismiss(id: string) {
	toasts.delete(id);
	notifyListeners();
}

function notifyListeners() {
	const toastArray = Array.from(toasts.values());
	listeners.forEach((listener) => listener(toastArray));
}

export const sonner = {
	success: (message: string, duration?: number) =>
		notify(message, "success", duration),
	error: (message: string, duration?: number) =>
		notify(message, "error", duration),
	info: (message: string, duration?: number) =>
		notify(message, "info", duration),
	warning: (message: string, duration?: number) =>
		notify(message, "warning", duration),
	dismiss,
};

export function Sonner() {
	const [activeToasts, setActiveToasts] = React.useState<SonnerToast[]>([]);

	React.useEffect(() => {
		listeners.add(setActiveToasts);
		return () => {
			listeners.delete(setActiveToasts);
		};
	}, []);

	const getIcon = (type: SonnerToast["type"]) => {
		switch (type) {
			case "success":
				return <CheckCircle className="w-4 h-4 text-green-400" />;
			case "error":
				return <AlertCircle className="w-4 h-4 text-red-400" />;
			case "warning":
				return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
			case "info":
			default:
				return <Info className="w-4 h-4 text-blue-400" />;
		}
	};

	const getColors = (type: SonnerToast["type"]) => {
		switch (type) {
			case "success":
				return {
					bg: "rgba(34, 197, 94, 0.1)",
					border: "rgba(34, 197, 94, 0.2)",
				};
			case "error":
				return {
					bg: "rgba(239, 68, 68, 0.1)",
					border: "rgba(239, 68, 68, 0.2)",
				};
			case "warning":
				return {
					bg: "rgba(245, 158, 11, 0.1)",
					border: "rgba(245, 158, 11, 0.2)",
				};
			case "info":
			default:
				return {
					bg: "rgba(59, 130, 246, 0.1)",
					border: "rgba(59, 130, 246, 0.2)",
				};
		}
	};

	return (
		<div className="fixed bottom-4 right-4 z-[100] flex flex-col space-y-3 max-w-[420px]">
			{activeToasts.map((toast) => {
				const colors = getColors(toast.type);
				return (
					<div
						key={toast.id}
						className="flex items-start space-x-3 p-4 rounded-xl border backdrop-blur-sm shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5"
						style={{
							background: colors.bg,
							borderColor: colors.border,
							backdropFilter: "blur(12px)",
						}}
					>
						{/* Icon */}
						<div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>

						{/* Message */}
						<div className="flex-1 text-sm text-white font-medium">
							{toast.message}
						</div>

						{/* Close button */}
						<button
							onClick={() => dismiss(toast.id)}
							className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10"
						>
							<X className="w-4 h-4 text-white" />
						</button>
					</div>
				);
			})}
		</div>
	);
}
