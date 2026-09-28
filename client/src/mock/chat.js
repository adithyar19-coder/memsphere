export const SAMPLE_QUESTIONS = [
  'What was in my resume?',
  'Which internship company offered me a role?',
  'Summarise my project proposal in 3 lines.',
  'What was my supervisor\'s feedback?',
]

export const INITIAL_CHAT = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What was my college project about?',
    at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      "Your final-year project is **MemSphere** — an AI-powered personal memory assistant. It ingests documents, notes, and voice recordings, stores them as embeddings, and lets you search or chat with them using RAG. The research contribution is a rule-based *adaptive forgetting* mechanism that ranks memories by importance and archives low-value ones without ever permanently deleting.",
    at: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    sources: [
      { id: 'm-02', title: 'MemSphere Project Proposal', snippet: 'MemSphere is an AI-powered personal memory assistant…' },
      { id: 'm-06', title: 'Voice note — supervisor meeting', snippet: 'Refine importance-scoring rubric…' },
    ],
  },
]
