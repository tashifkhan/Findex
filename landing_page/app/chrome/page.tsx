import { Chrome, Download, Github, BookOpen } from "lucide-react";

export default function ChromeInstallPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
							<Chrome className="w-10 h-10 text-white" />
						</div>
					</div>
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Install FindexAI for Chrome
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Transform your Chrome browser with AI-powered semantic search and
						intelligent discovery.
					</p>
				</div>

				{/* Installation Steps */}
				<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Installation Steps
					</h2>

					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
								1
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 mb-2">
									Download the Extension
								</h3>
								<p className="text-gray-600 mb-3">
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
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
								2
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 mb-2">
									Open Chrome Extensions
								</h3>
								<p className="text-gray-600 mb-3">
									Navigate to Chrome's extension management page.
								</p>
								<div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
									<p className="text-blue-800 font-medium">
										Open Chrome and go to:
									</p>
									<code className="text-blue-600 font-mono">
										chrome://extensions/
									</code>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
								3
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 mb-2">
									Enable Developer Mode
								</h3>
								<p className="text-gray-600 mb-3">
									Toggle the "Developer mode" switch in the top-right corner of
									the extensions page.
								</p>
								<div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
									<p className="text-yellow-800">
										<strong>Note:</strong> This enables you to load unpacked
										extensions.
									</p>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
								4
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 mb-2">
									Load the Extension
								</h3>
								<p className="text-gray-600 mb-3">
									Click "Load unpacked" and select the extension directory.
								</p>
								<div className="bg-green-50 border border-green-200 p-4 rounded-lg">
									<p className="text-green-800 font-medium">
										Select the folder:
									</p>
									<code className="text-green-600 font-mono">
										Findex/extension/dist
									</code>
								</div>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
								5
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 mb-2">
									Configure Backend
								</h3>
								<p className="text-gray-600 mb-3">
									Set up the backend server and configure your API keys.
								</p>
								<div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
									<p className="text-purple-800">
										<strong>Important:</strong> The extension requires the
										backend server to be running. See the{" "}
										<a href="/docs#backend-setup" className="underline">
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
				<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Chrome Features
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
									<div className="w-2 h-2 bg-green-600 rounded-full"></div>
								</div>
								<span className="text-gray-700">
									AI-powered semantic search
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
									<div className="w-2 h-2 bg-green-600 rounded-full"></div>
								</div>
								<span className="text-gray-700">
									YouTube transcript analysis
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
									<div className="w-2 h-2 bg-green-600 rounded-full"></div>
								</div>
								<span className="text-gray-700">
									Real-time web search integration
								</span>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
									<div className="w-2 h-2 bg-green-600 rounded-full"></div>
								</div>
								<span className="text-gray-700">Multiple theme support</span>
							</div>
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
									<div className="w-2 h-2 bg-green-600 rounded-full"></div>
								</div>
								<span className="text-gray-700">
									Keyboard shortcuts (Ctrl+Shift+F)
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
									<div className="w-2 h-2 bg-green-600 rounded-full"></div>
								</div>
								<span className="text-gray-700">
									Enhanced find-in-page functionality
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Links */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
					<div className="grid md:grid-cols-3 gap-4">
						<a
							href="/docs"
							className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
						>
							<BookOpen className="w-6 h-6 text-blue-600" />
							<div>
								<h3 className="font-semibold text-gray-900">Documentation</h3>
								<p className="text-sm text-gray-600">Complete setup guide</p>
							</div>
						</a>
						<a
							href="https://github.com/tashifkhan/Findex"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
						>
							<Github className="w-6 h-6 text-gray-600" />
							<div>
								<h3 className="font-semibold text-gray-900">GitHub</h3>
								<p className="text-sm text-gray-600">Source code & issues</p>
							</div>
						</a>
						<a
							href="/firefox"
							className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
						>
							<Download className="w-6 h-6 text-orange-600" />
							<div>
								<h3 className="font-semibold text-gray-900">Firefox Version</h3>
								<p className="text-sm text-gray-600">Install for Firefox</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
