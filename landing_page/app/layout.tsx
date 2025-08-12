import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Navigation from "../components/Navigation";
import PWAHandler from "../components/PWAHandler";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FindexAI - Your Ctrl + F on Steroids",
	description:
		"AI-powered search, multi-agent context and real-time web results—all in your browser sidebar. Semantic search across any page with YouTube transcripts & live web search integrated.",
	keywords:
		"AI search, browser extension, semantic search, YouTube transcripts, web search, productivity, knowledge workers",
	authors: [{ name: "FindexAI Team" }],
	manifest: "/manifest.json",
	themeColor: "#1e40af",
	viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "FindexAI",
	},
	openGraph: {
		title: "FindexAI - Your Ctrl + F on Steroids",
		description:
			"AI-powered search, multi-agent context and real-time web results—all in your browser sidebar.",
		type: "website",
		url: "https://findex.tashif.codes",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "FindexAI - AI-powered browser search",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "FindexAI - Your Ctrl + F on Steroids",
		description:
			"AI-powered search, multi-agent context and real-time web results—all in your browser sidebar.",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#1e40af" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="FindexAI" />
				<link rel="apple-touch-icon" href="/icon-192x192.svg" />
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<PWAHandler />
				<ThemeProvider>
					<Navigation />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
