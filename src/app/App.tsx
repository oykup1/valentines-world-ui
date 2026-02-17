import { useState } from 'react';

const prompts = [
  { id: 1, text: "My very first impression of you was..." },
  { id: 2, text: "The most special place we've been together is..." },
  { id: 3, text: "One place I want to take you is..." },
  { id: 4, text: "A moment I knew you were different from everyone else..." },
  { id: 5, text: "A time you showed up for me in a way I didn’t expect was..." },
  { id: 6, text: "You make me blush when..." },
  { id: 7, text: "The most random thing I love about you is..." },
  { id: 8, text: "If we were characters in a tiny pixel game, our storyline would be…" },
  { id: 9, text: "Because of you I now believe..." },
  { id: 10, text: "A promise I want to make to you is..." },
];

export default function App() {
  const [screen, setScreen] = useState<'selection' | 'answers'>('selection');
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const togglePrompt = (id: number) => {
    if (selectedPrompts.includes(id)) {
      setSelectedPrompts(selectedPrompts.filter(p => p !== id));
    } else if (selectedPrompts.length < 6) {
      setSelectedPrompts([...selectedPrompts, id]);
    }
  };

  const handleGenerate = () => {
    if (selectedPrompts.length === 6) {
      setScreen('answers');
    }
  };

  const handleAnswerChange = (id: number, value: string) => {
    if (value.length <= 579) {
      setAnswers({ ...answers, [id]: value });
    }
  };

  const handleCreateLink = () => {
    console.log('Creating secret link with answers:', answers);
    // Handle link creation logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-auto py-8 px-4" 
         style={{ 
           background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8f5e9 100%)',
           fontFamily: "'Silkscreen', monospace"
         }}>
      
      {/* Floating decorative hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: '12px'
            }}
          >
            ❤
          </div>
        ))}
      </div>

      {/* Main parchment scroll */}
      <div className="relative w-full max-w-2xl">
        {/* Scroll background with curled edges effect */}
        <div className="relative bg-[#fef5e7] rounded-lg shadow-2xl p-8 border-8 border-[#e8d5c4]"
             style={{
               boxShadow: '0 20px 60px rgba(139, 69, 19, 0.3), inset 0 0 30px rgba(139, 69, 19, 0.1)',
               background: 'repeating-linear-gradient(0deg, #fef5e7 0px, #fef5e7 2px, #fdf4e6 2px, #fdf4e6 4px)',
             }}>
          
          {/* Top decorative edge */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#e8d5c4] text-2xl">✿</div>
          
          {screen === 'selection' ? (
            // SELECTION SCREEN
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl text-[#d4668b] tracking-wide" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>
                  Choose 6 Prompts To Send To Your Valentine💌
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs text-[#8b6f47]">
                  <span className="px-3 py-1 bg-white/60 rounded-full border-2 border-[#e8d5c4]">
                    {selectedPrompts.length}/6 selected
                  </span>
                </div>
              </div>

              {/* Sparkles decoration */}
              <div className="flex justify-center gap-4 text-yellow-400">
                <span className="text-xs animate-pulse">✨</span>
                <span className="text-xs animate-pulse" style={{ animationDelay: '0.3s' }}>✨</span>
                <span className="text-xs animate-pulse" style={{ animationDelay: '0.6s' }}>✨</span>
              </div>

              {/* Prompt cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prompts.map((prompt) => {
                  const isSelected = selectedPrompts.includes(prompt.id);
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => togglePrompt(prompt.id)}
                      disabled={!isSelected && selectedPrompts.length >= 6}
                      className={`
                        relative p-4 text-left text-xs rounded border-4 transition-all
                        ${isSelected 
                          ? 'bg-[#ffc1d9] border-[#d4668b] shadow-lg scale-105' 
                          : 'bg-white/80 border-[#e8d5c4] hover:bg-[#fff5f8] hover:border-[#f0c4d4]'
                        }
                        ${!isSelected && selectedPrompts.length >= 6 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      style={{
                        boxShadow: isSelected ? '0 4px 12px rgba(212, 102, 139, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      {isSelected && (
                        <span className="absolute -top-2 -right-2 text-lg">💖</span>
                      )}
                      <span className="text-[#8b6f47]">{prompt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Generate button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={selectedPrompts.length !== 6}
                  className={`
                    px-8 py-4 text-sm rounded-lg border-4 transition-all
                    ${selectedPrompts.length === 6
                      ? 'bg-[#ffc1d9] border-[#d4668b] text-[#8b4866] hover:bg-[#ffb3d0] hover:scale-105 cursor-pointer shadow-lg'
                      : 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                    }
                  `}
                  style={{
                    boxShadow: selectedPrompts.length === 6 ? '0 6px 20px rgba(212, 102, 139, 0.4)' : 'none',
                  }}
                >
                  Generate My World ✨
                </button>
              </div>
            </div>
          ) : (
            // ANSWER ENTRY SCREEN
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl text-[#d4668b] tracking-wide" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>
                  Share Your Heart 💕
                </h1>
                <p className="text-xs text-[#8b6f47]">Answer your chosen prompts below</p>
              </div>

              {/* Decorative hearts */}
              <div className="flex justify-between px-4">
                <span className="text-pink-400 animate-pulse">💗</span>
                <span className="text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}>💗</span>
              </div>

              {/* Answer inputs */}
              <div className="space-y-5">
                {selectedPrompts.map((promptId, index) => {
                  const prompt = prompts.find(p => p.id === promptId);
                  return (
                    <div key={promptId} className="space-y-2">
                      {/* Question */}
                      <div className="flex items-start gap-2">
                        <span className="text-[#d4668b] text-xs shrink-0">
                          {index + 1}.
                        </span>
                        <label className="text-xs text-[#8b6f47] font-bold">
                          {prompt?.text}
                        </label>
                      </div>
                      
                      {/* Input area */}
                      <div className="relative">
                        <textarea
                          value={answers[promptId] || ''}
                          onChange={(e) => handleAnswerChange(promptId, e.target.value)}
                          placeholder="Write your answer here..."
                          className="w-full p-3 text-xs bg-white/80 border-4 border-[#e8d5c4] rounded focus:border-[#ffc1d9] focus:outline-none resize-none"
                          style={{
                            fontFamily: "'Silkscreen', monospace",
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                            minHeight: '80px'
                          }}
                          rows={3}
                          maxLength={579}
                        />
                        {/* Character counter */}
                        <div className="text-right mt-1">
                          <span className={`text-[10px] ${(answers[promptId] || '').length > 500 ? 'text-[#d4668b]' : 'text-[#8b6f47]'}`}>
                            {(answers[promptId] || '').length}/579
                          </span>
                        </div>
                        {/* Small decorative flower */}
                        <span className="absolute -right-2 -top-2 text-xs">🌸</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Create link button */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <button
                  onClick={handleCreateLink}
                  className="px-8 py-4 text-sm bg-[#d4a5a5] border-4 border-[#b88a8a] text-[#6b4444] rounded-lg hover:bg-[#c99595] hover:scale-105 transition-all cursor-pointer shadow-lg"
                  style={{
                    boxShadow: '0 6px 20px rgba(180, 138, 138, 0.4)',
                  }}
                >
                  Create My Secret Link ✨
                </button>
                
                {/* Back button */}
                <button
                  onClick={() => setScreen('selection')}
                  className="text-xs text-[#8b6f47] hover:text-[#d4668b] underline"
                >
                  ← Back to selection
                </button>
              </div>
            </div>
          )}

          {/* Bottom decorative edge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#e8d5c4] text-2xl">✿</div>
        </div>

        {/* Shadow effect for depth */}
        <div className="absolute inset-0 -z-10 bg-[#8b6f47]/20 blur-xl rounded-lg transform translate-y-4" />
      </div>
    </div>
  );
}