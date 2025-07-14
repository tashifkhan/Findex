"use client";

import { useState } from "react";
import { Menu, X, Github, BookOpen, Search } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav
			className="fixed top-0 left-0 right-0 z-50 border-b"
			style={{
				background: "rgba(20, 30, 40, 0.35)",
				border: "1px solid rgba(255,255,255,0.18)",
				backdropFilter: "blur(16px)",
				WebkitBackdropFilter: "blur(16px)",
				boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
			}}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2">
							<div
								className="w-8 h-8 rounded-lg flex items-center justify-center"
								style={{ background: "var(--accent-gradient)" }}
							>
								<span className="text-white font-bold text-sm">
									<Search />
								</span>
							</div>
							<span className="text-xl font-bold text-white">FindexAI</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<a
							href="/docs"
							className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
						>
							<BookOpen className="w-4 h-4" />
							<span>Documentation</span>
						</a>
						<a
							href="https://github.com/tashifkhan/Findex"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
						>
							<Github className="w-4 h-4" />
							<span>GitHub</span>
						</a>
						<a
							href="/chrome"
							className="text-white px-4 py-2 rounded-lg font-medium transition-colors"
							style={{ background: "var(--accent-ocean)" }}
						>
							Install for Chrome
						</a>
						<a
							href="/firefox"
							className="text-white px-4 py-2 rounded-lg font-medium transition-colors"
							style={{ background: "var(--accent-orange)" }}
						>
							Install for Firefox
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-300 hover:text-white transition-colors"
						>
							{isOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden">
						<div
							className="px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2"
							style={{
								background: "rgba(20, 30, 40, 0.45)",
								border: "1px solid rgba(255,255,255,0.18)",
								backdropFilter: "blur(16px)",
								WebkitBackdropFilter: "blur(16px)",
							}}
						>
							<a
								href="/docs"
								className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
							>
								<BookOpen className="w-4 h-4" />
								<span>Documentation</span>
							</a>
							<a
								href="https://github.com/tashifkhan/Findex"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
							>
								<Github className="w-4 h-4" />
								<span>GitHub</span>
							</a>
							<a
								href="/chrome"
								className="block text-white px-3 py-2 rounded-md font-medium transition-colors"
								style={{ background: "var(--accent-ocean)" }}
							>
								Install for Chrome
							</a>
							<a
								href="/firefox"
								className="block text-white px-3 py-2 rounded-md font-medium transition-colors"
								style={{ background: "var(--accent-orange)" }}
							>
								Install for Firefox
							</a>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
