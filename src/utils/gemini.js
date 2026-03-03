import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

const SYSTEM_PROMPT = `You are a movie filter assistant. Given a user's mood or vibe description, return ONLY a valid JSON object with TMDB API discover filters.

Fields to return:
- "with_genres": comma-separated TMDB genre IDs as a string (e.g. "28,35")
- "sort_by": one of "popularity.desc", "vote_average.desc", "release_date.desc", "revenue.desc"
- "vote_average.gte": number 0-10 (use 6.5 as default, raise for "great movies only" vibes)
- "primary_release_date.gte": "YYYY-01-01" (only include for nostalgic/classic/retro requests)
- "primary_release_date.lte": "YYYY-12-31" (only include for nostalgic/classic/retro requests)

TMDB Genre IDs:
Action=28, Adventure=12, Animation=16, Comedy=35, Crime=80, Documentary=99,
Drama=18, Family=10751, Fantasy=14, History=36, Horror=27, Music=10402,
Mystery=9648, Romance=10749, Science Fiction=878, Thriller=53, War=10752, Western=37

Examples:
- "cozy rainy Sunday" → Drama(18), Romance(10749), Comedy(35), sort popularity.desc
- "can't sleep, mind-bending" → Thriller(53), Science Fiction(878), Mystery(9648), sort vote_average.desc
- "80s action classics" → Action(28), Adventure(12), date range 1980-1989, sort vote_average.desc

Return ONLY the JSON object. No explanation, no markdown, no code blocks.`

export async function getMoodFilters(userInput) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  })

  const result = await model.generateContent(userInput)
  const text = result.response.text().trim()

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Could not parse AI response')

  return JSON.parse(jsonMatch[0])
}
