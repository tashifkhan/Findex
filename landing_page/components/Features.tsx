import { Code, Users, Shield, Zap, Globe, Cpu } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Multi-Agent System",
      description: "Intelligent agents work together to understand context, search the web, and provide comprehensive answers to your queries.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "FAISS Vector Search",
      description: "Lightning-fast semantic search using Facebook's FAISS library for instant, contextually relevant results.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bring Your Own Keys",
      description: "Use your own API keys for OpenAI, Anthropic, or any LLM provider. Your data stays private and under your control.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Live Web Search",
      description: "Real-time web search integration provides up-to-date information alongside page content analysis.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Custom Themes",
      description: "Personalize your search experience with multiple themes and UI customization options.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Local LLM Support",
      description: "Run models locally for complete privacy, or use cloud providers—your choice, your data.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Deep Dive Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for power users who need more than basic search. 
            Every feature designed with privacy, performance, and productivity in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:border-gray-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Info */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Built with Modern Tech</h3>
            <p className="text-gray-300 text-lg">
              Open source, extensible, and built on battle-tested technologies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold">LangChain</div>
              <div className="text-sm text-gray-400">AI Framework</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold">FastAPI</div>
              <div className="text-sm text-gray-400">Backend</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-semibold">FAISS</div>
              <div className="text-sm text-gray-400">Vector Search</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-semibold">WebExtension</div>
              <div className="text-sm text-gray-400">Cross-browser</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
