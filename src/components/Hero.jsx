import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs tracking-wide backdrop-blur border border-white/10">
          AI voice agent aura • Futuristic • Minimal
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Your AI Business Consultant
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto">
          Get structured, actionable advice for your startup or company in seconds. Start a consultation and chat with an always-on strategic partner.
        </p>
      </div>
    </section>
  )
}

export default Hero
