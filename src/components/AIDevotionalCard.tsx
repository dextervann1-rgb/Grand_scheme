import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, RefreshCw, BookOpen, Shield, Crown } from 'lucide-react';
import { voiceNarrator } from '../sound/voiceNarrator';

interface AIDevotionalCardProps {
  chapter: number;
  onOpenVoiceSettings?: () => void;
}

export const AIDevotionalCard: React.FC<AIDevotionalCardProps> = ({ 
  chapter,
  onOpenVoiceSettings 
}) => {
  const [devotional, setDevotional] = useState<string>(
    "Stand firm in the armor of light. Even in the heart of Blackout Downtown, the Beacon burns unquenched — In Lumine Veritas!"
  );
  const [verse, setVerse] = useState<string>("Philippians 4:13");
  const [prayer, setPrayer] = useState<string>(
    "May Jesus Reign over every sector, empowering our fellowship with unshakable strength."
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const fetchDevotional = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/devotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter,
          verseRef: chapter === 1 ? 'Philippians 4:13' : chapter === 2 ? 'Judges 5:21' : 'Mark 3:17',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.devotional) setDevotional(data.devotional);
        if (data.verse) setVerse(data.verse);
        if (data.prayer) setPrayer(data.prayer);
      }
    } catch (err) {
      // Fallback scripture devotional
      setDevotional(
        "The light shines in the darkness, and the darkness has not overcome it. March forward, Fellowship!"
      );
      setVerse("John 1:5");
      setPrayer("May Jesus Reign in our hearts and vanquish all gloom. Amen.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      voiceNarrator.stop();
      setIsSpeaking(false);
      return;
    }

    const fullText = `${verse}. ${devotional} ${prayer} In Lumine Veritas. May Jesus Reign.`;
    setIsSpeaking(true);
    voiceNarrator.speak(fullText, {
      onEnd: () => setIsSpeaking(false),
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#0e1435] via-[#101b44] to-[#160e36] border-2 border-amber-400/80 rounded-3xl p-4 sm:p-5 shadow-[0_0_30px_rgba(255,215,0,0.25)] relative overflow-hidden">
      {/* Subtle divine light rays */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-radial from-amber-400/25 to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400 text-black shadow-md">
              <Sparkles size={16} />
            </span>
            <div>
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block">
                CYBER-CATHEDRAL PROPHETIC SCRIBE
              </span>
              <h3 className="font-serif font-black text-sm sm:text-base text-amber-300 leading-tight">
                DAILY SCRIPTURE DEVOTIONAL
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchDevotional}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 hover:text-white transition cursor-pointer disabled:opacity-50"
              title="Seek Fresh Prophetic Revelation"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
            {onOpenVoiceSettings && (
              <button
                onClick={onOpenVoiceSettings}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold transition cursor-pointer flex items-center gap-1"
                title="Change Voice Persona"
              >
                <span>VOICE: {voiceNarrator.getPersona().toUpperCase()}</span>
              </button>
            )}
          </div>
        </div>

        {/* Verse Reference Banner */}
        <div className="inline-flex items-center gap-2 bg-black/60 border border-amber-400/50 rounded-xl px-3 py-1 text-xs font-mono">
          <BookOpen size={13} className="text-amber-400" />
          <span className="text-amber-300 font-bold">{verse}</span>
          <span className="text-slate-500">•</span>
          <span className="text-[10px] text-cyan-300">CHAPTER {chapter} ILLUMINATION</span>
        </div>

        {/* Devotional Body */}
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          &ldquo;{devotional}&rdquo;
        </p>

        {/* Prayer Callout */}
        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] font-mono text-amber-200 flex items-start gap-2">
          <Crown size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="italic">
            <b>Prayer:</b> {prayer}
          </p>
        </div>

        {/* Audio Narration Bar */}
        <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
          <button
            onClick={handleSpeak}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-md ${
              isSpeaking
                ? 'bg-amber-400 text-black shadow-[0_0_15px_#FFD700] animate-pulse'
                : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black'
            }`}
          >
            <Volume2 size={15} />
            <span>{isSpeaking ? 'STOP NARRATION' : '🔊 NARRATE SCRIPTURE DEVOTIONAL'}</span>
          </button>

          <span className="text-[10px] font-mono text-slate-400">
            In Lumine Veritas | May Jesus Reign
          </span>
        </div>
      </div>
    </div>
  );
};
