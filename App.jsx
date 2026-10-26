import { useEffect, useRef, useState } from "react";
import "./App.css";

const QUESTION_BANK = {
  Easy: [
    { id: "e1", category: "Maths", question: "What is the square root of 49?", options: ["5", "6", "7", "8"], answer: "7", hint: "Find the number that multiplied by itself gives 49.", explanation: "7 × 7 = 49." },
    { id: "e2", category: "Maths", question: "What is 9 − 4?", options: ["3", "4", "5", "6"], answer: "5", hint: "Count backwards four steps from nine.", explanation: "9 − 4 = 5." },
    { id: "e3", category: "Logic", question: "Complete the pattern: 2, 4, 6, __", options: ["7", "8", "9", "5"], answer: "8", hint: "The numbers increase by the same amount each time.", explanation: "The pattern increases by 2." },
    { id: "e4", category: "Science", question: "How many legs does a spider have?", options: ["6", "7", "8", "9"], answer: "8", hint: "A spider has four pairs of legs.", explanation: "Four pairs means 8 legs." },
    { id: "e5", category: "General Knowledge", question: "How many colours are traditionally listed in a rainbow?", options: ["5", "6", "7", "8"], answer: "7", hint: "Think of the traditional rainbow colour sequence.", explanation: "The traditional list has seven colours." },
    { id: "e6", category: "Technology", question: "How many basic states does binary use?", options: ["1", "2", "3", "4"], answer: "2", hint: "Think of the digits used in binary.", explanation: "Binary uses 0 and 1." },
    { id: "e7", category: "Logic", question: "You have 5 coins and give away 2. How many remain?", options: ["2", "3", "4", "5"], answer: "3", hint: "Subtract the coins you gave away.", explanation: "5 − 2 = 3." },
    { id: "e8", category: "General Knowledge", question: "How many sides does a pentagon have?", options: ["4", "5", "6", "7"], answer: "5", hint: "A square has four sides. A pentagon has one more.", explanation: "A pentagon has five sides." },
    { id: "e9", category: "Maths", question: "What is half of 14?", options: ["5", "6", "7", "8"], answer: "7", hint: "Divide 14 into two equal groups.", explanation: "14 ÷ 2 = 7." },
    { id: "e10", category: "Science", question: "How many poles does a simple bar magnet have?", options: ["1", "2", "3", "4"], answer: "2", hint: "Think of north and south.", explanation: "A magnet has a north pole and a south pole." },
    { id: "e11", category: "Maths", question: "What is 3 × 3?", options: ["6", "7", "8", "9"], answer: "9", hint: "Add three three times.", explanation: "3 × 3 = 9." },
    { id: "e12", category: "General Knowledge", question: "How many days are there in a standard week?", options: ["5", "6", "7", "8"], answer: "7", hint: "A week includes weekdays and the weekend.", explanation: "A standard week has seven days." },
  ],
  Medium: [
    { id: "m1", category: "Maths", question: "If 3x = 21, what is x?", options: ["5", "6", "7", "8"], answer: "7", hint: "Divide both sides by 3.", explanation: "21 ÷ 3 = 7." },
    { id: "m2", category: "Maths", question: "What is the remainder when 17 is divided by 5?", options: ["1", "2", "3", "4"], answer: "2", hint: "Find the largest multiple of 5 below 17.", explanation: "15 is the nearest lower multiple of 5, leaving 2." },
    { id: "m3", category: "Maths", question: "What is 15% of 20?", options: ["2", "3", "4", "5"], answer: "3", hint: "Find 10% and 5% separately, then add them.", explanation: "10% of 20 is 2 and 5% is 1, so the total is 3." },
    { id: "m4", category: "Technology", question: "How many bits are in a standard byte?", options: ["4", "6", "8", "9"], answer: "8", hint: "A byte is a common unit of digital information.", explanation: "One standard byte contains 8 bits." },
    { id: "m5", category: "Science", question: "What is the atomic number of boron?", options: ["3", "4", "5", "6"], answer: "5", hint: "It comes after beryllium, whose atomic number is 4.", explanation: "Boron has atomic number 5." },
    { id: "m6", category: "Logic", question: "A farmer has 4 cows and 3 goats. How many animals are there?", options: ["5", "6", "7", "8"], answer: "7", hint: "Add the two groups together.", explanation: "4 + 3 = 7." },
    { id: "m7", category: "Maths", question: "What is the value of 2³?", options: ["4", "6", "8", "9"], answer: "8", hint: "Multiply 2 by itself three times.", explanation: "2 × 2 × 2 = 8." },
    { id: "m8", category: "Logic", question: "If today is Sunday, how many days until Tuesday?", options: ["1", "2", "3", "4"], answer: "2", hint: "Count Monday as the first day after Sunday.", explanation: "Tuesday is two days after Sunday." },
    { id: "m9", category: "Science", question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], answer: "4", hint: "The heart has two upper and two lower chambers.", explanation: "The human heart has four chambers." },
    { id: "m10", category: "Logic", question: "Which number comes next: 1, 3, 5, 7, __?", options: ["6", "8", "9", "4"], answer: "9", hint: "These numbers are odd numbers in increasing order.", explanation: "The next odd number is 9." },
    { id: "m11", category: "Science", question: "At sea level, what is the freezing point of water in °C?", options: ["0", "2", "5", "8"], answer: "0", hint: "It is the temperature at which ice begins to melt under standard conditions.", explanation: "Water freezes at 0°C under standard conditions." },
    { id: "m12", category: "General Knowledge", question: "How many rings are on the Olympic symbol?", options: ["3", "4", "5", "6"], answer: "5", hint: "The symbol has interlocking rings.", explanation: "The Olympic symbol contains five rings." },
  ],
  Hard: [
    { id: "h1", category: "Maths", question: "What is the smallest prime number greater than 5?", options: ["6", "7", "8", "9"], answer: "7", hint: "A prime number has exactly two positive factors.", explanation: "7 is prime; 6, 8 and 9 are not." },
    { id: "h2", category: "Maths", question: "What is the remainder when 29 is divided by 5?", options: ["2", "3", "4", "5"], answer: "4", hint: "Find the closest multiple of 5 below 29.", explanation: "25 is the nearest lower multiple of 5, leaving 4." },
    { id: "h3", category: "Maths", question: "If 2x + 3 = 17, what is x?", options: ["5", "6", "7", "8"], answer: "7", hint: "Subtract 3 first, then divide by 2.", explanation: "2x = 14, so x = 7." },
    { id: "h4", category: "Logic", question: "A cube has how many faces?", options: ["4", "6", "8", "9"], answer: "6", hint: "Think of the top, bottom and four side faces.", explanation: "A cube has six faces." },
    { id: "h5", category: "Science", question: "What is the atomic number of oxygen?", options: ["6", "7", "8", "9"], answer: "8", hint: "Oxygen has two more protons than carbon.", explanation: "Oxygen has atomic number 8." },
    { id: "h6", category: "Maths", question: "What is the greatest common divisor of 18 and 24?", options: ["3", "4", "6", "8"], answer: "6", hint: "Find the largest number that divides both without a remainder.", explanation: "6 divides both 18 and 24." },
    { id: "h7", category: "Logic", question: "Three machines make three parts in three minutes. How many minutes would one machine take to make one part?", options: ["1", "2", "3", "9"], answer: "3", hint: "Each machine works at the same rate independently.", explanation: "Each machine makes one part in three minutes." },
    { id: "h8", category: "Maths", question: "What is 20% of 35?", options: ["5", "6", "7", "8"], answer: "7", hint: "Find one-fifth of 35.", explanation: "35 ÷ 5 = 7." },
    { id: "h9", category: "Science", question: "How many electrons does a neutral oxygen atom have?", options: ["6", "7", "8", "9"], answer: "8", hint: "A neutral atom has the same number of electrons and protons.", explanation: "Oxygen has 8 protons and 8 electrons when neutral." },
    { id: "h10", category: "Technology", question: "In binary, what decimal number does 100 represent?", options: ["2", "3", "4", "5"], answer: "4", hint: "The binary places represent 4, 2 and 1.", explanation: "Binary 100 equals decimal 4." },
    { id: "h11", category: "Logic", question: "A square has 4 corners. How many corners do two separate squares have altogether?", options: ["4", "6", "8", "9"], answer: "8", hint: "Count the corners of each square.", explanation: "4 + 4 = 8 corners." },
    { id: "h12", category: "Maths", question: "What is the value of 3² − 2²?", options: ["3", "4", "5", "6"], answer: "5", hint: "Square each number first, then subtract.", explanation: "9 − 4 = 5." },
  ],
};

const ROUND_LENGTH = 4;
const ROUND_TIME = 60;
const LEADERBOARD_KEY = "codevault-leaderboard-v3";

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createRound(level, previousIds = []) {
  const bank = QUESTION_BANK[level];
  let selection = shuffle(bank).slice(0, ROUND_LENGTH);

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const ids = selection.map((q) => q.id).sort().join(",");
    const oldIds = [...previousIds].sort().join(",");
    if (previousIds.length === 0 || ids !== oldIds) break;
    selection = shuffle(bank).slice(0, ROUND_LENGTH);
  }

  return selection.map((q) => ({ ...q, options: shuffle(q.options) }));
}

function readLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
  } catch {
    return [];
  }
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" />
    </svg>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [level, setLevel] = useState("Medium");
  const [questions, setQuestions] = useState(() => createRound("Medium"));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealedDigits, setRevealedDigits] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [enteredCode, setEnteredCode] = useState("");
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState(readLeaderboard);
  const previousIdsRef = useRef([]);
  const resultRef = useRef(null);
  const currentQuestion = questions[questionIndex];
  const correctCode = questions.map((q) => q.answer).join("");

  useEffect(() => {
    if (page !== "quiz" || resultRef.current) return undefined;
    if (timeLeft <= 0) {
      finishGame("timeout");
      return undefined;
    }
    const timer = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, timeLeft]);

  function goHome() {
    resultRef.current = null;
    setPage("home");
    setFeedback(null);
    setHintVisible(false);
    setSelectedAnswer("");
    setEnteredCode("");
    setResult(null);
  }

  function startGame() {
    if (!playerName.trim()) {
      window.alert("Please enter your name first!");
      return;
    }
    const newQuestions = createRound(level, previousIdsRef.current);
    previousIdsRef.current = newQuestions.map((q) => q.id);
    resultRef.current = null;
    setQuestions(newQuestions);
    setQuestionIndex(0);
    setRevealedDigits([]);
    setSelectedAnswer("");
    setHintVisible(false);
    setFeedback(null);
    setTimeLeft(ROUND_TIME);
    setEnteredCode("");
    setResult(null);
    setPage("quiz");
  }

  function finishGame(status, codeAttempt = "") {
    if (resultRef.current) return;
    const won = status === "won";
    const correctAnswers = revealedDigits.length;
    const score = won ? 100 + timeLeft + correctAnswers * 10 : correctAnswers * 10;
    const newResult = {
      name: playerName.trim() || "Player",
      level,
      won,
      status,
      score,
      correctAnswers,
      timeLeft: Math.max(0, timeLeft),
      date: new Date().toLocaleString(),
      codeAttempt,
    };
    resultRef.current = newResult;
    setResult(newResult);
    setLeaderboard((previous) => {
      const updated = [...previous, newResult]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
      } catch {
        // Continue even if local storage is unavailable.
      }
      return updated;
    });
    setPage("result");
  }

  function submitAnswer(option) {
    if (!currentQuestion || feedback) return;
    setSelectedAnswer(option);
    if (option === currentQuestion.answer) {
      setFeedback({
        type: "correct",
        message: `Correct! You found digit ${currentQuestion.answer}.`,
        explanation: currentQuestion.explanation,
      });
      setRevealedDigits((previous) => [...previous, currentQuestion.answer]);

      window.setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer("");
        setHintVisible(false);
        if (questionIndex + 1 >= ROUND_LENGTH) {
          setPage("vault");
        } else {
          setQuestionIndex((previous) => previous + 1);
        }
      }, 900);
    } else {
      setFeedback({
        type: "wrong",
        message: "Not quite! Try again.",
        explanation: "",
      });
      window.setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer("");
      }, 650);
    }
  }

  function submitCode(event) {
    event.preventDefault();
    if (!/^\d{4}$/.test(enteredCode)) {
      setFeedback({ type: "wrong", message: "Enter exactly four digits.", explanation: "" });
      return;
    }
    if (enteredCode === correctCode) {
      finishGame("won", enteredCode);
    } else {
      setFeedback({
        type: "wrong",
        message: "Access denied! The code is incorrect.",
        explanation: "Use the four digits revealed by your correct answers.",
      });
    }
  }

  function openLeaderboard() {
    setLeaderboard(readLeaderboard());
    setPage("leaderboard");
  }

  const progress = (revealedDigits.length / ROUND_LENGTH) * 100;

  return (
    <div className="app-shell">
      <div className="background-grid" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <header className="topbar">
        <button className="brand" onClick={goHome} aria-label="CodeVault home">
          <span className="brand-icon">C</span>
          <span>CODE<span className="brand-accent">VAULT</span></span>
        </button>
        {page !== "home" && (
          <button className="home-button" onClick={goHome}>
            <HomeIcon /><span>Home</span>
          </button>
        )}
      </header>

      <main className="main-content">
        {page === "home" && (
          <section className="hero-panel">
            <div className="eyebrow"><span className="status-dot" /> SECURITY SYSTEM ONLINE</div>
            <div className="hero-lock" aria-hidden="true">⌑</div>
            <h1>Can you crack<br /><span>the code?</span></h1>
            <p className="hero-description">
              Solve four questions, discover four digits and unlock the vault before time runs out.
            </p>

            <div className="feature-row">
              <div className="feature-card"><span className="feature-icon">◷</span><strong>60 SECONDS</strong><small>Beat the clock</small></div>
              <div className="feature-card"><span className="feature-icon">⌗</span><strong>4 DIGITS</strong><small>One per answer</small></div>
              <div className="feature-card"><span className="feature-icon">◇</span><strong>3 LEVELS</strong><small>Choose your challenge</small></div>
            </div>

            <label className="name-label" htmlFor="player-name">ENTER YOUR PLAYER NAME</label>
            <input
              id="player-name"
              className="name-input"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") startGame(); }}
              maxLength={24}
              placeholder="Your name..."
            />

            <label className="name-label" htmlFor="difficulty">CHOOSE DIFFICULTY</label>
            <select id="difficulty" className="difficulty-select" value={level} onChange={(event) => setLevel(event.target.value)}>
              <option value="Easy">Easy — warm up</option>
              <option value="Medium">Medium — think fast</option>
              <option value="Hard">Hard — expert mode</option>
            </select>

            <button className="primary-button start-button" onClick={startGame}>START CHALLENGE <span>→</span></button>
            <button className="text-button" onClick={openLeaderboard}>VIEW LEADERBOARD ↗</button>
            <p className="home-note">Hints available · No AWS knowledge required</p>
          </section>
        )}

        {page === "quiz" && currentQuestion && (
          <section className="game-panel">
            <div className="game-topline">
              <span className="eyebrow">VAULT SECURITY TEST · {level.toUpperCase()}</span>
              <div className={`timer ${timeLeft <= 10 ? "timer-danger" : ""}`}>◷ 00:{String(timeLeft).padStart(2, "0")}</div>
            </div>

            <div className="progress-heading">
              <span>QUESTION {questionIndex + 1} OF {ROUND_LENGTH}</span>
              <span>{revealedDigits.length}/{ROUND_LENGTH} DIGITS FOUND</span>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

            <div className="digit-preview">
              {Array.from({ length: ROUND_LENGTH }, (_, index) => (
                <div className={`digit-slot ${revealedDigits[index] !== undefined ? "digit-found" : ""}`} key={index}>
                  {revealedDigits[index] !== undefined ? revealedDigits[index] : "?"}
                </div>
              ))}
            </div>

            <div className="question-card">
              <div className="category-tag">{currentQuestion.category}</div>
              <h2>{currentQuestion.question}</h2>
              <p className="question-instruction">Choose the correct answer to reveal one digit.</p>

              <div className="hint-area">
                <button className="hint-button" onClick={() => setHintVisible((visible) => !visible)}>
                  💡 {hintVisible ? "HIDE HINT" : "SHOW HINT"}
                </button>
                {hintVisible && (
                  <div className="hint-feedback">
                    <strong>💡 Hint</strong>
                    <p>{currentQuestion.hint}</p>
                  </div>
                )}
              </div>

              <div className="answer-grid">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = isSelected && option === currentQuestion.answer;
                  return (
                    <button
                      key={`${currentQuestion.id}-${option}`}
                      className={`answer-button ${isSelected ? "answer-selected" : ""} ${isCorrect ? "answer-correct" : ""}`}
                      onClick={() => submitAnswer(option)}
                      disabled={Boolean(feedback)}
                    >
                      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <div className={`feedback-message ${feedback.type}`}>
                  <strong>{feedback.message}</strong>
                  {feedback.explanation && <p>{feedback.explanation}</p>}
                </div>
              )}
            </div>
            <button className="text-button back-link" onClick={goHome}>← QUIT TO HOME</button>
          </section>
        )}

        {page === "vault" && (
          <section className="vault-panel">
            <div className="eyebrow"><span className="status-dot" /> ALL QUESTIONS SOLVED</div>
            <div className="vault-symbol">▣</div>
            <h1>Final <span>checkpoint</span></h1>
            <p className="hero-description">Enter the four digits you discovered to unlock the vault.</p>
            <div className="digit-preview vault-preview">
              {revealedDigits.map((digit, index) => <div className="digit-slot digit-found" key={index}>{digit}</div>)}
            </div>
            <form className="code-form" onSubmit={submitCode}>
              <label className="name-label" htmlFor="vault-code">ENTER 4-DIGIT CODE</label>
              <input
                id="vault-code"
                className="code-input"
                inputMode="numeric"
                maxLength={4}
                autoComplete="off"
                value={enteredCode}
                onChange={(event) => { setEnteredCode(event.target.value.replace(/\D/g, "").slice(0, 4)); setFeedback(null); }}
                placeholder="••••"
              />
              <button className="primary-button" type="submit">UNLOCK VAULT →</button>
            </form>
            {feedback && <div className={`feedback-message ${feedback.type}`}><strong>{feedback.message}</strong><p>{feedback.explanation}</p></div>}
            <button className="text-button" onClick={goHome}>← BACK TO HOME</button>
          </section>
        )}

        {page === "result" && result && (
          <section className="result-panel">
            <div className={`result-emblem ${result.won ? "result-won" : "result-lost"}`}>{result.won ? "✓" : "×"}</div>
            <div className="eyebrow">{result.won ? "VAULT UNLOCKED" : "CHALLENGE COMPLETE"}</div>
            <h1>{result.won ? "Access granted!" : result.status === "timeout" ? "Time's up!" : "Not this time!"}</h1>
            <p className="hero-description">
              {result.won ? `Excellent work, ${result.name}. You cracked CodeVault.` : "Try again with a fresh set of questions."}
            </p>
            <div className="result-score-card"><small>YOUR SCORE</small><strong>{result.score}</strong><span>POINTS</span></div>
            <div className="result-stats">
              <div><strong>{result.correctAnswers}/4</strong><span>Digits found</span></div>
              <div><strong>{result.timeLeft}s</strong><span>Time remaining</span></div>
              <div><strong>{result.level}</strong><span>Difficulty</span></div>
            </div>
            <button className="primary-button" onClick={startGame}>PLAY AGAIN ↻</button>
            <button className="secondary-button" onClick={openLeaderboard}>VIEW LEADERBOARD</button>
            <button className="text-button" onClick={goHome}>← BACK TO HOME</button>
          </section>
        )}

        {page === "leaderboard" && (
          <section className="leaderboard-panel">
            <div className="eyebrow">TOP OPERATORS</div>
            <h1>Hall of <span>fame</span></h1>
            <p className="hero-description">The fastest minds to challenge CodeVault.</p>
            {leaderboard.length === 0 ? (
              <div className="empty-leaderboard"><div>◇</div><h3>No scores yet</h3><p>Be the first to crack the vault!</p></div>
            ) : (
              <div className="leaderboard-list">
                <div className="leaderboard-head"><span>RANK / PLAYER</span><span>RESULT</span><span>SCORE</span></div>
                {leaderboard.map((entry, index) => (
                  <div className="leaderboard-row" key={`${entry.name}-${entry.date}-${index}`}>
                    <div className="player-cell">
                      <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span>
                      <span className="player-name">{entry.name}</span>
                    </div>
                    <span className={entry.won ? "win-label" : "loss-label"}>{entry.won ? "UNLOCKED" : "LOCKED"}</span>
                    <strong className="score-value">{entry.score}</strong>
                  </div>
                ))}
              </div>
            )}
            <button className="primary-button" onClick={goHome}>BACK TO HOME</button>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>CODEVAULT <span className="footer-separator">/</span> LOGIC UNDER PRESSURE</span>
        <span>BUILT FOR CURIOUS MINDS</span>
      </footer>
    </div>
  );
}

export default App;
