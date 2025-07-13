import { redirect } from "next/navigation";

export default function ChromePage() {
	// In production, this would redirect to the actual Chrome Web Store URL
	// For now, we'll show a placeholder page

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
			<div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
				<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
					<span className="text-3xl">🚀</span>
				</div>

				<h1 className="text-2xl font-bold text-gray-900 mb-4">
					Chrome Extension Coming Soon!
				</h1>

				<p className="text-gray-600 mb-6">
					The FindexAI Chrome extension is currently under development. Join our
					beta list to be notified when it's ready!
				</p>

				<div className="space-y-4">
					<a
						href="/"
						className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
					>
						Back to Home
					</a>

					<a
						href="https://github.com/yourusername/findexai"
						className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
					>
						View Source Code
					</a>
				</div>

				<p className="text-sm text-gray-500 mt-6">Expected release: Q2 2024</p>
			</div>
		</div>
	);
}
