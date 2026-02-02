import { useState } from 'react'
import GlassCard from './GlassCard'
import { SAMPLE_PROJECTS, UI_TEXT, API_ENDPOINTS } from '../config/sampleData.js'

export default function HomePage() {
    const [file, setFile] = useState(null)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState(null)

    const handleFile = e => setFile(e.target.files[0])

    const handleUploadAndAsk = async () => {
        if (!file) return alert(UI_TEXT.messages.uploadFirst)

        const form = new FormData()
        form.append('file', file)
        form.append('question', question)

        try {
            const res = await fetch(API_ENDPOINTS.ask, {
                method: 'POST',
                body: form
            })
            const data = await res.json()
            setAnswer(data.answer)
        } catch (err) {
            console.error(err)
            setAnswer(UI_TEXT.messages.backendError)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 flex items-center gap-4 justify-center">
                <input
                    className="w-full max-w-lg px-4 py-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-gray-100"
                    type="file"
                    accept={UI_TEXT.fileInput.accept}
                    onChange={handleFile}
                />
            </div>

            <div className="flex items-center gap-4 justify-center">
                <input
                    className="w-full max-w-2xl px-4 py-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-gray-100"
                    type="text"
                    placeholder={UI_TEXT.questionInput.placeholder}
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
                <button
                    onClick={handleUploadAndAsk}
                    className="px-5 py-3 rounded-md bg-gradient-to-r from-[#f2c94c] to-[#f09a1a] text-[#07112a] font-semibold"
                >
                    {UI_TEXT.buttons.ask}
                </button>
            </div>

            <div className="mt-10 grid-cards">
                {SAMPLE_PROJECTS.map(p => (
                    <GlassCard key={p.id} title={p.title} subtitle={p.subtitle} avatar={p.avatar}>
                        <p className="text-sm">{p.description}</p>
                        <div className="mt-4 space-x-2">
                            {p.tags.map(tag => (
                                <span key={tag} className="badge">{tag}</span>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-3">{UI_TEXT.sections.answer}</h3>
                <div className="p-4 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-gray-200 min-h-[120px]">
                    {answer || UI_TEXT.messages.noAnswer}
                </div>
            </div>
        </div>
    )
}