"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";

export default function AppPage() {
  const recognitionRef = useRef<any>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [studyNotes, setStudyNotes] = useState("");
  const [status, setStatus] = useState("");

  // 🎙️ Start recording
  const startRecording = () => {
  const SpeechRecognition =
    (window as any).webkitSpeechRecognition ||
    (window as any).SpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition works best in Google Chrome.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  let finalTranscript = transcript;

  recognition.onresult = (event: any) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const text = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += text + " ";
      } else {
        interim += text;
      }
    }
    setTranscript(finalTranscript + interim);
  };

  recognition.onend = () => {
    if (isRecording) {
      recognition.start(); // 🔁 auto-restart
    }
  };

  recognition.onerror = () => {
    if (isRecording) {
      recognition.start(); // 🔁 recover silently
    }
  };

  recognition.start();
  recognitionRef.current = recognition;
  setIsRecording(true);
  setStatus("Recording (long session mode enabled)");
};


  // ⏹ Stop recording
  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setStatus("Recording stopped");
  };

  // ✨ Generate clean notes
  const generateNotes = async () => {
    if (!transcript.trim()) {
      alert("Please record or type some content first.");
      return;
    }

    setStatus("Generating clean notes…");

    const res = await fetch("http://localhost:8080/summarize", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: transcript,
    });

    const text = await res.text();
    setSummary(text);
    setStudyNotes("");
    setStatus("Notes ready");
  };

  // 🎓 Smart Study Mode
  const generateStudyNotes = async () => {
    setStatus("Generating study notes…");

    const res = await fetch("http://localhost:8080/study-mode", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: summary,
    });

    const text = await res.text();
    setStudyNotes(text);
    setStatus("Study notes ready");
  };

  // 📄 Download TXT
  const downloadTXT = (content: string, name: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 📕 Download PDF
  const downloadPDF = (content: string, name: string) => {
    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(content, 180);
    pdf.setFontSize(12);
    pdf.text(lines, 10, 20);
    pdf.save(name);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-200 via-purple-200 to-pink-200 px-6 py-8 flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          NoteX<span className="text-indigo-600">.ai</span>
        </h1>
        <p className="text-sm text-gray-600">
          Record lectures. Generate notes. Study smarter.
        </p>
      </div>

      {/* Start Recording – TOP CENTER */}
      <div className="flex justify-center mb-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-10 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
          >
            🎙️ Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-10 py-4 bg-red-500 text-white rounded-full font-semibold text-lg animate-pulse"
          >
            ■ Stop Recording
          </button>
        )}
      </div>

      {/* Status */}
      {status && (
        <p className="text-center text-sm text-gray-600 mb-4">
          {status}
        </p>
      )}

      {/* Transcript */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        <p className="text-sm text-gray-600 mb-2 text-center">
          Live transcript — you can edit before generating notes
        </p>
        <textarea
          className="w-full h-52 p-4 rounded-xl border border-gray-300 bg-white/60 text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Your lecture text will appear here…"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>

      {/* Generate Notes – BOTTOM CENTER */}
      {transcript && !summary && !isRecording && (
        <div className="flex justify-center mt-6">
          <button
            onClick={generateNotes}
            className="px-10 py-4 bg-green-600 text-white rounded-full font-semibold text-lg hover:bg-green-700 transition"
          >
            ✨ Generate Notes
          </button>
        </div>
      )}

      {/* Clean Notes */}
      {summary && (
        <div className="max-w-6xl mx-auto w-full mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Clean Notes
          </h2>

          <textarea
            className="w-full h-64 p-4 rounded-xl border border-gray-300 bg-white/70 text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => downloadTXT(summary, "NoteX_Notes.txt")}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg"
            >
              Download TXT
            </button>
            <button
              onClick={() => downloadPDF(summary, "NoteX_Notes.pdf")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Download PDF
            </button>
          </div>

          {/* Study Mode Button */}
          {!studyNotes && (
            <div className="flex justify-center mt-6">
              <button
                onClick={generateStudyNotes}
                className="px-10 py-4 bg-yellow-500 text-white rounded-full font-semibold text-lg hover:bg-yellow-600 transition"
              >
                🎓 Convert to Study Notes
              </button>
            </div>
          )}
        </div>
      )}

      {/* Study Notes */}
      {studyNotes && (
        <div className="max-w-6xl mx-auto w-full mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Study Mode Notes
          </h2>

          <textarea
            className="w-full h-72 p-4 rounded-xl border border-gray-300 bg-white/80 text-gray-800"
            value={studyNotes}
            onChange={(e) => setStudyNotes(e.target.value)}
          />

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() =>
                downloadTXT(studyNotes, "NoteX_Study_Notes.txt")
              }
              className="px-6 py-2 bg-gray-800 text-white rounded-lg"
            >
              Download TXT
            </button>
            <button
              onClick={() =>
                downloadPDF(studyNotes, "NoteX_Study_Notes.pdf")
              }
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
