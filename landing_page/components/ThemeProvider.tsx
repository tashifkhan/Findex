"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Types
interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
};

const getSystemTheme = (): "light" | "dark" => {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		if (typeof window === "undefined") return "light";
		const stored = localStorage.getItem("theme");
		if (stored === "light" || stored === "dark") return stored;
		return getSystemTheme();
	});

	// Sync with system preference
	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (!localStorage.getItem("theme")) {
				setTheme(mq.matches ? "dark" : "light");
			}
		};
		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, []);

	// Apply theme to <html> and save to localStorage
	useEffect(() => {
		if (typeof window === "undefined") return;
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
