import { useEffect, useMemo, useState } from "react";
import "./App.css";

const QUESTION_BANK = {
  Easy: [
    ["e-m1", "Math", "What is 12 − 7?", ["3", "5", "6", "4"], "5", "Subtract 7 from 12.", "12 − 7 = 5."],
    ["e-m2", "Math", "What is 3 × 2?", ["4", "5", "6", "8"], "6", "Add 3 twice.", "3 × 2 = 6."],
    ["e-m3", "Math", "What is 18 ÷ 3?", ["6", "9", "3", "5"], "6", "How many groups of 3 make 18?", "18 ÷ 3 = 6."],
    ["e-m4", "Math", "What is 9 − 4?", ["4", "6", "5", "3"], "5", "Count backwards four steps from 9.", "9 − 4 = 5."],

    ["e-l1", "Logic", "Find the next number: 2, 4, 6, __", ["7", "9", "8", "5"], "8", "The numbers increase by 2.", "The next number is 8."],
    ["e-l2", "Logic", "How many letters are in the word CAT?", ["2", "3", "4", "5"], "3", "Spell the word slowly.", "CAT has 3 letters."],
    ["e-l3", "Logic", "You have 4 apples and get 3 more. How many now?", ["6", "8", "7", "5"], "7", "Add the apples together.", "4 + 3 = 7."],
    ["e-l4", "Logic", "Find the missing number: 1, 3, 5, __", ["6", "8", "7", "9"], "7", "Each number increases by 2.", "The next odd number is 7."],

    ["e-g1", "General Knowledge", "How many days are in a week?", ["5", "6", "7", "8"], "7", "Think of Monday through Sunday.", "A week has 7 days."],
    ["e-g2", "General Knowledge", "How many colours are traditionally named in a rainbow?", ["5", "6", "7", "8"], "7", "Remember VIBGYOR.", "A rainbow is traditionally described as having 7 colours."],
    ["e-g3", "General Knowledge", "How many wheels does a standard bicycle have?", ["1", "3", "2", "4"], "2", "Think of the front and back wheels.", "A standard bicycle has 2 wheels."],
    ["e-g4", "General Knowledge", "How many sides does a triangle have?", ["4", "3", "5", "6"], "3", "The shape's name is a clue.", "A triangle has 3 sides."],

    ["e-s1", "Technology & Science", "How many legs does an insect have?", ["4", "6", "8", "2"], "6", "Think of an ant.", "Insects have 6 legs."],
    ["e-s2", "Technology & Science", "How many planets are in our Solar System?", ["7", "8", "9", "6"], "8", "Pluto is classified as a dwarf planet.", "Our Solar System has 8 planets."],
    ["e-s3", "Technology & Science", "How many poles does a simple bar magnet have?", ["1", "3", "2", "4"], "2", "Think of north and south.", "A bar magnet has 2 poles."],
    ["e-s4", "Technology & Science", "How many bytes are in a standard 8-bit byte?", ["4", "8", "16", "2"], "8", "The question itself mentions the bit count.", "A byte contains 8 bits."],

    ["e-m5", "Math", "What is 14 − 8?", ["5", "7", "6", "4"], "6", "Subtract eight from fourteen.", "14 − 8 = 6."],
    ["e-l5", "Logic", "A clock shows 3 o'clock. What number is opposite 3 on the dial?", ["6", "9", "12", "8"], "9", "Look across the centre of the clock.", "The number opposite 3 is 9."],
    ["e-g5", "General Knowledge", "How many months are in a year?", ["10", "11", "12", "9"], "12", "Count from January to December.", "There are 12 months in a year."],
    ["e-s5", "Technology & Science", "How many eyes does a typical human have?", ["1", "3", "2", "4"], "2", "Think about normal human vision.", "A typical human has 2 eyes."],
  ],

  Medium: [
    ["m-m1", "Math", "What is 36 ÷ 6?", ["5", "7", "6", "8"], "6", "What number multiplied by 6 gives 36?", "36 ÷ 6 = 6."],
    ["m-m2", "Math", "What is 7 × 8?", ["54", "56", "48", "64"], "56", "Recall the seven-times table.", "7 × 8 = 56."],
    ["m-m3", "Math", "What is the remainder when 23 is divided by 5?", ["2", "3", "4", "1"], "3", "5 × 4 = 20. What remains?", "23 − 20 = 3."],
    ["m-m4", "Math", "What is 45 ÷ 9?", ["4", "6", "5", "7"], "5", "Nine multiplied by what gives 45?", "45 ÷ 9 = 5."],

    ["m-l1", "Logic", "Find the next number: 3, 6, 12, 24, __. What is its last digit?", ["6", "8", "4", "2"], "8", "Double 24, then take the last digit.", "24 × 2 = 48; the last digit is 8."],
    ["m-l2", "Logic", "Three cats catch three mice in three minutes. How many mice do three cats catch in nine minutes?", ["6", "9", "3", "12"], "9", "Each cat catches one mouse every three minutes.", "Three cats catch 9 mice in nine minutes."],
    ["m-l3", "Logic", "Find the missing number: 2, 6, 12, 20, __", ["28", "30", "32", "26"], "30", "The pattern is 1×2, 2×3, 3×4, 4×5.", "The next is 5 × 6 = 30."],
    ["m-l4", "Logic", "A number is doubled and then 3 is added. The result is 15. What is the original number?", ["5", "6", "7", "9"], "6", "Work backwards: subtract 3, then divide by 2.", "(15 − 3) ÷ 2 = 6."],

    ["m-g1", "General Knowledge", "How many players from one team are on the field in standard football (soccer)?", ["9", "10", "11", "12"], "11", "Count the goalkeeper too.", "A standard team has 11 players on the field."],
    ["m-g2", "General Knowledge", "How many rings appear on the Olympic symbol?", ["4", "5", "6", "7"], "5", "Count the interlocking rings.", "The Olympic symbol has 5 rings."],
    ["m-g3", "General Knowledge", "How many sides does a hexagon have?", ["5", "6", "7", "8"], "6", "A hexagon is a six-sided polygon.", "A hexagon has 6 sides."],
    ["m-g4", "General Knowledge", "How many letters are in the English alphabet?", ["24", "25", "26", "27"], "26", "Think from A to Z.", "The English alphabet has 26 letters."],

    ["m-s1", "Technology & Science", "How many bits are in one byte?", ["4", "8", "16", "2"], "8", "A byte is made from a group of bits.", "One byte contains 8 bits."],
    ["m-s2", "Technology & Science", "What is the atomic number of carbon?", ["4", "6", "8", "12"], "6", "Carbon has six protons.", "Carbon's atomic number is 6."],
    ["m-s3", "Technology & Science", "How many chambers does a human heart have?", ["2", "3", "4", "5"], "4", "Think of the upper and lower chambers on both sides.", "The human heart has 4 chambers."],
    ["m-s4", "Technology & Science", "How many states can one binary digit represent?", ["1", "2", "3", "4"], "2", "Binary uses 0 and 1.", "A binary digit has 2 possible states."],

    ["m-m5", "Math", "What is the last digit of 7 × 7?", ["7", "8", "9", "6"], "9", "Calculate 49.", "7 × 7 = 49; the last digit is 9."],
    ["m-l5", "Logic", "If yesterday was Monday, what number represents the day after tomorrow if Monday = 1 and Sunday = 7?", ["3", "4", "5", "6"], "4", "Yesterday was Monday, so today is Tuesday.", "The day after tomorrow is Thursday, represented by 4."],
    ["m-g5", "General Knowledge", "How many continents are commonly taught in the seven-continent model?", ["5", "6", "7", "8"], "7", "Count the commonly recognised continents.", "The seven-continent model has 7 continents."],
    ["m-s5", "Technology & Science", "How many degrees are in a right angle?", ["45", "60", "90", "180"], "90", "A right angle is one quarter of a full turn.", "A right angle measures 90 degrees."],
  ],

  Hard: [
    ["h-m1", "Math", "What is the last digit of 19 × 7?", ["1", "2", "3", "4"], "3", "19 × 7 = 133.", "The last digit of 133 is 3."],
    ["h-m2", "Math", "What is the units digit of 8²?", ["2", "4", "6", "8"], "4", "8² = 64.", "The units digit of 64 is 4."],
    ["h-m3", "Math", "What is the remainder when 47 is divided by 9?", ["1", "2", "3", "4"], "2", "9 × 5 = 45.", "47 − 45 = 2."],
    ["h-m4", "Math", "What is the last digit of 6³?", ["2", "4", "6", "8"], "6", "6 × 6 × 6 = 216.", "The last digit of 216 is 6."],

    ["h-l1", "Logic", "Find the next number: 1, 4, 9, 16, __. What is its last digit?", ["3", "4", "5", "6"], "5", "These are consecutive square numbers.", "The next square is 25; its last digit is 5."],
    ["h-l2", "Logic", "A code pattern is 2, 3, 5, 8, 3, ... Each new number is the sum of the previous two, keeping only the last digit. What comes next?", ["1", "2", "4", "6"], "1", "Add 8 and 3, then keep the last digit.", "8 + 3 = 11, so the next digit is 1."],
    ["h-l3", "Logic", "If all bloops are razzies and all razzies are lazzies, are all bloops lazzies? Enter 1 for yes.", ["0", "1", "2", "3"], "1", "Follow the two statements in order.", "Yes. The answer is 1."],
    ["h-l4", "Logic", "A pattern doubles each time: 3, 6, 12, 24, __. What is the last digit of the next number?", ["6", "8", "2", "4"], "8", "Double 24.", "24 × 2 = 48; the last digit is 8."],

    ["h-g1", "General Knowledge", "How many players are on court for one basketball team during normal play?", ["4", "5", "6", "7"], "5", "Count the players from one team on court.", "A basketball team has 5 players on court."],
    ["h-g2", "General Knowledge", "How many permanent members are on the UN Security Council?", ["3", "4", "5", "6"], "5", "The permanent members have veto power.", "There are 5 permanent members."],
    ["h-g3", "General Knowledge", "How many sides does an octagon have?", ["6", "7", "8", "9"], "8", "An octagon is an eight-sided polygon.", "An octagon has 8 sides."],
    ["h-g4", "General Knowledge", "How many years are in a decade?", ["5", "10", "12", "20"], "10", "A decade is a period of ten years.", "A decade has 10 years."],

    ["h-s1", "Technology & Science", "How many protons does an oxygen atom have?", ["6", "7", "8", "9"], "8", "Oxygen's atomic number tells you its proton count.", "Oxygen has 8 protons."],
    ["h-s2", "Technology & Science", "How many bits are in a nibble?", ["2", "4", "8", "16"], "4", "A nibble is half a byte.", "A nibble contains 4 bits."],
    ["h-s3", "Technology & Science", "How many DNA strands form the usual double helix?", ["1", "2", "3", "4"], "2", "Think of the word double.", "A DNA double helix has 2 strands."],
    ["h-s4", "Technology & Science", "What is the pH of neutral water at about 25°C?", ["5", "6", "7", "8"], "7", "Neutral is between acidic and alkaline.", "Neutral water has a pH of about 7."],

    ["h-m5", "Math", "What is the last digit of 13 × 13?", ["7", "8", "9", "6"], "9", "13 × 13 = 169.", "The last digit of 169 is 9."],
    ["h-l5", "Logic", "If the day before yesterday was Friday, how many days after Sunday is today?", ["1", "2", "3", "4"], "2", "The day before yesterday was Friday, so today is Sunday.", "Today is Sunday, which is 2 days after Friday."],
    ["h-g5", "General Knowledge", "How many cards are in a standard deck without jokers?", ["48", "50", "52", "54"], "52", "There are four suits.", "A standard deck contains 52 cards."],
    ["h-s5", "Technology & Science", "How many quarks make up a proton in the basic quark model?", ["1", "2", "3", "4"], "3", "A proton is made of up and down quarks.", "A proton contains 3 valence quarks."],
  ],
};

const CATEGORIES = [
  "Math",
  "Logic",
  "General Knowledge",
  "Technology & Science",
];

const STORAGE_KEYS = {
  scores: "codevault_leaderboard_v2",
  used: "codevault_used_questions_v2",
};

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    trophy: <><path d="M8 21h8M12 17v4" /><path d="M7 4h10v6a5 5 0 0 1-10 0z" /><path d="M7 6H3v2a4 4 0 0 0 4 4M17 6h4v2a4 4 0 0 1-4 4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    bulb: <><path d="M9 18h6M10 22h4" /><path d="M8 14a7 7 0 1 1 8 0c-1 .7-1 2-1 2h-6s0-1.3-1-2z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7z" />,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="m9 12 2 2 4-4" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRoundQuestions(difficulty) {
  const used = readStorage(STORAGE_KEYS.used, {});
  const bank = QUESTION_BANK[difficulty];

  const picked = CATEGORIES.map((category) => {
    const categoryBank = bank.filter((q) => q[1] === category);
    let usedIds = used[difficulty] || [];

    let available = categoryBank.filter((q) => !usedIds.includes(q[0]));

    // Start a fresh cycle only after this category's questions are exhausted.
    if (available.length === 0) {
      usedIds = usedIds.filter((id) => !categoryBank.some((q) => q[0] === id));
      available = categoryBank;
    }

    const selected = shuffle(available)[0];
    used[difficulty] = [...new Set([...(used[difficulty] || []), selected[0]])];

    return selected;
  });

  localStorage.setItem(STORAGE_KEYS.used, JSON.stringify(used));

  return shuffle(picked).map((q) => ({
    id: q[0],
    category: q[1],
    question: q[2],
    options: q[3],
    answer: q[4],
    hint: q[5],
    explanation: q[6],
  }));
}

function HomeButton({ onClick }) {
  return (
    <button className="home-icon-button" onClick={onClick} title="Back to Home" aria-label="Back to Home">
      <Icon name="home" size={19} />
      <span>Home</span>
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [revealedDigits, setRevealedDigits] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [codeInput, setCodeInput] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState(() => readStorage(STORAGE_KEYS.scores, []));

  const currentQuestion = questions[questionIndex];

  const secretCode = useMemo(
    () => questions.map((q) => q.answer).join(""),
    [questions]
  );

  const totalCorrect = revealedDigits.length;

  useEffect(() => {
    if (page !== "quiz" && page !== "vault") return undefined;

    if (secondsLeft <= 0) {
      finishGame(false, "Time ran out!");
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
    // Timer should restart when the active screen changes or the time changes.
  }, [page, secondsLeft]);

  function startGame(event) {
    event?.preventDefault();

    if (!playerName.trim()) {
      setFeedback("Enter your name to start the challenge.");
      return;
    }

    const roundQuestions = getRoundQuestions(difficulty);
    setQuestions(roundQuestions);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setRevealedDigits([]);
    setShowExplanation(false);
    setShowHint(false);
    setSecondsLeft(60);
    setCodeInput("");
    setAttemptsLeft(3);
    setFeedback("");
    setResult(null);
    setPage("quiz");
  }

  function chooseAnswer(option) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);
    setShowExplanation(true);

    if (option === currentQuestion.answer) {
      setRevealedDigits((digits) => [
        ...digits,
        currentQuestion.answer,
      ]);
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setFeedback("");
      setPage("vault");
    }
  }

  function finishGame(cracked, message = "") {
    setPage("results");

    const basePoints = cracked ? 100 : 0;
    const difficultyMultiplier = { Easy: 1, Medium: 1.5, Hard: 2 }[difficulty];
    const speedBonus = cracked ? Math.max(0, secondsLeft) * 2 : 0;
    const points = Math.round((basePoints + speedBonus) * difficultyMultiplier);

    const entry = {
      id: `${Date.now()}-${Math.random()}`,
      name: playerName.trim() || "Player",
      difficulty,
      cracked,
      points,
      timeTaken: 60 - secondsLeft,
      date: new Date().toISOString(),
    };

    const updated = [...readStorage(STORAGE_KEYS.scores, []), entry]
      .sort((a, b) => b.points - a.points || a.timeTaken - b.timeTaken)
      .slice(0, 50);

    localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(updated));
    setScores(updated);
    setResult({ ...entry, message });
  }

  function submitCode(event) {
    event.preventDefault();

    if (codeInput.length !== 4) {
      setFeedback("Enter all four digits before unlocking.");
      return;
    }

    if (codeInput === secretCode) {
      finishGame(true, "Vault cracked successfully!");
      return;
    }

    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);
    setCodeInput("");

    if (remaining <= 0) {
      finishGame(false, "All three attempts were used.");
    } else {
      setFeedback(`Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} left.`);
    }
  }

  function goHome() {
    setPage("home");
    setFeedback("");
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
  }

  function openLeaderboard() {
    setScores(readStorage(STORAGE_KEYS.scores, []));
    setPage("leaderboard");
  }

  const formattedTime = `00:${String(secondsLeft).padStart(2, "0")}`;

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={goHome} aria-label="CodeVault home">
          <span className="brand-mark"><Icon name="lock" size={22} /></span>
          <span>CODE<span className="brand-accent">VAULT</span></span>
        </button>

        <div className="topbar-right">
          {page !== "home" && <HomeButton onClick={goHome} />}
          <button className="leaderboard-link" onClick={openLeaderboard}>
            <Icon name="trophy" size={17} />
            <span>Leaderboard</span>
          </button>
        </div>
      </header>

      {page === "home" && (
        <section className="home-page page-content">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> SECURITY CHALLENGE // 001</div>
            <h1>CRACK THE CODE.<br /><span>BEAT THE CLOCK.</span></h1>
            <p className="hero-description">
              Four questions. Four digits. One locked vault.
              Think fast, solve the clues, and uncover the secret password before time runs out.
            </p>

            <div className="feature-row">
              <div className="feature-item"><Icon name="clock" /><span>60 seconds</span></div>
              <div className="feature-item"><Icon name="shield" /><span>4 questions</span></div>
              <div className="feature-item"><Icon name="bolt" /><span>3 code attempts</span></div>
            </div>
          </div>

          <form className="setup-card" onSubmit={startGame}>
            <div className="card-topline">
              <span className="mini-label">MISSION SETUP</span>
              <span className="status-pill"><span /> READY</span>
            </div>

            <div className="vault-art">
              <div className="vault-ring"><Icon name="lock" size={42} /></div>
              <div className="vault-code-preview">
                <span>?</span><span>?</span><span>?</span><span>?</span>
              </div>
              <p>4-DIGIT VAULT LOCKED</p>
            </div>

            <label className="field-label" htmlFor="player-name">PLAYER NAME</label>
            <input
              id="player-name"
              className="text-input"
              value={playerName}
              onChange={(event) => {
                setPlayerName(event.target.value);
                setFeedback("");
              }}
              placeholder="Enter your name"
              maxLength={24}
              autoComplete="nickname"
            />

            <div className="field-label difficulty-label">SELECT DIFFICULTY</div>
            <div className="difficulty-options">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  type="button"
                  key={level}
                  className={`difficulty-button ${difficulty === level ? "selected" : ""}`}
                  onClick={() => setDifficulty(level)}
                >
                  <span>{level}</span>
                  <small>{level === "Easy" ? "STARTER" : level === "Medium" ? "SOLVER" : "EXPERT"}</small>
                </button>
              ))}
            </div>

            {feedback && <p className="inline-error">{feedback}</p>}

            <button type="submit" className="primary-button">
              START CRACKING <Icon name="arrow" size={19} />
            </button>
            <p className="card-footnote"><Icon name="shield" size={13} /> Your mission begins when you start.</p>
          </form>

          <div className="home-bottom-note">
            <span>01 / ANALYSE</span><span>02 / DECODE</span><span>03 / UNLOCK</span>
          </div>
        </section>
      )}

      {page === "quiz" && currentQuestion && (
        <section className="game-page page-content">
          <div className="game-header">
            <div>
              <div className="eyebrow">MISSION IN PROGRESS</div>
              <h2>Decode the clues<span>.</span></h2>
              <p>Answer each question correctly to reveal its password digit.</p>
            </div>
            <div className={`timer-box ${secondsLeft <= 15 ? "timer-danger" : ""}`}>
              <Icon name="clock" size={19} />
              <div><small>TIME LEFT</small><strong>{formattedTime}</strong></div>
            </div>
          </div>

          <div className="progress-and-code">
            <div className="progress-block">
              <div className="progress-label"><span>QUESTION {questionIndex + 1} OF 4</span><span>{Math.round(((questionIndex + 1) / 4) * 100)}%</span></div>
              <div className="progress-track"><div style={{ width: `${((questionIndex + 1) / 4) * 100}%` }} /></div>
            </div>
            <div className="mini-code">
              <span className="mini-label">CODE PROGRESS</span>
              <div className="mini-code-digits">
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} className={revealedDigits[index] ? "digit-revealed" : ""}>
                    {revealedDigits[index] ?? "•"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="question-layout">
            <article className="question-card">
              <div className="question-meta">
                <span className="category-tag">{currentQuestion.category}</span>
                <span className="difficulty-tag">{difficulty.toUpperCase()}</span>
              </div>
              <div className="question-number">QUESTION {String(questionIndex + 1).padStart(2, "0")}</div>
              <h3>{currentQuestion.question}</h3>
              <p className="question-instruction">Choose the correct answer to discover the next clue.</p>

              <div className="answer-options">
                {currentQuestion.options.map((option, index) => {
                  let state = "";
                  if (selectedAnswer !== null && option === currentQuestion.answer) state = "option-correct";
                  else if (selectedAnswer === option && option !== currentQuestion.answer) state = "option-wrong";

                  return (
                    <button
                      key={`${currentQuestion.id}-${option}`}
                      className={`answer-option ${state}`}
                      disabled={selectedAnswer !== null}
                      onClick={() => chooseAnswer(option)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                      {state === "option-correct" && <Icon name="check" size={18} />}
                      {state === "option-wrong" && <Icon name="close" size={18} />}
                    </button>
                  );
                })}
              </div>

              {showHint && selectedAnswer === null && (
                <div className="hint-box"><Icon name="bulb" size={17} /><span>{currentQuestion.hint}</span></div>
              )}

              {showExplanation && (
                <div className={`explanation-box ${selectedAnswer === currentQuestion.answer ? "success-explanation" : "wrong-explanation"}`}>
                  <strong>{selectedAnswer === currentQuestion.answer ? `Digit discovered: ${currentQuestion.answer}` : "Not quite — this digit remains hidden."}</strong>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="question-actions">
                <button className="secondary-button" onClick={() => setShowHint(true)} disabled={selectedAnswer !== null || showHint}>
                  <Icon name="bulb" size={17} /> Hint
                </button>
                <button className="primary-button next-button" onClick={nextQuestion} disabled={selectedAnswer === null}>
                  {questionIndex === 3 ? "GO TO VAULT" : "NEXT QUESTION"} <Icon name="arrow" size={18} />
                </button>
              </div>
            </article>

            <aside className="side-panel">
              <div className="side-panel-card">
                <div className="side-icon"><Icon name="lock" size={23} /></div>
                <h4>MISSION OBJECTIVE</h4>
                <p>Solve four questions. Use the correct answers in order to form the four-digit vault code.</p>
                <div className="side-divider" />
                <div className="side-stat"><span>Questions solved</span><strong>{totalCorrect}/4</strong></div>
                <div className="side-stat"><span>Difficulty</span><strong>{difficulty}</strong></div>
                <div className="side-stat"><span>Attempts at vault</span><strong>3</strong></div>
              </div>
              <div className="tip-card"><Icon name="bulb" size={18} /><p><strong>Think smart.</strong><br />Read each question carefully. The correct numerical answers form your code.</p></div>
            </aside>
          </div>
        </section>
      )}

      {page === "vault" && (
        <section className="vault-page page-content">
          <div className="eyebrow"><span className="pulse-dot" /> FINAL SECURITY CHECK</div>
          <h2>THE VAULT IS WAITING<span>.</span></h2>
          <p className="vault-subtitle">Use the four answers in question order to enter the secret code.</p>

          <div className="large-vault">
            <div className="large-vault-ring"><Icon name="lock" size={47} /></div>
            <div className="large-code-display">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="code-slot">
                  <span>{codeInput[index] || "_"}</span>
                  <small>DIGIT {index + 1}</small>
                </div>
              ))}
            </div>
            <span className="vault-lock-label">SECURE ACCESS PANEL</span>
          </div>

          <form className="code-entry-card" onSubmit={submitCode}>
            <label className="field-label" htmlFor="secret-code">ENTER 4-DIGIT PASSWORD</label>
            <input
              id="secret-code"
              className="code-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={codeInput}
              onChange={(event) => {
                setCodeInput(event.target.value.replace(/\D/g, "").slice(0, 4));
                setFeedback("");
              }}
              placeholder="••••"
              autoComplete="off"
              autoFocus
            />
            {feedback && <p className="inline-error">{feedback}</p>}
            <div className="attempt-note">{attemptsLeft} of 3 attempts remaining</div>
            <button type="submit" className="primary-button" disabled={codeInput.length !== 4}>
              <Icon name="lock" size={18} /> UNLOCK VAULT
            </button>
          </form>

          <div className="vault-bottom-stats">
            <span><Icon name="clock" size={16} /> {formattedTime} remaining</span>
            <span><Icon name="shield" size={16} /> {difficulty} challenge</span>
          </div>
        </section>
      )}

      {page === "results" && result && (
        <section className="results-page page-content">
          <div className={`result-emblem ${result.cracked ? "result-success" : "result-failed"}`}>
            <Icon name={result.cracked ? "check" : "close"} size={42} />
          </div>
          <div className="eyebrow">{result.cracked ? "MISSION COMPLETE" : "MISSION ENDED"}</div>
          <h2>{result.cracked ? "VAULT CRACKED!" : "VAULT REMAINS LOCKED."}</h2>
          <p className="result-subtitle">{result.message || (result.cracked ? "Excellent work, agent." : "Time to sharpen your code-breaking skills.")}</p>

          <div className="result-score-card">
            <span className="mini-label">TOTAL POINTS</span>
            <div className="big-score">{result.points}<span>PTS</span></div>
            <div className="result-stats">
              <div><small>DIFFICULTY</small><strong>{result.difficulty}</strong></div>
              <div><small>TIME USED</small><strong>{result.timeTaken}s</strong></div>
              <div><small>VAULT STATUS</small><strong className={result.cracked ? "text-success" : "text-danger"}>{result.cracked ? "CRACKED" : "LOCKED"}</strong></div>
            </div>
            <div className="result-code-row">
              <span>SECRET CODE</span>
              <strong>{secretCode || "••••"}</strong>
            </div>
          </div>

          <div className="result-actions">
            <button className="primary-button" onClick={startGame}>PLAY AGAIN <Icon name="arrow" size={18} /></button>
            <button className="secondary-button" onClick={openLeaderboard}><Icon name="trophy" size={17} /> VIEW LEADERBOARD</button>
            <button className="home-text-button" onClick={goHome}><Icon name="home" size={17} /> BACK TO HOME</button>
          </div>
        </section>
      )}

      {page === "leaderboard" && (
        <section className="leaderboard-page page-content">
          <div className="leaderboard-heading">
            <div>
              <div className="eyebrow">TOP CODE BREAKERS</div>
              <h2>LEADERBOARD<span>.</span></h2>
              <p>Every second counts. Every successful crack earns points.</p>
            </div>
            <div className="leaderboard-trophy"><Icon name="trophy" size={31} /></div>
          </div>

          {scores.length === 0 ? (
            <div className="empty-leaderboard">
              <div className="empty-icon"><Icon name="trophy" size={35} /></div>
              <h3>No scores yet</h3>
              <p>Be the first to crack the vault and claim the top spot.</p>
              <button className="primary-button" onClick={goHome}>START A CHALLENGE <Icon name="arrow" size={18} /></button>
            </div>
          ) : (
            <div className="leaderboard-table-wrap">
              <table className="leaderboard-table">
                <thead><tr><th>RANK</th><th>PLAYER</th><th>LEVEL</th><th>STATUS</th><th>TIME</th><th>POINTS</th></tr></thead>
                <tbody>
                  {scores.map((entry, index) => (
                    <tr key={entry.id} className={index < 3 ? "top-rank-row" : ""}>
                      <td><span className={`rank-number rank-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span></td>
                      <td className="player-cell">{entry.name}</td>
                      <td><span className={`level-pill level-${entry.difficulty.toLowerCase()}`}>{entry.difficulty}</span></td>
                      <td><span className={entry.cracked ? "status-cracked" : "status-locked"}>{entry.cracked ? "CRACKED" : "LOCKED"}</span></td>
                      <td>{entry.timeTaken}s</td>
                      <td className="points-cell">{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="leaderboard-footer">
            <p>Scores are saved in this browser.</p>
            <button className="primary-button" onClick={goHome}>BACK TO GAME <Icon name="arrow" size={18} /></button>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <span>CODEVAULT <span className="footer-divider">/</span> THINK. DECODE. UNLOCK.</span>
        <span>SECURE CHALLENGE SYSTEM <span className="footer-status">● ONLINE</span></span>
      </footer>
    </main>
  );
}