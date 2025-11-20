import { useEffect, useRef, useState } from 'react'

function Chat({ consultation }) {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  const fetchMessages = async () => {
    if (!consultation?.id) return
    const res = await fetch(`${backend}/api/consultations/${consultation.id}/messages`)
    const data = await res.json()
    setMessages(data)
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultation?.id])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/consultations/${consultation.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input })
      })
      const msg = await res.json()
      setInput('')
      await fetchMessages()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 h-[480px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-lg px-3 py-2 ${m.role === 'user' ? 'bg-blue-500/20 text-blue-100 self-end ml-auto' : 'bg-white/10 text-white'}`}>
            <div className="text-xs opacity-70 mb-1">{m.role}</div>
            <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for advice..." className="flex-1 bg-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50" />
        <button disabled={loading || !consultation?.id} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition disabled:opacity-50">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default Chat
