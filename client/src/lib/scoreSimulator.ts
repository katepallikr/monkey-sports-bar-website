
// This is a simulation engine to mimic live sports data.
// In a real application, this would be replaced by a WebSocket connection to a sports data provider.

export interface LiveScore {
    id: string;
    league: string;
    match: string;
    score: string;
    time: string;
    isLive: boolean;
}

const INITIAL_SCORES: LiveScore[] = [
    { id: "1", league: "NBA", match: "LAL vs CHI", score: "102 - 98", time: "Q4 8:45", isLive: true },
    { id: "2", league: "NHL", match: "EDM vs ANA", score: "3 - 2", time: "P3 14:20", isLive: true },
    { id: "3", league: "AUS OPEN", match: "Djokovic vs Sinner", score: "2-1 Sets", time: "Set 4 5-4", isLive: true },
    { id: "4", league: "NBA", match: "GSW vs MIN", score: "88 - 92", time: "Q3 2:15", isLive: true },
    { id: "5", league: "AUS OPEN", match: "Sabalenka vs Gauff", score: "6-4, 2-6", time: "Set 3 1-0", isLive: true },
    { id: "6", league: "NCAAM", match: "Kansas vs Iowa St", score: "72 - 68", time: "2nd 1:30", isLive: true },
];

class ScoreSimulator {
    private scores: LiveScore[] = [...INITIAL_SCORES];
    private listeners: ((scores: LiveScore[]) => void)[] = [];
    private intervalId: NodeJS.Timeout | null = null;

    constructor() {
        this.startSimulation();
    }

    private startSimulation() {
        this.intervalId = setInterval(() => {
            this.updateScores();
            this.notifyListeners();
        }, 1000); // Update every second
    }

    private updateScores() {
        this.scores = this.scores.map((game) => {
            // NBA Logic
            if (game.league === "NBA" || game.league === "NCAAM") {
                return this.updateBasketball(game);
            }
            // NHL Logic
            if (game.league === "NHL") {
                return this.updateHockey(game);
            }
            // Tennis Logic
            if (game.league === "AUS OPEN") {
                return this.updateTennis(game);
            }
            return game;
        });
    }

    private updateBasketball(game: LiveScore): LiveScore {
        // Parse time "Q4 8:45"
        let [period, timeStr] = game.time.split(" ");
        if (!timeStr && period.includes(":")) {
            timeStr = period;
            period = "2nd";
        }

        let [min, sec] = timeStr ? timeStr.split(":").map(Number) : [10, 0];

        // Tick down
        if (sec > 0) {
            sec--;
        } else if (min > 0) {
            min--;
            sec = 59;
        } else {
            // End of period logic (simplified: reset)
            min = 12;
            sec = 0;
        }

        // Random Object Score Update (10% chance)
        let [scoreA, scoreB] = game.score.split(" - ").map(Number);
        if (Math.random() < 0.1) {
            if (Math.random() < 0.5) scoreA += Math.random() < 0.3 ? 3 : 2;
            else scoreB += Math.random() < 0.3 ? 3 : 2;
        }

        return {
            ...game,
            score: `${scoreA} - ${scoreB}`,
            time: `${period} ${min}:${sec.toString().padStart(2, "0")}`,
        };
    }

    private updateHockey(game: LiveScore): LiveScore {
        // Parse time "P3 14:20"
        let [period, timeStr] = game.time.split(" ");
        let [min, sec] = timeStr.split(":").map(Number);

        if (sec > 0) {
            sec--;
        } else if (min > 0) {
            min--;
            sec = 59;
        }

        // Random Score (lower freq)
        let [scoreA, scoreB] = game.score.split(" - ").map(Number);
        if (Math.random() < 0.01) {
            // Goal!
            Math.random() < 0.5 ? scoreA++ : scoreB++;
        }

        return {
            ...game,
            score: `${scoreA} - ${scoreB}`,
            time: `${period} ${min}:${sec.toString().padStart(2, "0")}`,
        };
    }

    private updateTennis(game: LiveScore): LiveScore {
        // "Set 4 5-4"
        // Very simplified tennis simulation
        // Just wiggle the game scores occasionally
        // This is complex to sim properly in 2 seconds, checking for "Deuce" etc is overkill
        // We'll just maybe change the games every 60s
        return game;
    }

    public subscribe(listener: (scores: LiveScore[]) => void) {
        this.listeners.push(listener);
        listener(this.scores); // Initial data
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this.scores));
    }
}

export const scoreSimulator = new ScoreSimulator();
