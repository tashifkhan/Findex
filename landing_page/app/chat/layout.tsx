import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "FindexAI Chat - AI-Powered Conversation Assistant",
	description:
		"Experience intelligent conversations with FindexAI Chat. Get instant responses from our advanced AI assistant.",
	keywords: ["AI chat", "conversation", "assistant", "FindexAI"],
	authors: [{ name: "FindexAI Team" }],
	robots: "index, follow",
	openGraph: {
		title: "FindexAI Chat",
		description: "AI-Powered Conversation Assistant",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "FindexAI Chat",
		description: "AI-Powered Conversation Assistant",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
	],
};

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
