import { useState } from 'react'

function ConsultationForm({ onCreated }) {
  const [form, setForm] = useState({
    business_name: '',
    industry: '',
    stage: 'idea',
    goal: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to create consultation')
      const data = await res.json()
      onCreated?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg">Start a new consultation</h3>
      <p className="text-blue-200/80 text-sm mb-4">Tell us about your business and goal.</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-1">Business name</label>
          <input name="business_name" value={form.business_name} onChange={handleChange} required className="w-full bg-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50" placeholder="Acme AI" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Industry</label>
          <input name="industry" value={form.industry} onChange={handleChange} required className="w-full bg-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50" placeholder="Fintech, Health, SaaS..." />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Stage</label>
          <select name="stage" value={form.stage} onChange={handleChange} className="w-full bg-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50">
            <option value="idea">Idea</option>
            <option value="mvp">MVP</option>
            <option value="growth">Growth</option>
            <option value="scale">Scale</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-1">Primary goal</label>
          <input name="goal" value={form.goal} onChange={handleChange} required className="w-full bg-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50" placeholder="e.g., get first 10 customers" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full bg-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50" placeholder="Anything else we should know" />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button disabled={loading} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition disabled:opacity-50">
            {loading ? 'Creating...' : 'Start consultation'}
          </button>
          {error && <p className="text-red-300 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  )
}

export default ConsultationForm
