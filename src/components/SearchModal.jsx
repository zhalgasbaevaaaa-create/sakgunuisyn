import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Users, Clock, Scroll, ExternalLink } from 'lucide-react';
import { STATES_DATA, HISTORICAL_FIGURES, TIMELINE_EVENTS, MYTHS_AND_LEGENDS } from '../data/historyData';

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedStates = q ? STATES_DATA.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.title.toLowerCase().includes(q) ||
    s.shortDescription.toLowerCase().includes(q) ||
    s.territory.some(t => t.toLowerCase().includes(q))
  ) : [];

  const matchedFigures = q ? HISTORICAL_FIGURES.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.title.toLowerCase().includes(q) ||
    f.role.toLowerCase().includes(q) ||
    f.sourceContent.toLowerCase().includes(q)
  ) : [];

  const matchedEvents = q ? TIMELINE_EVENTS.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.year.toLowerCase().includes(q) ||
    e.result.toLowerCase().includes(q)
  ) : [];

  const matchedMyths = q ? MYTHS_AND_LEGENDS.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.content.toLowerCase().includes(q)
  ) : [];

  const totalMatches = matchedStates.length + matchedFigures.length + matchedEvents.length + matchedMyths.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-obsidian-900 border border-gold-500/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 relative max-h-[80vh] flex flex-col">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Тарихи тұлға, мемлекет, дата, оқиға, термин бойынша іздеу..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm font-sans focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-gold-400 bg-obsidian-950 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-xs">
          {!q && (
            <div className="text-center py-10 text-slate-400 font-sans space-y-2">
              <Search className="w-8 h-8 text-gold-400/40 mx-auto" />
              <p>Төмендегі санаттар бойынша іздеу жүргізе аласыз:</p>
              <div className="flex flex-wrap justify-center gap-2 text-[11px] pt-2">
                <span className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">Томирис</span>
                <span className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">Мөде</span>
                <span className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">Сақ тиграхауда</span>
                <span className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">Байдэн шайқасы</span>
                <span className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">Чигу</span>
                <span className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">120 000 түтін</span>
              </div>
            </div>
          )}

          {q && totalMatches === 0 && (
            <div className="text-center py-10 text-slate-400 font-sans">
              <p>Іздеу сұранысы бойынша нәтиже табылмады: <strong className="text-slate-200">"{query}"</strong></p>
            </div>
          )}

          {matchedStates.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Мемлекеттер ({matchedStates.length})
              </h4>
              {matchedStates.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    onNavigate('states', s.id);
                    onClose();
                  }}
                  className="p-3 bg-obsidian-950 hover:bg-obsidian-800 border border-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-slate-100 font-lora">{s.name}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{s.shortDescription}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                </div>
              ))}
            </div>
          )}

          {matchedFigures.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Тарихи Тұлғалар ({matchedFigures.length})
              </h4>
              {matchedFigures.map(f => (
                <div
                  key={f.id}
                  onClick={() => {
                    onNavigate('figures', f.id);
                    onClose();
                  }}
                  className="p-3 bg-obsidian-950 hover:bg-obsidian-800 border border-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-slate-100 font-lora">{f.name}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{f.title} ({f.stateName})</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                </div>
              ))}
            </div>
          )}

          {matchedEvents.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Оқиғалар мен Шайқастар ({matchedEvents.length})
              </h4>
              {matchedEvents.map((e, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigate('timeline', e.year);
                    onClose();
                  }}
                  className="p-3 bg-obsidian-950 hover:bg-obsidian-800 border border-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-slate-100 font-lora">{e.title} ({e.year})</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{e.result}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
