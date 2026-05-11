// src/App.jsx

import {
  ArrowRight,
  Camera,
  Globe,
  MessageCircle,
  Play,
  Shield,
  Users,
  Video,
} from "lucide-react";

export default function App() {
  return (
    <div className="bg-[#F5F7FA] text-[#111827] overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/75 border-b border-black/5">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#111827] flex items-center justify-center shadow-sm">
              <Globe size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                ConnectSphere
              </h1>

              <p className="text-xs text-gray-500 -mt-1">
                Social Platform
              </p>
            </div>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-600">
            <a href="#features" className="hover:text-black transition">
              Features
            </a>

            <a href="#experience" className="hover:text-black transition">
              Experience
            </a>

            <a href="#community" className="hover:text-black transition">
              Community
            </a>

            <a href="#download" className="hover:text-black transition">
              Download
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden md:block px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 transition">
              Login
            </button>

            <button className="px-5 py-2.5 rounded-xl bg-[#111827] text-white text-sm font-medium hover:bg-black transition-all duration-300 shadow-sm">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-sm text-gray-600">
                Real-time social interaction platform
              </span>
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl leading-[1.05] font-bold tracking-tight">
              Social media
              <br />
              that feels
              <span className="text-[#64748B]"> alive.</span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-xl">
              ConnectSphere combines messaging, stories, creators,
              communities, live video, and immersive social experiences
              into one modern platform inspired by real-world social apps.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="group px-7 py-4 rounded-2xl bg-[#111827] text-white font-medium flex items-center gap-2 hover:gap-4 transition-all duration-300">
                Start Exploring
                <ArrowRight size={18} />
              </button>

              <button className="px-7 py-4 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center gap-3 font-medium">
                <Play size={18} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              {stats.map((item, index) => (
                <div key={index}>
                  <h2 className="text-4xl font-semibold">
                    {item.value}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup */}
          <div className="relative flex justify-center">
            {/* floating blur */}
            <div className="absolute w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-60"></div>

            {/* phone */}
            <div className="relative w-[340px] h-[690px] bg-white rounded-[42px] border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* top */}
              <div className="h-16 px-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold">ConnectSphere</h3>

                <div className="flex gap-3 text-gray-700">
                  <Camera size={20} />
                  <MessageCircle size={20} />
                </div>
              </div>

              {/* stories */}
              <div className="px-4 py-4 flex gap-4 overflow-hidden border-b border-gray-100">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col items-center animate-float"
                    style={{
                      animationDelay: `${item * 0.4}s`,
                    }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-100 p-[2px]">
                      <div className="w-full h-full rounded-full bg-gray-300"></div>
                    </div>

                    <span className="text-xs mt-2 text-gray-500">
                      user_{item}
                    </span>
                  </div>
                ))}
              </div>

              {/* feed */}
              <div className="p-4 space-y-5">
                {[1, 2].map((post) => (
                  <div
                    key={post}
                    className="rounded-3xl border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-500"
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gray-300"></div>

                      <div>
                        <h4 className="font-medium">
                          creator_{post}
                        </h4>

                        <p className="text-xs text-gray-500">
                          Active now
                        </p>
                      </div>
                    </div>

                    <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#fff,transparent)] opacity-40"></div>
                    </div>

                    <div className="p-4 flex justify-between text-sm text-gray-600">
                      <div className="flex gap-5">
                        <span>❤️ 24k</span>
                        <span>💬 1.1k</span>
                      </div>

                      <span>↗ Share</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating card */}
            <div className="absolute -left-10 bottom-20 bg-white border border-gray-200 rounded-3xl p-5 shadow-xl animate-floatSlow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#111827] text-white flex items-center justify-center">
                  <Video />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Live Streaming
                  </h3>

                  <p className="text-sm text-gray-500">
                    Connect instantly worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="py-28 px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">
              Features
            </p>

            <h2 className="mt-4 text-5xl font-bold tracking-tight">
              Crafted for modern social experiences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-gray-200 bg-[#FAFAFA] p-8 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#111827] text-white flex items-center justify-center">
                  <feature.icon size={24} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-500 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition duration-300">
                  Learn more
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section
        id="experience"
        className="py-28 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          {/* left */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">
              Experience
            </p>

            <h2 className="mt-4 text-5xl font-bold tracking-tight leading-tight">
              Fast, responsive,
              <br />
              and naturally interactive
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
              Built with smooth micro-interactions and lightweight
              animations that create a premium social experience without
              slowing down performance.
            </p>

            <div className="mt-12 space-y-8">
              {experience.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <item.icon />
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">
                      {item.title}
                    </h4>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right */}
          <div className="grid grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-xl transition-all duration-500 ${
                  index === 1 ? "mt-16" : ""
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#111827] mb-6"></div>

                <h3 className="text-2xl font-semibold">
                  {card.title}
                </h3>

                <p className="mt-4 text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        id="download"
        className="pb-28 px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto rounded-[40px] bg-[#111827] text-white p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-5xl font-bold tracking-tight">
              Join the next generation
              <br />
              social platform
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              Experience meaningful conversations, immersive content,
              and communities built for the modern web.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <button className="px-8 py-4 rounded-2xl bg-white text-black font-medium hover:scale-105 transition duration-300">
                Download App
              </button>

              <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition">
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-2xl font-semibold">
              ConnectSphere
            </h3>

            <p className="text-gray-500 mt-3">
              Modern social interaction platform.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-gray-500">
            <div>
              <h4 className="text-black font-medium mb-4">
                Product
              </h4>

              <ul className="space-y-3">
                <li>Stories</li>
                <li>Communities</li>
                <li>Messaging</li>
                <li>Reels</li>
              </ul>
            </div>

            <div>
              <h4 className="text-black font-medium mb-4">
                Company
              </h4>

              <ul className="space-y-3">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="text-black font-medium mb-4">
                Resources
              </h4>

              <ul className="space-y-3">
                <li>Support</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>

            <div>
              <h4 className="text-black font-medium mb-4">
                Social
              </h4>

              <ul className="space-y-3">
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Discord</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  {
    value: "12M+",
    label: "Active users",
  },
  {
    value: "180+",
    label: "Countries",
  },
  {
    value: "4.9★",
    label: "App rating",
  },
];

const features = [
  {
    icon: Camera,
    title: "Stories",
    description:
      "Share moments instantly with immersive and engaging stories.",
  },
  {
    icon: MessageCircle,
    title: "Messaging",
    description:
      "Real-time conversations with smooth and responsive chat.",
  },
  {
    icon: Video,
    title: "Live Video",
    description:
      "Broadcast live and interact naturally with your audience.",
  },
  {
    icon: Shield,
    title: "Privacy",
    description:
      "Advanced privacy controls designed for modern users.",
  },
];

const experience = [
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Create spaces where people connect authentically.",
  },
  {
    icon: Globe,
    title: "Global Interaction",
    description:
      "Reach and communicate with people worldwide instantly.",
  },
];

const cards = [
  {
    title: "Creator Spaces",
    description:
      "Build creator-focused communities with engagement tools.",
  },
  {
    title: "Smart Feed",
    description:
      "Personalized recommendations powered by intelligent ranking.",
  },
  {
    title: "Private Groups",
    description:
      "Secure and invite-only spaces for meaningful discussions.",
  },
  {
    title: "Instant Sharing",
    description:
      "Post stories, photos, and videos with zero friction.",
  },
];