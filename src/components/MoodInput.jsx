import { useState } from 'react'

const SUGGESTIONS = [
  "cozy rainy Sunday, feel-good comedy",
  "can't sleep, mind-bending thriller",
  "date night, romantic but not cheesy",
  "movie night with friends, action-packed",
  "feeling nostalgic, 90s classics",
  "something dark and atmospheric",
]

export default function MoodInput({ onSearch, loading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) onSearch(input.trim())
  }

  const handleSuggestion = (s) => {
    setInput(s)
    onSearch(s)
  }

  return (
    <div className="mood-input-section">
      <h1 className="logo">CineGuide</h1>
      <p className="tagline">Describe your mood. Get the perfect movie.</p>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="mood-input"
          placeholder="e.g. cozy rainy Sunday, something nostalgic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="search-btn" disabled={loading || !input.trim()}>
          {loading ? 'Finding...' : 'Find Movies'}
        </button>
      </form>

      <div className="suggestions">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            className="suggestion-chip"
            onClick={() => handleSuggestion(s)}
            disabled={loading}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
