import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ConsultationForm from './components/ConsultationForm'
import Chat from './components/Chat'

function App() {
  const [current, setCurrent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [consultations, setConsultations] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadConsultations = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/consultations`)
      const data = await res.json()
      setConsultations(data)
      if (!current && data.length) setCurrent(data[0])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConsultations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCreated = (c) => {
    setCurrent(c)
    loadConsultations()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />

      <main className="relative z-10 max-w-6xl mx-auto px-6 -mt-16 pb-24">
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-6">
            <ConsultationForm onCreated={onCreated} />
            {current ? (
              <Chat consultation={current} />
            ) : (
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-blue-100/90">
                Start a consultation to begin chatting with your AI business consultant.
              </div>
            )}
          </div>

          <aside className="md:col-span-2 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Recent consultations</h3>
            {loading ? (
              <p className="text-blue-200/70">Loading...</p>
            ) : consultations.length ? (
              <ul className="space-y-2">
                {consultations.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => setCurrent(c)} className={`w-full text-left px-3 py-2 rounded-md transition ${current?.id === c.id ? 'bg-blue-500/20 text-white' : 'text-blue-100/90 hover:bg-white/10'}`}>
                      <div className="font-medium">{c.business_name}</div>
                      <div className="text-xs opacity-70">{c.industry} • {c.stage}</div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-blue-200/70">No consultations yet</p>
            )}

            <a href="/test" className="inline-block mt-6 text-sm text-blue-300 hover:text-blue-200 underline">Connection test</a>
          </aside>
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center text-blue-300/60 text-sm">
        Built with an AI-first workflow. Describe your goals, get a plan, and iterate fast.
      </footer>
    </div>
  )
}

export default App
