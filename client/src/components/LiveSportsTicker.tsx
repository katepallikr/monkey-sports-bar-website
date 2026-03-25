import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { scoreSimulator, type LiveScore } from "../lib/scoreSimulator";

// Fallback data to ensure ticker is never empty
const FALLBACK_SCORES: LiveScore[] = [
  { id: "1", league: "NBA", match: "LAL vs CHI", score: "102 - 98", time: "Q4 8:45", isLive: true },
  { id: "2", league: "NHL", match: "EDM vs ANA", score: "3 - 2", time: "P3 14:20", isLive: true },
  { id: "3", league: "AUS OPEN", match: "Djokovic vs Sinner", score: "2-1", time: "Set 4", isLive: true },
  { id: "4", league: "NBA", match: "GSW vs MIN", score: "88 - 92", time: "Q3 2:15", isLive: true },
];

export default function LiveSportsTicker() {
  const [scores, setScores] = useState<LiveScore[]>(FALLBACK_SCORES);

  useEffect(() => {
    const unsubscribe = scoreSimulator.subscribe((newScores) => {
      // Only update if we actually get scores, preventing empty flash
      if (newScores && newScores.length > 0) {
        setScores(newScores);
      }
    });
    return unsubscribe;
  }, []);

  // Removed the "if null" check to guarantee render
  // Changed bg-black/80 to bg-transparent so it takes Navbar primary color
  return (
    <div className="w-full bg-transparent overflow-hidden backdrop-blur-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex space-x-12 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {/* Double array for seamless loop */}
          {[...scores, ...scores].map((score, i) => (
            <div key={`${score.id}-${i}`} className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-white/90 font-bold text-xs/none animate-pulse">
                <span className="mr-1">●</span> LIVE
              </div>
              <span className="font-bold text-white">{score.league}</span>
              <span className="text-white/80">{score.match}</span>
              <span className="font-mono text-white font-bold tracking-wide">{score.score}</span>
              <span className="text-xs text-white/70 font-mono">({score.time})</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
