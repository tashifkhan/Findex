import { Chrome, Download, Github, BookOpen } from "lucide-react";

export default function ChromeInstallPage() {
	return (
		<div
			className="min-h-screen text-white pt-20 overflow-hidden"
			style={{
				background:
					"radial-gradient(ellipse 80% 60% at 60% 20%, var(--accent-ocean) 0%, transparent 60%)," +
					"radial-gradient(ellipse 60% 40% at 20% 80%, var(--accent-teal) 0%, transparent 70%)," +
					"linear-gradient(120deg, #0a0a0a 60%, #10151a 100%)",
			}}
		>
			{/* Overlay for extra darkness and softness */}
			<div
				className="absolute inset-0"
				style={{ background: "rgba(10,10,20,0.85)" }}
			></div>
			{/* Background Pattern */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			></div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex justify-center mb-6">
						<div
							className="w-20 h-20 rounded-full flex items-center justify-center"
							style={{ background: "var(--accent-ocean)" }}
						>
							<Chrome className="w-10 h-10 text-white" />
						</div>
					</div>
					<h1
						className="text-4xl font-bold mb-4"
						style={{
							background: "var(--accent-gradient)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
							WebkitTextFillColor: "transparent",
						}}
					>
						Install FindexAI for Chrome
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Transform your Chrome browser with AI-powered semantic search and
						intelligent discovery.
					</p>
				</div>

				{/* Installation Steps */}
				<div
					className="rounded-xl p-8 mb-8"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-2xl font-bold text-white mb-6">
						Installation Steps
					</h2>

					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<div
								className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
								style={{ background: "var(--accent-ocean)" }}
							>
								1
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-white mb-2">
									Download the Extension
								</h3>
								<p className="text-gray-300 mb-3">
									First, you'll need to build the extension from source or
									download the latest release.
								</p>
								<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
									<div className="mb-2"># Clone the repository</div>
									<div className="mb-2">
										git clone https://github.com/tashifkhan/Findex.git
									</div>
									<div className="mb-2">cd Findex/extension</div>
									<div className="mb-2">npm install</div>
									<div>npm run build</div>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div
								className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
								style={{ background: "var(--accent-ocean)" }}
							>
								2
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-white mb-2">
									Open Chrome Extensions
								</h3>
								<p className="text-gray-300 mb-3">
									Navigate to Chrome's extension management page.
								</p>
								<div
									className="p-4 rounded-lg"
									style={{
										background: "rgba(0, 120, 255, 0.1)",
										border: "1px solid rgba(0, 120, 255, 0.3)",
									}}
								>
									<p className="text-blue-300 font-medium">
										Open Chrome and go to:
									</p>
									<code className="text-blue-400 font-mono">
										chrome://extensions/
									</code>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div
								className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
								style={{ background: "var(--accent-ocean)" }}
							>
								3
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-white mb-2">
									Enable Developer Mode
								</h3>
								<p className="text-gray-300 mb-3">
									Toggle the "Developer mode" switch in the top-right corner of
									the extensions page.
								</p>
								<div
									className="p-4 rounded-lg"
									style={{
										background: "rgba(255, 165, 0, 0.1)",
										border: "1px solid rgba(255, 165, 0, 0.3)",
									}}
								>
									<p className="text-yellow-300">
										<strong>Note:</strong> This enables you to load unpacked
										extensions.
									</p>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div
								className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
								style={{ background: "var(--accent-ocean)" }}
							>
								4
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-white mb-2">
									Load the Extension
								</h3>
								<p className="text-gray-300 mb-3">
									Click "Load unpacked" and select the extension directory.
								</p>
								<div
									className="p-4 rounded-lg"
									style={{
										background: "rgba(0, 255, 0, 0.1)",
										border: "1px solid rgba(0, 255, 0, 0.3)",
									}}
								>
									<p className="text-green-300 font-medium">
										Select the folder:
									</p>
									<code className="text-green-400 font-mono">
										Findex/extension/dist
									</code>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div
								className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
								style={{ background: "var(--accent-ocean)" }}
							>
								5
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-white mb-2">
									Configure Backend
								</h3>
								<p className="text-gray-300 mb-3">
									Set up the backend server and configure your API keys.
								</p>
								<div
									className="p-4 rounded-lg"
									style={{
										background: "rgba(128, 0, 128, 0.1)",
										border: "1px solid rgba(128, 0, 128, 0.3)",
									}}
								>
									<p className="text-purple-300">
										<strong>Important:</strong> The extension requires the
										backend server to be running. See the{" "}
										<a
											href="/docs#backend-setup"
											className="underline text-purple-400"
										>
											documentation
										</a>{" "}
										for setup instructions.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Features */}
				<div
					className="rounded-xl p-8 mb-8"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-2xl font-bold text-white mb-6">
						Chrome Features
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{ background: "rgba(0, 255, 100, 0.2)" }}
								>
									<div
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></div>
								</div>
								<span className="text-gray-300">
									AI-powered semantic search
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{ background: "rgba(0, 255, 100, 0.2)" }}
								>
									<div
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></div>
								</div>
								<span className="text-gray-300">
									YouTube transcript analysis
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{ background: "rgba(0, 255, 100, 0.2)" }}
								>
									<div
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></div>
								</div>
								<span className="text-gray-300">
									Real-time web search integration
								</span>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{ background: "rgba(0, 255, 100, 0.2)" }}
								>
									<div
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></div>
								</div>
								<span className="text-gray-300">Multiple theme support</span>
							</div>
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{ background: "rgba(0, 255, 100, 0.2)" }}
								>
									<div
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></div>
								</div>
								<span className="text-gray-300">
									Keyboard shortcuts (Ctrl+Shift+F)
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{ background: "rgba(0, 255, 100, 0.2)" }}
								>
									<div
										className="w-2 h-2 rounded-full"
										style={{ background: "var(--accent-teal)" }}
									></div>
								</div>
								<span className="text-gray-300">
									Enhanced find-in-page functionality
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Links */}
				<div
					className="rounded-xl p-8"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
					<div className="grid md:grid-cols-3 gap-4">
						<a
							href="/docs"
							className="flex items-center space-x-3 p-4 rounded-lg transition-colors"
							style={{
								background: "rgba(0, 120, 255, 0.1)",
								border: "1px solid rgba(0, 120, 255, 0.3)",
							}}
						>
							<BookOpen
								className="w-6 h-6"
								style={{ color: "var(--accent-ocean)" }}
							/>
							<div>
								<h3 className="font-semibold text-white">Documentation</h3>
								<p className="text-sm text-gray-300">Complete setup guide</p>
							</div>
						</a>
						<a
							href="https://github.com/tashifkhan/Findex"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-3 p-4 rounded-lg transition-colors"
							style={{
								background: "rgba(100, 100, 100, 0.1)",
								border: "1px solid rgba(100, 100, 100, 0.3)",
							}}
						>
							<Github className="w-6 h-6 text-gray-400" />
							<div>
								<h3 className="font-semibold text-white">GitHub</h3>
								<p className="text-sm text-gray-300">Source code & issues</p>
							</div>
						</a>
						<a
							href="/firefox"
							className="flex items-center space-x-3 p-4 rounded-lg transition-colors"
							style={{
								background: "rgba(255, 100, 0, 0.1)",
								border: "1px solid rgba(255, 100, 0, 0.3)",
							}}
						>
							<Download
								className="w-6 h-6"
								style={{ color: "var(--accent-orange)" }}
							/>
							<div>
								<h3 className="font-semibold text-white">Firefox Version</h3>
								<p className="text-sm text-gray-300">Install for Firefox</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
