"use client";

import {
	Github,
	Twitter,
	Mail,
	Book,
	MessageCircle,
	Chrome,
	Shield,
	Heart,
	Sun,
	Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
	const { theme, toggleTheme } = useTheme();
	const footerLinks = {
		product: [
			{
				name: "Chrome Extension",
				href: "/chrome",
				icon: <Chrome className="w-4 h-4" />,
			},
			{
				name: "Firefox Extension",
				href: "/firefox",
				icon: <Chrome className="w-4 h-4" />,
			},
			{
				name: "Documentation",
				href: "/docs",
				icon: <Book className="w-4 h-4" />,
			},
			{
				name: "API Reference",
				href: "/api",
				icon: <Shield className="w-4 h-4" />,
			},
		],
		community: [
			{
				name: "GitHub",
				href: "https://github.com/yourusername/findexai",
				icon: <Github className="w-4 h-4" />,
			},
			{
				name: "Discord",
				href: "https://discord.gg/findexai",
				icon: <MessageCircle className="w-4 h-4" />,
			},
			{
				name: "Twitter",
				href: "https://twitter.com/findexai",
				icon: <Twitter className="w-4 h-4" />,
			},
			{
				name: "Newsletter",
				href: "/newsletter",
				icon: <Mail className="w-4 h-4" />,
			},
		],
		support: [
			{ name: "Help Center", href: "/help" },
			{ name: "Report Bug", href: "/bug-report" },
			{ name: "Feature Request", href: "/feature-request" },
			{ name: "Contact", href: "/contact" },
		],
		legal: [
			{ name: "Privacy Policy", href: "/privacy" },
			{ name: "Terms of Service", href: "/terms" },
			{ name: "License", href: "/license" },
			{ name: "Credits", href: "/credits" },
		],
	};

	return (
		<footer
			className="relative text-white border-t border-gray-800 overflow-hidden"
			style={{ background: "#0a0a0a" }}
		>
			{/* Accent gradient bar at the top of the footer */}
			<div
				className="absolute top-0 left-0 w-full h-1"
				style={{ background: "var(--accent-gradient)" }}
			></div>
			{/* Main Footer */}
			<div className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
					{/* Brand Column */}
					<div className="lg:col-span-2">
						<div className="mb-6">
							<h3
								className="text-2xl font-bold bg-clip-text text-transparent"
								style={{ background: "var(--accent-gradient)" }}
							>
								FindexAI
							</h3>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Your browser’s sidebar for instant, semantic answers. No more
								endless scrolling—just ask and find.
							</p>
						</div>

						{/* Newsletter Signup */}
						<div className="mb-6">
							<h4 className="font-semibold mb-3">Stay Updated</h4>
							<form className="flex gap-3">
								<input
									type="email"
									placeholder="Your email"
									className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-400"
								/>
								<button
									type="submit"
									className="px-6 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-700 rounded-lg font-medium transition-colors"
								>
									Subscribe
								</button>
							</form>
						</div>

						{/* Social Links */}
						<div className="flex gap-4">
							<a
								href="https://github.com/yourusername/findexai"
								className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
							>
								<Github className="w-5 h-5" />
							</a>
							<a
								href="https://twitter.com/findexai"
								className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
							>
								<Twitter className="w-5 h-5" />
							</a>
							<a
								href="https://discord.gg/findexai"
								className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
							>
								<MessageCircle className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h4 className="font-semibold mb-4 text-white">Product</h4>
						<ul className="space-y-3">
							{footerLinks.product.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
									>
										{link.icon}
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Community Links */}
					<div>
						<h4 className="font-semibold mb-4 text-white">Community</h4>
						<ul className="space-y-3">
							{footerLinks.community.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
									>
										{link.icon}
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Support & Legal */}
					<div>
						<h4 className="font-semibold mb-4 text-white">Support</h4>
						<ul className="space-y-3 mb-6">
							{footerLinks.support.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors"
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>

						<h4 className="font-semibold mb-4 text-white">Legal</h4>
						<ul className="space-y-3">
							{footerLinks.legal.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors"
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="container mx-auto px-6 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="text-gray-400 text-sm">
							© 2024 FindexAI. Made with{" "}
							<span className="inline-block align-middle">
								<Heart className="w-4 h-4 text-red-500" />
							</span>{" "}
							for the open source community.
						</div>
						<div className="flex items-center gap-6 text-sm">
							<span className="text-gray-400">Built with:</span>
							<div className="flex items-center gap-4">
								<span className="flex items-center gap-1 text-gray-400">
									<span
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-ocean)" }}
									></span>
									Next.js
								</span>
								<span className="flex items-center gap-1 text-gray-400">
									<span
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></span>
									FastAPI
								</span>
								<span className="flex items-center gap-1 text-gray-400">
									<span
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-orange)" }}
									></span>
									LangChain
								</span>
							</div>
							<button
								aria-label="Toggle theme"
								onClick={toggleTheme}
								className="ml-4 p-2 rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors text-yellow-400 dark:text-gray-200"
							>
								{theme === "dark" ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
