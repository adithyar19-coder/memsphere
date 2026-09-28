/**
 * Mock data used while the UI is being built. Everything here will be replaced
 * by real Supabase queries in a later milestone. The shape mirrors what the
 * real API will return, so page code won't need to change.
 */

const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24
const now = Date.now()

export const MOCK_MEMORIES = [
  {
    id: 'm-01',
    title: 'Aditya_Resume_2026.pdf',
    fileName: 'Aditya_Resume_2026.pdf',
    fileType: 'pdf',
    sourceType: 'document',
    sizeBytes: 214_500,
    createdAt: new Date(now - 2 * HOUR).toISOString(),
    lastAccessedAt: new Date(now - 1 * HOUR).toISOString(),
    accessCount: 12,
    importanceScore: 92,
    status: 'active',
    contentPreview:
      'Aditya Sharma — Final-year B.Tech (Computer Science). Experience in full-stack development, machine learning, and building AI-powered applications. Skills: React, Node.js, Python, PostgreSQL, Supabase, Docker…',
  },
  {
    id: 'm-02',
    title: 'MemSphere Project Proposal',
    fileName: 'MemSphere_Proposal.docx',
    fileType: 'docx',
    sourceType: 'document',
    sizeBytes: 48_200,
    createdAt: new Date(now - 1 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 4 * HOUR).toISOString(),
    accessCount: 8,
    importanceScore: 88,
    status: 'active',
    contentPreview:
      'MemSphere is an AI-powered personal memory assistant that combines semantic search with adaptive forgetting. This proposal outlines the architecture, research contributions, and evaluation plan for the final-year project…',
  },
  {
    id: 'm-03',
    title: 'Aadhaar_Card.jpg',
    fileName: 'Aadhaar_Card.jpg',
    fileType: 'jpg',
    sourceType: 'image',
    sizeBytes: 1_120_000,
    createdAt: new Date(now - 3 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 2 * DAY).toISOString(),
    accessCount: 3,
    importanceScore: 95,
    status: 'active',
    contentPreview:
      'GOVERNMENT OF INDIA — Unique Identification Authority. Name: Aditya Sharma. DOB: 12/08/2003. Aadhaar Number: XXXX XXXX 8749 (OCR-extracted).',
  },
  {
    id: 'm-04',
    title: 'Idea: gradient descent visualisation',
    fileName: null,
    fileType: 'note',
    sourceType: 'note',
    sizeBytes: 620,
    createdAt: new Date(now - 5 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 5 * DAY).toISOString(),
    accessCount: 2,
    importanceScore: 54,
    status: 'active',
    contentPreview:
      'Build a small React demo showing gradient descent step-by-step for MSE loss. Use recharts or d3. Let user set learning rate and starting point.',
  },
  {
    id: 'm-05',
    title: 'DBMS Semester Notes',
    fileName: 'DBMS_Notes.pdf',
    fileType: 'pdf',
    sourceType: 'document',
    sizeBytes: 3_200_000,
    createdAt: new Date(now - 6 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 3 * DAY).toISOString(),
    accessCount: 15,
    importanceScore: 76,
    status: 'active',
    contentPreview:
      'Normalization: 1NF removes repeating groups; 2NF removes partial dependencies on composite keys; 3NF removes transitive dependencies. BCNF handles overlapping candidate keys…',
  },
  {
    id: 'm-06',
    title: 'Voice note — supervisor meeting',
    fileName: null,
    fileType: 'voice',
    sourceType: 'voice',
    sizeBytes: 0,
    createdAt: new Date(now - 8 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 7 * DAY).toISOString(),
    accessCount: 4,
    importanceScore: 68,
    status: 'active',
    contentPreview:
      'Meeting with Prof. Rao. Suggested reading: "Adaptive Memory Consolidation in Neural Systems" (2023). Refine importance-scoring rubric. Deadline for interim report: November 15.',
  },
  {
    id: 'm-07',
    title: 'College_Transcript_Sem6.pdf',
    fileName: 'College_Transcript_Sem6.pdf',
    fileType: 'pdf',
    sourceType: 'document',
    sizeBytes: 178_400,
    createdAt: new Date(now - 12 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 10 * DAY).toISOString(),
    accessCount: 6,
    importanceScore: 84,
    status: 'active',
    contentPreview:
      'Semester 6 Grade Report — CGPA: 8.72. Subjects: Compilers, Operating Systems, Software Engineering, Machine Learning, Elective (Human-Computer Interaction).',
  },
  {
    id: 'm-08',
    title: 'Grocery bill — Sept',
    fileName: 'grocery_bill.jpg',
    fileType: 'jpg',
    sourceType: 'image',
    sizeBytes: 512_000,
    createdAt: new Date(now - 15 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 15 * DAY).toISOString(),
    accessCount: 1,
    importanceScore: 22,
    status: 'active',
    contentPreview:
      'DMart — Whitefield. Rice 5kg ₹340, Atta 10kg ₹520, Milk 6L ₹300, Bread ₹45. Total: ₹1,205. Paid via UPI.',
  },
  {
    id: 'm-09',
    title: 'Random shower thought',
    fileName: null,
    fileType: 'note',
    sourceType: 'note',
    sizeBytes: 90,
    createdAt: new Date(now - 22 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 22 * DAY).toISOString(),
    accessCount: 0,
    importanceScore: 12,
    status: 'active',
    contentPreview: 'What if memory itself is just RAG with meat?',
  },
  {
    id: 'm-10',
    title: 'Internship Offer — TCS.pdf',
    fileName: 'Internship_Offer_TCS.pdf',
    fileType: 'pdf',
    sourceType: 'document',
    sizeBytes: 96_000,
    createdAt: new Date(now - 30 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 20 * DAY).toISOString(),
    accessCount: 5,
    importanceScore: 90,
    status: 'active',
    contentPreview:
      'Tata Consultancy Services — Internship Offer. Role: Software Engineering Intern. Duration: 8 weeks. Stipend: ₹35,000/month. Location: Bangalore. Joining: Jun 2025.',
  },
  {
    id: 'm-11',
    title: 'Old lecture — Dijkstra',
    fileName: 'DAA_Lecture4.pdf',
    fileType: 'pdf',
    sourceType: 'document',
    sizeBytes: 890_000,
    createdAt: new Date(now - 90 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 80 * DAY).toISOString(),
    accessCount: 1,
    importanceScore: 34,
    status: 'archived',
    archivedAt: new Date(now - 5 * DAY).toISOString(),
    archiveReason: 'Importance 34, not accessed for 80 days',
    contentPreview:
      'Dijkstra\'s algorithm — single-source shortest paths for non-negative weight graphs. Uses a priority queue. Complexity O((V + E) log V) with a binary heap…',
  },
  {
    id: 'm-12',
    title: 'Cafe receipt — August',
    fileName: 'cafe_receipt.jpg',
    fileType: 'jpg',
    sourceType: 'image',
    sizeBytes: 240_000,
    createdAt: new Date(now - 60 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 55 * DAY).toISOString(),
    accessCount: 0,
    importanceScore: 15,
    status: 'archived',
    archivedAt: new Date(now - 20 * DAY).toISOString(),
    archiveReason: 'Importance 15, never re-accessed',
    contentPreview: 'Third Wave Coffee — Cold brew ₹280, Croissant ₹180. Total ₹460.',
  },
  {
    id: 'm-13',
    title: 'Draft blog post — RAG explained',
    fileName: null,
    fileType: 'note',
    sourceType: 'note',
    sizeBytes: 1240,
    createdAt: new Date(now - 45 * DAY).toISOString(),
    lastAccessedAt: new Date(now - 40 * DAY).toISOString(),
    accessCount: 0,
    importanceScore: 28,
    status: 'archived',
    archivedAt: new Date(now - 10 * DAY).toISOString(),
    archiveReason: 'Importance 28, unfinished draft',
    contentPreview:
      'Retrieval-Augmented Generation, or RAG, addresses a key limitation of large language models: their static knowledge…',
  },
]

export function getActiveMemories() {
  return MOCK_MEMORIES.filter((m) => m.status === 'active')
}

export function getArchivedMemories() {
  return MOCK_MEMORIES.filter((m) => m.status === 'archived')
}

export function findMemory(id) {
  return MOCK_MEMORIES.find((m) => m.id === id)
}
