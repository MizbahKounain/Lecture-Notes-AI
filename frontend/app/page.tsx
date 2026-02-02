"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          NoteX<span className="text-pink-300">.ai</span>
        </h1>
        <button
          onClick={() => router.push("/app")}
          className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-lg transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 mt-20">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          Turn Lectures into
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
            Smart AI Notes
          </span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
          Record lectures, get clean summaries, edit them, and download
          professional notes - all powered by AI.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => router.push("/app")}
            className="px-8 py-4 rounded-full bg-white text-indigo-700 font-bold text-lg hover:scale-105 transition"
          >
            🎙️ Start Taking Notes
          </button>

          <button
            onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
            className="px-8 py-4 rounded-full border border-white/40 hover:bg-white/10 transition"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mt-32 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "🎙️ Record",
            desc: "Use your mic to record lectures live in the browser.",
          },
          {
            title: "🧠 AI Notes",
            desc: "AI fixes spelling, understands context, and summarizes.",
          },
          {
            title: "📄 Download",
            desc: "Edit your notes and download as TXT or PDF instantly.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 hover:scale-105 transition shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
            <p className="text-white/80">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-32 py-10 text-center text-white/60">
      <p>
        © {new Date().getFullYear()} NoteX.ai — Smart Notes for Smarter Learning
      </p>
      </footer>
    </div>
  );
}
