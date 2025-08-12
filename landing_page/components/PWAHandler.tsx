"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Type definitions for PWA-related APIs
interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface NavigatorWithStandalone extends Navigator {
	standalone?: boolean;
}

export default function PWAHandler() {
	const router = useRouter();

	useEffect(() => {
		// Register service worker
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/sw.js")
				.then((registration) => {
					console.log("SW registered: ", registration);
				})
				.catch((registrationError) => {
					console.log("SW registration failed: ", registrationError);
				});
		}

		// Check if app is in standalone mode (PWA)
		const isStandalone = () => {
			return (
				window.matchMedia("(display-mode: standalone)").matches ||
				(navigator as NavigatorWithStandalone).standalone ||
				document.referrer.includes("android-app://")
			);
		};

		// Redirect to /chat if in standalone mode and on home page
		if (isStandalone() && window.location.pathname === "/") {
			router.push("/chat");
		}

		// Handle install prompt
		let deferredPrompt: BeforeInstallPromptEvent | null = null;

		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			deferredPrompt = e as BeforeInstallPromptEvent;

			// Show custom install button or prompt
			const installButton = document.getElementById("install-pwa-button");
			if (installButton) {
				installButton.style.display = "flex";

				const handleInstallClick = () => {
					if (deferredPrompt) {
						deferredPrompt.prompt();
						deferredPrompt.userChoice.then((choiceResult) => {
							if (choiceResult.outcome === "accepted") {
								console.log("User accepted the install prompt");
							}
							deferredPrompt = null;
						});
					}
				};

				installButton.addEventListener("click", handleInstallClick);

				// Cleanup event listener
				return () => {
					installButton.removeEventListener("click", handleInstallClick);
				};
			}
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		// Cleanup
		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, [router]);

	return null;
}
