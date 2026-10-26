import { useCallback, useEffect, useState } from "react";
import "./App.css";

const GAME_TIME = 60;
const TOTAL_QUESTIONS = 4;
const EXTRA_TIME = 10;
const EXTRA_TIME_PENALTY = 100;
const LEADERBOARD_KEY = "codevault_leaderboard_v2";

const QUESTIONS = [
  // MATHEMATICS
  {
    category: "MATHEMATICS",
    question: "A number doubled and increased by 3 equals 11. What is the number?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    digit: "4",
    hint: "Subtract 3 from 11, then divide by 2.",
    explanation: "2x + 3 = 11, so x = 4.",
  },
  {
    category: "MATHEMATICS",
    question: "What is the remainder when 29 is divided by 6?",
    options: ["3", "4", "5", "2"],
    answer: "5",
    digit: "5",
    hint: "The closest multiple of 6 below 29 is 24.",
    explanation: "29 = 6 × 4 + 5. The remainder is 5.",
  },
  {
    category: "MATHEMATICS",
    question: "Complete the sequence: 2, 6, 12, 20, 30, __",
    options: ["36", "40", "42", "44"],
    answer: "42",
    digit: "2",
    hint: "The differences are 4, 6, 8 and 10.",
    explanation: "The next difference is 12, so 30 + 12 = 42.",
  },
  {
    category: "MATHEMATICS",
    question: "What is 15% of 40?",
    options: ["4", "5", "6", "8"],
    answer: "6",
    digit: "6",
    hint: "Find 10% and 5%, then add them.",
    explanation: "10% of 40 is 4 and 5% is 2. The answer is 6.",
  },
  {
    category: "MATHEMATICS",
    question: "If 3x = 21, what is x?",
    options: ["6", "7", "8", "9"],
    answer: "7",
    digit: "7",
    hint: "Divide both sides by 3.",
    explanation: "x = 21 ÷ 3 = 7.",
  },

  // PROGRAMMING
  {
    category: "PROGRAMMING",
    question: 'In C, which statement correctly prints "Hello"?',
    options: [
      'print("Hello");',
      'printf("Hello");',
      'echo("Hello");',
      'display("Hello");',
    ],
    answer: 'printf("Hello");',
    digit: "2",
    hint: "Think of the standard output function used in C.",
    explanation: 'printf("Hello"); displays the text Hello.',
  },
  {
    category: "PROGRAMMING",
    question: 'What is the output? int x = 5; printf("%d", x++);',
    options: ["4", "5", "6", "Error"],
    answer: "5",
    digit: "2",
    hint: "Post-increment uses the current value before increasing it.",
    explanation: "The original value, 5, is printed before x increments.",
  },
  {
    category: "PROGRAMMING",
    question: "Which operator checks equality in C?",
    options: ["=", "==", "!=", ">="],
    answer: "==",
    digit: "2",
    hint: "One equals sign assigns a value. Which operator compares?",
    explanation: "The == operator compares two values for equality.",
  },
  {
    category: "PROGRAMMING",
    question: "What does print(7 % 3) output in Python?",
    options: ["0", "1", "2", "3"],
    answer: "1",
    digit: "2",
    hint: "The % operator returns the remainder.",
    explanation: "7 divided by 3 leaves a remainder of 1.",
  },
  {
    category: "PROGRAMMING",
    question: "Which data type commonly stores a whole number in C?",
    options: ["int", "float", "char", "void"],
    answer: "int",
    digit: "1",
    hint: "It is short for integer.",
    explanation: "The int data type is commonly used for whole numbers.",
  },
  {
    category: "PROGRAMMING",
    question: "How many times does this loop run? for (int i=0; i<4; i++)",
    options: ["3 times", "4 times", "5 times", "Infinite times"],
    answer: "4 times",
    digit: "2",
    hint: "The values of i are 0, 1, 2 and 3.",
    explanation: "The loop executes four times before i reaches 4.",
  },

  // LOGICAL REASONING
  {
    category: "LOGICAL REASONING",
    question: "Three switches are OFF. You turn two ON. How many remain OFF?",
    options: ["0", "1", "2", "3"],
    answer: "1",
    digit: "1",
    hint: "Only two of the three switches have changed state.",
    explanation: "Two are ON, so one switch remains OFF.",
  },
  {
    category: "LOGICAL REASONING",
    question: "A clock shows 3:00. What is the smaller angle between its hands?",
    options: ["45°", "60°", "90°", "180°"],
    answer: "90°",
    digit: "3",
    hint: "Each hour mark represents 30 degrees.",
    explanation: "Three hour marks apart means 3 × 30° = 90°.",
  },
  {
    category: "LOGICAL REASONING",
    question: "All roses are flowers. Some flowers fade quickly. Must all roses fade quickly?",
    options: ["Yes", "No", "Only at night", "Cannot be flowers"],
    answer: "No",
    digit: "2",
    hint: "Does the statement say every flower fades quickly?",
    explanation: "Some flowers fading quickly does not mean all roses do.",
  },
  {
    category: "LOGICAL REASONING",
    question: "Find the missing number: 1, 1, 2, 3, 5, 8, __",
    options: ["11", "12", "13", "15"],
    answer: "13",
    digit: "3",
    hint: "Each number is the sum of the previous two.",
    explanation: "5 + 8 = 13.",
  },
  {
    category: "LOGICAL REASONING",
    question: "You overtake the person in second place in a race. What place are you in?",
    options: ["First", "Second", "Third", "Last"],
    answer: "Second",
    digit: "2",
    hint: "You take the position of the person you overtake.",
    explanation: "You take second place, not first.",
  },

  // COMPUTER FUNDAMENTALS
  {
    category: "COMPUTER FUNDAMENTALS",
    question: "How many bits are there in one byte?",
    options: ["4", "8", "16", "32"],
    answer: "8",
    digit: "8",
    hint: "A byte is made up of eight binary digits.",
    explanation: "One byte contains 8 bits.",
  },
  {
    category: "COMPUTER FUNDAMENTALS",
    question: "What decimal number is represented by binary 101?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    digit: "5",
    hint: "Calculate 1×4 + 0×2 + 1×1.",
    explanation: "Binary 101 equals decimal 5.",
  },
  {
    category: "COMPUTER FUNDAMENTALS",
    question: "Which component executes program instructions?",
    options: ["CPU", "Keyboard", "Monitor", "Mouse"],
    answer: "CPU",
    digit: "1",
    hint: "It is often called the brain of a computer.",
    explanation: "The CPU executes program instructions.",
  },
  {
    category: "COMPUTER FUNDAMENTALS",
    question: "Which memory normally loses its contents when power is removed?",
    options: ["ROM", "RAM", "SSD", "Flash memory"],
    answer: "RAM",
    digit: "2",
    hint: "It is volatile memory used while programs are running.",
    explanation: "RAM normally loses its contents without power.",
  },
  {
    category: "COMPUTER FUNDAMENTALS",
    question: "What does a URL identify?",
    options: [
      "A web resource address",
      "A processor",
      "A programming loop",
      "A memory chip",
    ],
    answer: "A web resource address",
    digit: "1",
    hint: "You type one into a browser's address bar.",
    explanation: "A URL identifies the address of a web resource.",
  },

  // DIGITAL ELECTRONICS
  {
    category: "DIGITAL ELECTRONICS",
    question: "How many possible states does one binary bit have?",
    options: ["1", "2", "4", "8"],
    answer: "2",
    digit: "2",
    hint: "Think of the two binary values.",
    explanation: "A bit can be 0 or 1.",
  },
  {
    category: "DIGITAL ELECTRONICS",
    question: "What is the output of an AND gate with inputs 1 and 0?",
    options: ["0", "1", "2", "Undefined"],
    answer: "0",
    digit: "1",
    hint: "An AND gate outputs 1 only when both inputs are 1.",
    explanation: "One input is 0, so the AND output is 0.",
  },
  {
    category: "DIGITAL ELECTRONICS",
    question: "How many inputs does a basic NOT gate have?",
    options: ["1", "2", "3", "4"],
    answer: "1",
    digit: "1",
    hint: "It inverts a single input.",
    explanation: "A basic NOT gate has one input.",
  },
  {
    category: "DIGITAL ELECTRONICS",
    question: "What is 1 XOR 1?",
    options: ["0", "1", "2", "Undefined"],
    answer: "0",
    digit: "1",
    hint: "XOR outputs 1 when its inputs are different.",
    explanation: "The inputs are equal, so the XOR output is 0.",
  },
  {
    category: "DIGITAL ELECTRONICS",
    question: "How many outputs does a basic half-adder have?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    digit: "2",
    hint: "It produces a sum and a carry.",
    explanation: "A half-adder has Sum and Carry outputs.",
  },
];

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function makeQuestions() {
  const categories = shuffle([
    "MATHEMATICS",
    "PROGRAMMING",
    "LOGICAL REASONING",
    "COMPUTER FUNDAMENTALS",
    "DIGITAL ELECTRONICS",
  ]).slice(0, TOTAL_QUESTIONS);

  return categories.map((category) => {
    const available = QUESTIONS.filter((q) => q.category === category);
    const selected = available[Math.floor(Math.random() * available.length)];

    return {
      ...selected,
      options: shuffle(selected.options),
    };
  });
}

function readLeaderboard() {
  try {
    const data = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M12 14v3" />
      </>
    ),
    arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
    back: <path d="m15 18-6-6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6m-5 4h4" />
        <path d="M8 14a6 6 0 1 1 8 0c-.8.7-1 1.3-1 2H9c0-.7-.2-1.3-1-2Z" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 21h8m-4-4v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M7 6H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4" />
      </>
    ),
    zap: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M5.5 9a7 7 0 0 1 11.6-2L20 12M4 12l2.9 5a7 7 0 0 0 11.6-2" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
      </>
    ),
    code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-2 16" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return <svg {...common}>{paths[name] || paths.code}</svg>;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [score, setScore] = useState(0);
  const [revealedDigits, setRevealedDigits] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [vaultInput, setVaultInput] = useState("");
  const [vaultFeedback, setVaultFeedback] = useState("");
  const [vaultHintVisible, setVaultHintVisible] = useState(false);
  const [vaultOpened, setVaultOpened] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);
  const [finishReason, setFinishReason] = useState("");
  const [leaderboard, setLeaderboard] = useState(readLeaderboard);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [savedResult, setSavedResult] = useState(false);

  // New timer-expiry states
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [extraTimeUsed, setExtraTimeUsed] = useState(false);

  const question = questions[currentQuestion];
  const secretCode = revealedDigits.join("");

  const isPlaying =
    (page === "game" || page === "vault") &&
    !roundFinished &&
    !vaultOpened &&
    !showTimeUp &&
    timeLeft > 0;

  function startInstructions() {
    const cleanName = playerName.trim();

    if (!cleanName) {
      document.getElementById("player-name")?.focus();
      return;
    }

    setPlayerName(cleanName.slice(0, 24));
    setPage("instructions");
  }

  function startGame() {
    setQuestions(makeQuestions());
    setCurrentQuestion(0);
    setTimeLeft(GAME_TIME);
    setScore(0);
    setRevealedDigits([]);
    setFeedback(null);
    setHintVisible(false);
    setVaultInput("");
    setVaultFeedback("");
    setVaultHintVisible(false);
    setVaultOpened(false);
    setRoundFinished(false);
    setFinishReason("");
    setSavedResult(false);

    // Reset timer-expiry options for every new attempt
    setShowTimeUp(false);
    setExtraTimeUsed(false);
    setShowExitConfirm(false);

    setPage("game");
  }

  const finishGame = useCallback((reason) => {
    setRoundFinished(true);
    setFinishReason(reason);
    setFeedback(null);
  }, []);

  // Timer runs during questions and vault entry.
  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  // Display the TIME'S UP popup rather than ending immediately.
  useEffect(() => {
    if (
      timeLeft === 0 &&
      !roundFinished &&
      !vaultOpened &&
      !showTimeUp
    ) {
      setShowTimeUp(true);
    }
  }, [timeLeft, roundFinished, vaultOpened, showTimeUp]);

  // Save each finished attempt only once.
  useEffect(() => {
    if (!roundFinished || savedResult) return;

    const result = {
      name: playerName.trim() || "Anonymous Agent",
      score,
      time: GAME_TIME - timeLeft,
      date: new Date().toISOString(),
      completed: vaultOpened,
    };

    const updated = [...readLeaderboard(), result]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
      })
      .slice(0, 10);

    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    } catch {
      // Game still works if browser storage is unavailable.
    }

    setLeaderboard(updated);
    setSavedResult(true);
  }, [
    roundFinished,
    savedResult,
    playerName,
    score,
    timeLeft,
    vaultOpened,
  ]);

  function submitAnswer(option) {
    if (!question || !isPlaying || feedback?.type === "success") return;

    if (option !== question.answer) {
      setFeedback({
        type: "error",
        text: "Incorrect answer. Choose another option!",
      });
      return;
    }

    const digit = question.digit;

    setRevealedDigits((previous) => {
      const updated = [...previous];
      updated[currentQuestion] = digit;
      return updated;
    });

    setScore((previous) => previous + 100);

    setFeedback({
      type: "success",
      text: `Correct! Vault digit ${currentQuestion + 1} unlocked.`,
    });
  }

  function goToNextQuestion() {
    if (feedback?.type !== "success") return;

    if (currentQuestion + 1 < TOTAL_QUESTIONS) {
      setCurrentQuestion((previous) => previous + 1);
      setFeedback(null);
      setHintVisible(false);
      return;
    }

    setPage("vault");
    setVaultInput("");
    setVaultFeedback("");
    setVaultHintVisible(false);
  }

  function submitVaultCode(event) {
    event.preventDefault();

    if (!isPlaying || secretCode.length !== TOTAL_QUESTIONS) return;

    if (vaultInput === secretCode) {
      setVaultOpened(true);
      setScore((previous) => previous + 200);
      setVaultFeedback("ACCESS GRANTED");
      setRoundFinished(true);
      setFinishReason("success");
      setShowTimeUp(false);
      setPage("results");
    } else {
      setVaultFeedback("ACCESS DENIED — CHECK THE CODE AND TRY AGAIN.");
      setVaultInput("");
    }
  }

  // Take the 10-second extension, deduct points, and resume the same screen.
  function takeExtraTime() {
    if (extraTimeUsed || !showTimeUp) return;

    setScore((previous) =>
      Math.max(0, previous - EXTRA_TIME_PENALTY)
    );

    setExtraTimeUsed(true);
    setShowTimeUp(false);
    setTimeLeft(EXTRA_TIME);
  }

  // End this attempt and show its results.
  function retryAfterTimeout() {
    setShowTimeUp(false);
    finishGame("timeout");
    setPage("results");
  }

  function goBack() {
    if (page === "instructions") {
      setPage("home");
    } else if (page === "game" || page === "vault") {
      setShowExitConfirm(true);
    } else {
      setPage("home");
    }
  }

  function resetToHome() {
    setShowTimeUp(false);
    setShowExitConfirm(false);
    setPage("home");
  }

  function clearLeaderboard() {
    try {
      localStorage.removeItem(LEADERBOARD_KEY);
    } catch {
      // Ignore unavailable storage.
    }

    setLeaderboard([]);
  }

  const pageHasBackButton = page !== "home";

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button
          className="brand"
          onClick={resetToHome}
          aria-label="CodeVault home"
        >
          <span className="brand-mark">
            <Icon name="shield" size={25} />
          </span>

          <span className="brand-copy">
            <strong>
              CODE<span>VAULT</span>
            </strong>
            <small>THINK. DECODE. UNLOCK.</small>
          </span>
        </button>

        <div className="topbar-right">
          {pageHasBackButton && (
            <button className="back-button" onClick={goBack}>
              <Icon name="back" size={17} />
              Back
            </button>
          )}

          <div className="event-tag">
            <span className="live-dot" />
            AWS COMMUNITY DAY
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* HOME */}
        {page === "home" && (
          <div className="hero-layout">
            <section className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" />
                CYBER CHALLENGE / 001
              </div>

              <h1>
                THINK FAST.
                <br />
                CRACK THE
                <br />
                <span>CODE.</span>
              </h1>

              <p className="hero-description">
                Four questions. Four secret digits. Sixty seconds.
                Can you beat the clock and unlock the vault?
              </p>

              <div className="hero-stats">
                <div>
                  <span className="stat-icon">
                    <Icon name="clock" size={19} />
                  </span>
                  <strong>60 SEC</strong>
                  <small>TIME LIMIT</small>
                </div>

                <div>
                  <span className="stat-icon">
                    <Icon name="code" size={19} />
                  </span>
                  <strong>04 DIGITS</strong>
                  <small>SECRET CODE</small>
                </div>

                <div>
                  <span className="stat-icon">
                    <Icon name="trophy" size={19} />
                  </span>
                  <strong>100 PTS</strong>
                  <small>PER ANSWER</small>
                </div>
              </div>

              <div className="hero-note">
                <Icon name="info" size={15} />
                NO PRIOR AWS KNOWLEDGE REQUIRED. JUST THINK CLEARLY.
              </div>
            </section>

            <section className="launch-card">
              <div className="card-topline">
                <span>SECURE ACCESS TERMINAL</span>
                <span className="terminal-status">● SYSTEM ONLINE</span>
              </div>

              <div className="vault-illustration">
                <div className="vault-ring ring-outer" />
                <div className="vault-ring ring-inner" />
                <div className="vault-core">
                  <Icon name="lock" size={48} />
                </div>
                <span className="orbit orbit-a" />
                <span className="orbit orbit-b" />
                <span className="orbit orbit-c" />
              </div>

              <div className="launch-title">READY, AGENT?</div>
              <p className="launch-subtitle">Your mission starts here.</p>

              <label className="field-label" htmlFor="player-name">
                AGENT NAME
              </label>

              <input
                id="player-name"
                className="name-input"
                type="text"
                placeholder="Enter your name..."
                maxLength={24}
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") startInstructions();
                }}
              />

              <button className="primary-button" onClick={startInstructions}>
                INITIALIZE MISSION
                <Icon name="arrow" size={18} />
              </button>

              <button
                className="secondary-button"
                onClick={() => setPage("leaderboard")}
              >
                <Icon name="trophy" size={17} />
                VIEW LEADERBOARD
              </button>

              <div className="card-bottomline">
                <span>● SYSTEM READY</span>
                <span>CV-SEC / 2026</span>
              </div>
            </section>

            <div className="hero-bottom">
              <span>LOGIC</span><i />
              <span>PROGRAMMING</span><i />
              <span>MATHEMATICS</span><i />
              <span>COMPUTER SCIENCE</span><i />
              <span>DIGITAL LOGIC</span>
            </div>
          </div>
        )}

        {/* INSTRUCTIONS */}
        {page === "instructions" && (
          <section className="subpage">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              MISSION BRIEFING
            </div>

            <h1 className="page-title">
              WELCOME, <span>{playerName.toUpperCase()}</span>
            </h1>

            <p className="page-lead">
              Solve four questions, collect four digits, and enter the
              correct code before the countdown ends.
            </p>

            <div className="instruction-grid">
              {[
                ["01 / SOLVE", "FOUR QUESTIONS", "Answer questions from programming, mathematics, logic, computer fundamentals and digital electronics."],
                ["02 / COLLECT", "UNLOCK THE DIGITS", "Every correct answer reveals one digit for your vault code."],
                ["03 / CORRECT", "CHOOSE CAREFULLY", "Wrong answers do not lock you out. Select another option while time remains."],
                ["04 / ESCAPE", "OPEN THE VAULT", "Enter the four collected digits in the correct order."],
              ].map(([number, title, description]) => (
                <article className="instruction-card" key={number}>
                  <span className="instruction-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <div className="rule-callout">
              <Icon name="clock" size={20} />
              <span>
                <strong>60 seconds total.</strong> If time runs out, you can
                lose 100 points for an additional 10 seconds, once per game,
                or end your attempt.
              </span>
            </div>

            <button className="primary-button compact-button" onClick={startGame}>
              START THE CHALLENGE
              <Icon name="arrow" size={18} />
            </button>
          </section>
        )}

        {/* QUESTION GAME */}
        {page === "game" && question && (
          <section className="game-layout">
            <div className="game-heading">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-line" />
                  LIVE MISSION
                </div>
                <h1 className="page-title">
                  CRACK THE <span>CODE</span>
                </h1>
                <p className="page-lead">
                  Solve the question to reveal your next digit.
                </p>
              </div>

              <div className={`timer ${timeLeft <= 10 ? "danger" : ""}`}>
                <Icon name="clock" size={22} />
                <div>
                  <small>TIME LEFT</small>
                  <strong>00:{String(timeLeft).padStart(2, "0")}</strong>
                </div>
              </div>
            </div>

            <div className="progress-row">
              <span>MISSION PROGRESS</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(revealedDigits.length / TOTAL_QUESTIONS) * 100}%`,
                  }}
                />
              </div>
              <strong>{revealedDigits.length}/{TOTAL_QUESTIONS}</strong>
            </div>

            <div className="game-columns">
              <section className="question-card">
                <div className="question-card-top">
                  <span className="category-pill">{question.category}</span>
                  <span className="question-number">
                    QUESTION <strong>{currentQuestion + 1}</strong>
                    <span> / {TOTAL_QUESTIONS}</span>
                  </span>
                </div>

                <h2 className="question-text">{question.question}</h2>

                <div className="options-grid">
                  {question.options.map((option, index) => (
                    <button
                      key={`${option}-${index}`}
                      className={`option-button ${
                        feedback?.type === "success" &&
                        option === question.answer
                          ? "correct-option"
                          : ""
                      }`}
                      onClick={() => submitAnswer(option)}
                      disabled={!isPlaying || feedback?.type === "success"}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {feedback?.type === "success" &&
                        option === question.answer && (
                          <Icon name="check" size={16} />
                        )}
                    </button>
                  ))}
                </div>

                <button
                  className="hint-toggle"
                  onClick={() => setHintVisible((previous) => !previous)}
                >
                  <Icon name="bulb" size={16} />
                  {hintVisible ? "HIDE HINT" : "NEED A HINT?"}
                  <span>{hintVisible ? "−" : "+"}</span>
                </button>

                {hintVisible && (
                  <div className="hint-box">
                    <strong>HINT:</strong> {question.hint}
                  </div>
                )}

                {feedback && (
                  <div className={`feedback-box ${feedback.type}`}>
                    <strong>
                      {feedback.type === "success"
                        ? "✓ ACCESS DIGIT UNLOCKED"
                        : "✕ INCORRECT"}
                    </strong>
                    <p>{feedback.text}</p>

                    {feedback.type === "success" && (
                      <>
                        <p>{question.explanation}</p>
                        <button
                          className="continue-button"
                          onClick={goToNextQuestion}
                        >
                          {currentQuestion + 1 === TOTAL_QUESTIONS
                            ? "PROCEED TO THE VAULT"
                            : "NEXT QUESTION"}
                          <Icon name="arrow" size={16} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </section>

              <aside className="side-panel">
                <div className="side-panel-title">
                  <Icon name="lock" size={19} />
                  VAULT CODE
                </div>
                <p className="side-panel-subtitle">
                  Correct answers reveal digits in sequence.
                </p>

                <div className="digit-slots">
                  {Array.from({ length: TOTAL_QUESTIONS }, (_, index) => (
                    <div
                      key={index}
                      className={`digit-slot ${
                        revealedDigits[index] !== undefined
                          ? "digit-revealed"
                          : ""
                      }`}
                    >
                      <span>
                        {revealedDigits[index] !== undefined
                          ? revealedDigits[index]
                          : "•"}
                      </span>
                      <small>DIGIT {index + 1}</small>
                    </div>
                  ))}
                </div>

                <div className="side-divider" />

                <div className="mini-stat">
                  <span>AGENT</span>
                  <strong>{playerName}</strong>
                </div>
                <div className="mini-stat">
                  <span>YOUR SCORE</span>
                  <strong>{score} PTS</strong>
                </div>
                <div className="mini-stat">
                  <span>EXTRA TIME</span>
                  <strong className={extraTimeUsed ? "" : "status-green"}>
                    {extraTimeUsed ? "USED" : "AVAILABLE"}
                  </strong>
                </div>

                <div className="side-tip">
                  <Icon name="info" size={16} />
                  <span>
                    Wrong options remain available. Think carefully, but
                    keep an eye on the clock.
                  </span>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* VAULT */}
        {page === "vault" && !roundFinished && (
          <section className="vault-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              FINAL SECURITY CHECK
            </div>

            <div className="vault-large-icon">
              <Icon name="lock" size={50} />
            </div>

            <h1 className="page-title">
              UNLOCK THE <span>VAULT</span>
            </h1>

            <p className="page-lead">
              Enter the four digits in the order you discovered them.
            </p>

            <div className="vault-digits-preview">
              {revealedDigits.map((digit, index) => (
                <div key={index} className="vault-preview-digit">
                  {digit}
                </div>
              ))}
            </div>

            <form className="vault-form" onSubmit={submitVaultCode}>
              <label className="field-label" htmlFor="vault-code">
                ENTER FOUR-DIGIT ACCESS CODE
              </label>

              <input
                id="vault-code"
                className="name-input vault-code-input"
                type="password"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                autoComplete="off"
                placeholder="••••"
                value={vaultInput}
                onChange={(event) => {
                  setVaultInput(
                    event.target.value.replace(/\D/g, "").slice(0, 4)
                  );
                  setVaultFeedback("");
                }}
                disabled={!isPlaying}
              />

              <button
                className="primary-button"
                type="submit"
                disabled={!isPlaying || vaultInput.length !== 4}
              >
                VERIFY ACCESS
                <Icon name="shield" size={18} />
              </button>

              {vaultFeedback && (
                <div
                  className={`inline-feedback ${
                    vaultOpened ? "success-text" : "error-text"
                  }`}
                >
                  {vaultFeedback}
                </div>
              )}
            </form>

            <button
              className="hint-toggle vault-hint-toggle"
              onClick={() => setVaultHintVisible((previous) => !previous)}
            >
              <Icon name="bulb" size={16} />
              {vaultHintVisible ? "HIDE CODE HINT" : "SHOW CODE HINT"}
            </button>

            {vaultHintVisible && (
              <div className="hint-box vault-hint">
                {revealedDigits.join(" · ")}
              </div>
            )}
          </section>
        )}

        {/* RESULTS */}
        {page === "results" && (
          <section className="results-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              MISSION REPORT
            </div>

            <div className="result-icon">
              <Icon name={vaultOpened ? "trophy" : "shield"} size={43} />
            </div>

            <h1 className="page-title">
              {vaultOpened ? (
                <>VAULT <span>UNLOCKED</span></>
              ) : (
                <>MISSION <span>ENDED</span></>
              )}
            </h1>

            <p className="page-lead">
              {vaultOpened
                ? `Outstanding work, ${playerName}! You cracked the code.`
                : finishReason === "timeout"
                  ? "Time ran out. You can try again and improve your score."
                  : "Your attempt has ended. Start a fresh mission whenever you're ready."}
            </p>

            <div className="results-summary">
              <div>
                <small>FINAL SCORE</small>
                <strong>{score}</strong>
              </div>
              <div>
                <small>DIGITS FOUND</small>
                <strong>{revealedDigits.filter((d) => d !== undefined).length}/4</strong>
              </div>
              <div>
                <small>TIME USED</small>
                <strong>{GAME_TIME + (extraTimeUsed ? EXTRA_TIME : 0) - timeLeft}s</strong>
              </div>
            </div>

            <div className="results-actions">
              <button className="primary-button" onClick={startGame}>
                <Icon name="refresh" size={17} />
                PLAY AGAIN
              </button>
              <button
                className="secondary-button"
                onClick={() => setPage("leaderboard")}
              >
                <Icon name="trophy" size={17} />
                VIEW LEADERBOARD
              </button>
              <button className="text-button" onClick={resetToHome}>
                <Icon name="home" size={16} />
                BACK TO HOME
              </button>
            </div>
          </section>
        )}

        {/* LEADERBOARD */}
        {page === "leaderboard" && (
          <section className="subpage">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              AGENT RANKINGS
            </div>

            <h1 className="page-title">
              THE <span>LEADERBOARD</span>
            </h1>

            <p className="page-lead">
              The highest-scoring agents appear here.
            </p>

            <div className="leaderboard-card">
              <div className="leaderboard-header">
                <span>AGENT</span>
                <span>SCORE</span>
                <span>STATUS</span>
              </div>

              {leaderboard.length === 0 ? (
                <div className="empty-leaderboard">
                  <Icon name="trophy" size={38} />
                  <h3>NO AGENTS RANKED YET</h3>
                  <p>Be the first to crack the vault.</p>
                </div>
              ) : (
                leaderboard.map((entry, index) => (
                  <div
                    className="leaderboard-row"
                    key={`${entry.name}-${entry.date}-${index}`}
                  >
                    <div className="leaderboard-agent">
                      <span className={`rank-badge rank-${index + 1}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{entry.name}</span>
                    </div>
                    <strong>{entry.score}</strong>
                    <span
                      className={`rank-status ${
                        entry.completed ? "complete" : ""
                      }`}
                    >
                      {entry.completed ? "UNLOCKED" : "INCOMPLETE"}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="leaderboard-note">
              <Icon name="info" size={16} />
              <span>
                This version stores scores in this browser only. A shared
                leaderboard requires a backend or database.
              </span>
            </div>

            <button
              className="primary-button compact-button"
              onClick={resetToHome}
            >
              BACK TO HOME
              <Icon name="arrow" size={17} />
            </button>

            {leaderboard.length > 0 && (
              <button className="text-button" onClick={clearLeaderboard}>
                CLEAR LOCAL LEADERBOARD
              </button>
            )}
          </section>
        )}
      </main>

      <footer className="site-footer">
        <span><b>CODEVAULT</b> // THINK. DECODE. UNLOCK.</span>
        <span>BUILT FOR AWS COMMUNITY DAY</span>
        <span>STAY CURIOUS. STAY SECURE.</span>
      </footer>

      {/* TIME'S UP POPUP */}
      {showTimeUp && (
        <div className="modal-backdrop">
          <section
            className="confirm-modal time-up-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="time-up-title"
          >
            <div className="modal-icon time-up-icon">
              <Icon name="clock" size={30} />
            </div>

            <div className="eyebrow">
              <span className="eyebrow-line" />
              MISSION INTERRUPTED
            </div>

            <h3 id="time-up-title">TIME'S UP!</h3>

            <p>
              The countdown has ended, Agent. Choose whether to continue
              your current mission or finish this attempt.
            </p>

            {!extraTimeUsed ? (
              <button className="primary-button" onClick={takeExtraTime}>
                <Icon name="zap" size={18} />
                EXTRA 10 SECONDS
                <span className="penalty-label">−100 PTS</span>
              </button>
            ) : (
              <div className="extra-time-used">
                EXTRA TIME ALREADY USED
              </div>
            )}

            <button
              className="secondary-button"
              onClick={retryAfterTimeout}
            >
              <Icon name="refresh" size={18} />
              TRY AGAIN
            </button>

            <small className="time-up-note">
              {extraTimeUsed
                ? "Your extra-time opportunity has been used. Start a new attempt to reset it."
                : "Extra time can be used once per attempt. Your collected digits will be preserved."}
            </small>
          </section>
        </div>
      )}

      {/* BACK / EXIT CONFIRMATION */}
      {showExitConfirm && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowExitConfirm(false);
            }
          }}
        >
          <section
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
          >
            <button
              className="modal-close"
              onClick={() => setShowExitConfirm(false)}
              aria-label="Close dialog"
            >
              <Icon name="close" size={19} />
            </button>

            <div className="modal-icon">
              <Icon name="info" size={27} />
            </div>

            <h3 id="exit-title">ABANDON MISSION?</h3>

            <p>
              Leaving now will end your current attempt. Are you sure
              you want to return to the home screen?
            </p>

            <button
              className="primary-button"
              onClick={() => {
                setShowExitConfirm(false);
                finishGame("abandoned");
                setPage("results");
              }}
            >
              YES, EXIT MISSION
            </button>

            <button
              className="secondary-button"
              onClick={() => setShowExitConfirm(false)}
            >
              CONTINUE PLAYING
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
