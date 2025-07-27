"use client";

import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";

interface Settings {
	agent: string;
	provider: string;
	model: string;
	url?: string;
	apiKeys: {
		openai?: string;
		gemini?: string;
		claude?: string;
		ollama?: string;
		deepseek?: string;
		openrouter?: string;
	};
	endpoints: {
		ollama?: string;
		openrouter?: string;
	};
}

interface SettingsModalProps {
	settings: Settings;
	onSettingsChange: (settings: Settings) => void;
}

const PROVIDERS = [
	{
		id: "openai",
		name: "OpenAI",
		models: [
			{ id: "gpt-4.1", name: "GPT-4.1" },
			{ id: "gpt-4o", name: "GPT-4o" },
			{ id: "gpt-4o-mini", name: "GPT-4o Mini" },
			{ id: "o1-preview", name: "o1 Preview" },
			{ id: "o1-mini", name: "o1 Mini" },
		],
	},
	{
		id: "gemini",
		name: "Google Gemini",
		models: [
			{ id: "flash-2.5", name: "Flash 2.5" },
			{ id: "flash-2.5-lite", name: "Flash 2.5 Lite" },
			{ id: "flash-2", name: "Flash 2" },
			{ id: "pro", name: "Pro" },
			{ id: "ultra", name: "Ultra" },
		],
	},
	{
		id: "claude",
		name: "Anthropic Claude",
		models: [
			{ id: "opus-4", name: "Claude 4 Opus" },
			{ id: "sonnet-4", name: "Claude 4 Sonnet" },
			{ id: "haiku-3.5", name: "Claude 3.5 Haiku" },
			{ id: "sonnet-3.5", name: "Claude 3.5 Sonnet" },
		],
	},
	{
		id: "ollama",
		name: "Ollama",
		models: [
			{ id: "llama3.3", name: "Llama 3.3" },
			{ id: "llama3.2", name: "Llama 3.2" },
			{ id: "mistral", name: "Mistral" },
			{ id: "codellama", name: "Code Llama" },
			{ id: "deepseek-coder", name: "DeepSeek Coder" },
		],
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		models: [
			{ id: "v3", name: "DeepSeek V3" },
			{ id: "coder-v2", name: "DeepSeek Coder V2" },
			{ id: "reasoning", name: "DeepSeek Reasoning" },
		],
	},
	{
		id: "openrouter",
		name: "OpenRouter",
		models: [
			{ id: "auto", name: "Auto (Best Available)" },
			{ id: "claude-3-opus", name: "Claude 3 Opus" },
			{ id: "gpt-4-turbo", name: "GPT-4 Turbo" },
			{ id: "llama-70b", name: "Llama 70B" },
		],
	},
];

export function SettingsModal({
	settings,
	onSettingsChange,
}: SettingsModalProps) {
	const [localSettings, setLocalSettings] = useState<Settings>(settings);
	const [isOpen, setIsOpen] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		setLocalSettings(settings);
	}, [settings]);

	// Close modal on escape key
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [isOpen]);

	const selectedProvider =
		PROVIDERS.find((p) => p.id === localSettings.provider) || PROVIDERS[0];

	const handleSave = () => {
		// Validate required API keys
		const providerKey =
			localSettings.apiKeys[
				localSettings.provider as keyof typeof localSettings.apiKeys
			];

		if (!providerKey && localSettings.provider !== "ollama") {
			toast({
				title: "Missing API Key",
				description: `${selectedProvider.name} API key is required.`,
				variant: "destructive",
			});
			return;
		}

		if (
			localSettings.provider === "ollama" &&
			!localSettings.endpoints.ollama
		) {
			toast({
				title: "Missing Endpoint",
				description: "Ollama endpoint URL is required.",
				variant: "destructive",
			});
			return;
		}

		if (
			localSettings.provider === "openrouter" &&
			!localSettings.endpoints.openrouter
		) {
			toast({
				title: "Missing Endpoint",
				description: "OpenRouter endpoint URL is required.",
				variant: "destructive",
			});
			return;
		}

		onSettingsChange(localSettings);
		setIsOpen(false);
		toast({
			title: "Settings saved",
			description: "Your preferences have been saved successfully.",
		});
	};

	const handleClearAll = () => {
		const clearedSettings: Settings = {
			agent: "react",
			provider: "openai",
			model: "gpt-4.1",
			apiKeys: {},
			endpoints: {},
		};
		setLocalSettings(clearedSettings);
		onSettingsChange(clearedSettings);
		toast({
			title: "Settings cleared",
			description: "All settings and API keys have been cleared.",
		});
	};

	const updateSetting = (key: keyof Settings, value: any) => {
		setLocalSettings((prev) => ({ ...prev, [key]: value }));
	};

	const updateApiKey = (provider: string, value: string) => {
		setLocalSettings((prev) => ({
			...prev,
			apiKeys: { ...prev.apiKeys, [provider]: value },
		}));
	};

	const updateEndpoint = (provider: string, value: string) => {
		setLocalSettings((prev) => ({
			...prev,
			endpoints: { ...prev.endpoints, [provider]: value },
		}));
	};

	return (
		<div>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
			>
				<Settings className="w-4 h-4 text-white/80" />
			</button>

			{/* Modal Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
					onClick={() => setIsOpen(false)}
				>
					<div
						className="w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-lg"
						style={{
							background: "rgba(15, 23, 35, 0.95)",
							border: "1px solid rgba(255,255,255,0.1)",
							backdropFilter: "blur(20px)",
							WebkitBackdropFilter: "blur(20px)",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between p-6 border-b border-white/10">
							<div className="flex items-center gap-3">
								<div
									className="w-8 h-8 rounded-lg flex items-center justify-center"
									style={{ background: "var(--accent-gradient)" }}
								>
									<Settings className="w-4 h-4 text-white" />
								</div>
								<div>
									<h2 className="text-lg font-semibold text-white">
										Model & API Settings
									</h2>
									<p className="text-sm text-white/60">
										Configure your AI preferences
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsOpen(false)}
								className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
							>
								<X className="w-4 h-4" />
							</Button>
						</div>

						{/* Content */}
						<div className="p-6 overflow-y-auto max-h-[calc(85vh-160px)] space-y-6">
							{/* Provider Selection */}
							<div className="space-y-3">
								<Label className="text-sm font-medium text-white/80">
									AI Provider
								</Label>
								<select
									value={localSettings.provider}
									onChange={(e) => {
										updateSetting("provider", e.target.value);
										const newProvider = PROVIDERS.find(
											(p) => p.id === e.target.value
										);
										if (newProvider) {
											updateSetting("model", newProvider.models[0].id);
										}
									}}
									className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:bg-white/15 focus:border-white/30 transition-all"
								>
									{PROVIDERS.map((provider) => (
										<option
											key={provider.id}
											value={provider.id}
											className="bg-gray-900 text-white"
										>
											{provider.name}
										</option>
									))}
								</select>
							</div>

							{/* Model Selection */}
							<div className="space-y-3">
								<Label className="text-sm font-medium text-white/80">
									Model
								</Label>
								<select
									value={localSettings.model}
									onChange={(e) => updateSetting("model", e.target.value)}
									className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:bg-white/15 focus:border-white/30 transition-all"
								>
									{selectedProvider.models.map((model) => (
										<option
											key={model.id}
											value={model.id}
											className="bg-gray-900 text-white"
										>
											{model.name}
										</option>
									))}
								</select>
							</div>

							{/* API Key Input */}
							{localSettings.provider !== "ollama" && (
								<div className="space-y-3">
									<Label className="text-sm font-medium text-white/80">
										{selectedProvider.name} API Key
									</Label>
									<Input
										type="password"
										value={
											localSettings.apiKeys[
												localSettings.provider as keyof typeof localSettings.apiKeys
											] || ""
										}
										onChange={(e) =>
											updateApiKey(localSettings.provider, e.target.value)
										}
										placeholder={
											localSettings.provider === "openai"
												? "sk-..."
												: localSettings.provider === "claude"
												? "sk-ant-..."
												: localSettings.provider === "gemini"
												? "AI..."
												: localSettings.provider === "deepseek"
												? "sk-..."
												: localSettings.provider === "openrouter"
												? "sk-or-..."
												: "API Key"
										}
										className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30 rounded-lg"
									/>
								</div>
							)}

							{/* Endpoint Inputs */}
							{localSettings.provider === "ollama" && (
								<div className="space-y-3">
									<Label className="text-sm font-medium text-white/80">
										Ollama Endpoint
									</Label>
									<Input
										value={localSettings.endpoints.ollama || ""}
										onChange={(e) => updateEndpoint("ollama", e.target.value)}
										placeholder="http://localhost:11434"
										className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30 rounded-lg"
									/>
								</div>
							)}

							{localSettings.provider === "openrouter" && (
								<div className="space-y-3">
									<Label className="text-sm font-medium text-white/80">
										OpenRouter Endpoint (Optional)
									</Label>
									<Input
										value={localSettings.endpoints.openrouter || ""}
										onChange={(e) =>
											updateEndpoint("openrouter", e.target.value)
										}
										placeholder="https://openrouter.ai/api/v1"
										className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30 rounded-lg"
									/>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 p-6 border-t border-white/10">
							<Button
								onClick={handleSave}
								className="flex-1 text-white border-0 rounded-lg font-medium transition-all duration-200"
								style={{ background: "var(--accent-gradient)" }}
							>
								Save Settings
							</Button>
							<Button
								onClick={handleClearAll}
								className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg font-medium transition-all duration-200"
							>
								Clear All
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
