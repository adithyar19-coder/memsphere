# MemSphere

**AI-Powered Personal Memory Assistant with Adaptive Forgetting and Context-Aware Retrieval**

MemSphere lets you store personal digital memories (PDFs, DOCX files, images, text notes, voice notes) and search or chat with them using semantic search + RAG. It ranks memories by importance and gently archives low-priority ones — never deleting.

> Status: **Milestone 1 in progress** — skeleton, auth, and dark mode.

---

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + React Router
- **Backend**: Node.js + Express
- **Database / Auth / Storage**: Supabase (PostgreSQL + pgvector + Auth + Storage)
- **AI**: Google Gemini 1.5 Flash (chat) + `text-embedding-004` (embeddings) — free tier
- **Document processing**: `pdfjs-dist` (PDF), `mammoth` (DOCX), `tesseract.js` (OCR)
- **Voice**: Browser Web Speech API (Chrome/Edge)

---

## Quick Start

### 1. Prerequisites

- Node.js **v18 or newer** — [download](https://nodejs.org)
- A free Supabase account — [signup](https://supabase.com)
- A free Google AI Studio key — [signup](https://aistudio.google.com/apikey)
- Git

### 2. Clone and install

```bash
git clone <your-repo-url> memsphere
cd memsphere
npm run install:all
```

### 3. Create your Supabase project (~3 min)

1. Go to [supabase.com](https://supabase.com), sign in, click **New Project**.
2. Give it a name (e.g. `memsphere`), pick a strong DB password, pick a region close to you.
3. Wait for the project to provision (~1 minute).
4. Once ready, go to **Settings → API**. You'll see three values you need:
   - `Project URL` → this is `SUPABASE_URL`
   - `anon public` key → this is `SUPABASE_ANON_KEY`
   - `service_role` key → this is `SUPABASE_SERVICE_ROLE_KEY` (keep secret, server only)

> Database schema and pgvector setup come in **Milestone 3**. For now, auth alone works out of the box.

### 4. Get your Gemini API key (~30 sec)

1. Open [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Click **Create API key**, choose an existing Google Cloud project or let it create one.
3. Copy the key.

### 5. Configure `.env` files

Copy the example env files into place:

**Server** (`server/.env`):
```bash
cp server/.env.example server/.env
```
Then fill in:
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_KEY=...
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

**Client** (`client/.env`):
```bash
cp client/.env.example client/.env
```
Then fill in:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=http://localhost:5000
```

### 6. Run it

From the project root:

```bash
npm run dev
```

- Client → http://localhost:5173
- Server → http://localhost:5000/api/health

---

## Project Structure

```
memsphere/
├── client/                    React + Vite + Tailwind
├── server/                    Express API
├── database/                  SQL schema (added in M3)
├── docs/                      Architecture & implementation notes
├── .env.example               Root env template
└── README.md
```

---

## Roadmap

- [x] **M1** — Skeleton, auth, protected routes, dark mode
- [ ] **M2** — Upload + text/OCR extraction, memory list
- [ ] **M3** — Chunking + embeddings + semantic search (pgvector)
- [ ] **M4** — RAG chat, notes, voice notes
- [ ] **M5** — Importance scoring + archive/restore + duplicate detection
- [ ] **M6** — Polish, docs, demo script

---

## License

MIT — this is a final-year academic project.
