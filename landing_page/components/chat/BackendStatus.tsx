"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { BACKEND_CONFIG } from "../../lib/config";

interface BackendStatusProps {
	className?: string;
}

export function BackendStatus({ className = "" }: BackendStatusProps) {
	const [status, setStatus] = useState<"checking" | "connected" | "error">(
		"checking"
	);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const checkBackendStatus = async () => {
			try {
				const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/health`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					setStatus("connected");
					setError("");
				} else {
					setStatus("error");
					setError(`HTTP ${response.status}: ${response.statusText}`);
				}
			} catch (err) {
				setStatus("error");
				setError(err instanceof Error ? err.message : "Connection failed");
			}
		};

		checkBackendStatus();
	}, []);

	const getStatusIcon = () => {
		switch (status) {
			case "checking":
				return <Loader2 className="w-4 h-4 animate-spin" />;
			case "connected":
				return <CheckCircle className="w-4 h-4 text-green-500" />;
			case "error":
				return <XCircle className="w-4 h-4 text-red-500" />;
		}
	};

	const getStatusText = () => {
		switch (status) {
			case "checking":
				return "Checking backend...";
			case "connected":
				return "Backend connected";
			case "error":
				return "Backend error";
		}
	};

	return (
		<div className={`flex items-center gap-2 text-sm ${className}`}>
			{getStatusIcon()}
			<span
				className={
					status === "error"
						? "text-red-500"
						: status === "connected"
						? "text-green-500"
						: "text-yellow-500"
				}
			>
				{getStatusText()}
			</span>
			{status === "error" && (
				<span className="text-xs text-red-400 ml-2" title={error}>
					{error.length > 30 ? `${error.substring(0, 30)}...` : error}
				</span>
			)}
		</div>
	);
}
