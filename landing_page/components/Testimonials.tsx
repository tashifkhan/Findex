import { Star, Github, Twitter } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "PhD Student, MIT",
      avatar: "SC",
      content: "FindexAI has revolutionized my research workflow. I can now find specific information in 100+ page papers in seconds instead of hours.",
      rating: 5,
      platform: "twitter"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer, Tech Corp",
      avatar: "MR", 
      content: "Finally, a search tool that understands context! Perfect for navigating complex documentation and finding code examples.",
      rating: 5,
      platform: "github"
    },
    {
      name: "Dr. Emily Watson",
      role: "Medical Researcher",
      avatar: "EW",
      content: "The semantic search capabilities are incredible. It's like having an AI research assistant right in my browser.",
      rating: 5,
      platform: "twitter"
    },
    {
      name: "Alex Thompson", 
      role: "Content Creator",
      avatar: "AT",
      content: "Fact-checking and research for my videos is now 10x faster. The YouTube transcript search is a game-changer!",
      rating: 5,
      platform: "github"
    }
  ];

  const metrics = [
    { label: "GitHub Stars", value: "2.3k+", icon: <Github className="w-5 h-5" /> },
    { label: "Active Users", value: "15k+", icon: <span className="text-lg">👥</span> },
    { label: "Time Saved", value: "85%", icon: <span className="text-lg">⏱️</span> },
    { label: "Satisfaction", value: "4.9/5", icon: <Star className="w-5 h-5 fill-current" /> }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by Knowledge Workers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of users who've transformed their browsing and research experience
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center text-purple-600 mb-2">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
                <div className="text-gray-400">
                  {testimonial.platform === 'twitter' ? (
                    <Twitter className="w-5 h-5" />
                  ) : (
                    <Github className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Community
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with other FindexAI users, share tips, and get support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/yourusername/findexai"
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
              <a
                href="https://discord.gg/findexai"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <span className="text-lg">💬</span>
                Join Discord
              </a>
              <a
                href="https://twitter.com/findexai"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Follow Updates
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
