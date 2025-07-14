"use client";

import { useState } from "react";
import { Menu, X, Github, BookOpen } from "lucide-react";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center">
						<a href="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">F</span>
							</div>
							<span className="text-xl font-bold text-white">FindexAI</span>
						</a>
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
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
						>
							Install for Chrome
						</a>
						<a
							href="/firefox"
							className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
						<div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md rounded-lg mt-2">
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
								className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-medium transition-colors"
							>
								Install for Chrome
							</a>
							<a
								href="/firefox"
								className="block bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-md font-medium transition-colors"
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
