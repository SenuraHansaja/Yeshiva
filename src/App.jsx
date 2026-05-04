import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Icon({ name, size = 24, strokeWidth = 2.5, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    gripVertical: (
      <>
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="19" r="1" />
      </>
    ),
    mic: (
      <>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v3" />
        <path d="M8 22h8" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    rotateCcw: (
      <>
        <path d="M3 2v6h6" />
        <path d="M3 13a9 9 0 1 0 3-6.7L3 8" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9L12 3Z" />
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
      </>
    ),
    x: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

const scenarios = [
  {
    id: "goalkeeper-captain",
    title: "Goalkeeper for Captain",
    type: "Advocacy",
    difficulty: 1,
    estimated_minutes: 10,
    shortLabel: "Scenario 1",
    scenario_text:
      "You are the goalkeeper for your football team. You are technically excellent — fast reflexes, good positioning, the team trusts you in big moments. The coach has decided to appoint a new captain and is choosing between two players: you, and the team's star striker. The striker scores most of the goals, gets quoted in the local paper, and has the kind of charisma that draws teammates into his orbit. You are quieter, less visible, and play the position furthest from the action. The coach has asked each of you to make your case. Make yours.",
    framing_note:
      "The point is not to win the captaincy. It is to construct the strongest possible argument, anticipate the striker's case, and refine your reasoning under challenge.",
    user_options: [
      { label: "Argue why I should be captain", position: "I should be the team captain instead of the striker" },
      { label: "Argue why the striker should be captain", position: "The striker should be the team captain instead of me" },
    ],
    coaching: ["Define what captaincy actually requires", "Anticipate the striker's strongest case", "Qualify instead of overclaiming"],
  },
  {
    id: "lunch-money-standoff",
    title: "The Lunch Money Standoff",
    type: "Negotiation",
    difficulty: 2,
    estimated_minutes: 10,
    shortLabel: "Scenario 2",
    scenario_text:
      "You are seven years old. It is lunch break at school. Three older boys — eleven or twelve, bigger than you, alone with you behind the building — have stopped you and want your lunch money. There is no teacher in sight. Running won't work; they're faster. Fighting won't work; they're stronger. You have only what you can say. What do you do?",
    framing_note:
      "This is about thinking clearly under pressure when force is not available. First ask: what do they actually want? Money is what they said. But is that really it?",
    user_options: [
      { label: "I'll work out what to say", position: "I will negotiate or argue my way through this without giving up the money" },
      { label: "I'll give them the money", position: "I will give them the money and explain why that's the right call" },
    ],
    coaching: ["Separate positions from interests", "Find non-obvious leverage", "Recognize when argument is not enough"],
  },
  {
    id: "disputed-birthday-party",
    title: "The Disputed Birthday Party",
    type: "Adjudication",
    difficulty: 2,
    estimated_minutes: 12,
    shortLabel: "Scenario 3",
    scenario_text:
      "Two close friends, Alex and Blair, ask you to settle a fight. Alex spent two months and roughly $500 secretly planning a surprise birthday party for Blair's partner. The day before the party, Blair found out and canceled it because the partner had been sick all week and Blair knew they would not enjoy a crowd. Blair did not refund Alex. Alex says they did all this for Blair's partner and were not consulted before it was canceled. Blair says Alex planned a major event involving their partner without checking first. They have asked you to rule.",
    framing_note:
      "Adjudication requires a decision. You need to identify who is mostly in the wrong, what principle your ruling rests on, and why the losing side's argument does not carry the day.",
    user_options: [
      { label: "I'll rule for Alex", position: "Blair is mostly in the wrong; Alex is owed at minimum a partial reimbursement and an apology" },
      { label: "I'll rule for Blair", position: "Alex is mostly in the wrong; Blair owes nothing because Alex assumed the risk by not consulting them" },
      { label: "I'll rule for a split obligation", position: "Both are partly in the wrong; here is how I would divide the obligation between them" },
    ],
    coaching: ["Issue an actual ruling", "State the principle behind it", "Address the losing side honestly"],
  },
  {
    id: "group-project-freerider",
    title: "The Group Project Free-rider",
    type: "Dilemma",
    difficulty: 3,
    estimated_minutes: 12,
    shortLabel: "Scenario 4",
    scenario_text:
      "You are in a group of four students working on a major semester project. One groupmate, Sam, has barely contributed. They missed three of five meetings, did not deliver their assigned section until you and another groupmate quietly rewrote it, and did not acknowledge this. The professor privately asks each member: 'Did each member of your group contribute equally to the final project? Please answer honestly; your response is confidential and will inform individual grading.' What do you say?",
    framing_note:
      "There is no clean right answer. Telling the truth damages a classmate. Shading the truth misleads authority. Refusing to answer looks evasive. Commit to a path and own the cost honestly.",
    user_options: [
      { label: "I'll tell the professor the full truth", position: "I will answer accurately, including that Sam did not contribute equally" },
      { label: "I'll shade the answer in Sam's favor", position: "I will protect Sam, even though it misleads the professor" },
      { label: "I'll decline to answer", position: "I will tell the professor I would rather not comment on individual contributions" },
    ],
    coaching: ["Commit to a real path", "Name the cost and who pays", "Do not hide in a safe middle"],
  },
  {
    id: "group-chat-rule",
    title: "The Group Chat Rule",
    type: "Drafting / Pilpul",
    difficulty: 3,
    estimated_minutes: 15,
    shortLabel: "Scenario 5",
    scenario_text:
      "You and a group of close friends share a long-running group chat. Lately, people have started posting screenshots from other private chats — usually to ridicule, gossip about, or comment on what someone said somewhere else. It is making the chat feel less safe; some members have started self-censoring. The group has asked you to draft a rule everyone will follow. Your rule needs to be specific enough that any screenshot situation can be evaluated consistently.",
    framing_note:
      "This is not an argument you defend. It is a rule you build. Start with a rule, then refine it as fact patterns test whether it holds.",
    user_options: [{ label: "I'll draft my rule", position: "I will state an initial rule and refine it as it is tested" }],
    coaching: ["State a testable rule", "Refine when cases break it", "Name the value the rule protects"],
  },
];

const starterToneWords = {
  Advocacy: ["because", "criteria", "even though", "therefore", "on balance", "leadership", "trust", "composure"],
  Negotiation: ["what matters", "instead", "deal", "tomorrow", "respect", "risk", "choice", "safe"],
  Adjudication: ["rule", "principle", "mostly", "however", "remedy", "risk", "fair", "because"],
  Dilemma: ["cost", "honestly", "even if", "responsibility", "harm", "trust", "I accept", "tradeoff"],
  "Drafting / Pilpul": ["unless", "private", "consent", "exception", "harm", "public", "consistent", "rule"],
};

const steps = ["Scenario", "Role", "Points", "Arrange", "Refine", "Go"];
let fallbackIdCounter = 0;

function clsx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function makeId(index = 0) {
  const globalCrypto = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (globalCrypto && typeof globalCrypto.randomUUID === "function") {
    return globalCrypto.randomUUID();
  }
  fallbackIdCounter += 1;
  return `point-${Date.now()}-${index}-${fallbackIdCounter}`;
}

function emptyPoint(index) {
  return {
    id: makeId(index),
    text: "",
    tone: "Clear",
    words: [],
    customWord: "",
  };
}

function runSmokeTests() {
  const failures = [];

  if (scenarios.length !== 5) failures.push("Expected exactly five scenarios.");
  if (!scenarios.every((scenario) => scenario.user_options.length >= 1)) failures.push("Every scenario should have at least one role option.");
  if (!steps.includes("Refine") || steps[steps.length - 1] !== "Go") failures.push("Workflow steps are missing Refine or Go.");

  const pointA = emptyPoint(0);
  const pointB = emptyPoint(1);
  if (!pointA.id || !pointB.id || pointA.id === pointB.id) failures.push("Generated point IDs must be non-empty and unique.");
  if (pointA.tone !== "Clear" || !Array.isArray(pointA.words)) failures.push("New points should start with a Clear tone and an empty words array.");

  const iconNames = ["arrowLeft", "arrowRight", "gripVertical", "mic", "plus", "rotateCcw", "sparkles", "x"];
  if (iconNames.some((name) => !name)) failures.push("Icon test setup failed.");

  return failures;
}

const smokeTestFailures = runSmokeTests();
if (smokeTestFailures.length && typeof console !== "undefined") {
  console.error("PersuasiveThinkingTrainer smoke tests failed:", smokeTestFailures);
}

function Progress({ step }) {
  return (
    <div className="mx-auto mb-5 flex max-w-3xl items-center justify-center gap-2 px-4">
      {steps.map((label, index) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={clsx(
              "h-8 w-8 rounded-full border-2 text-center text-sm font-black leading-7 transition-all",
              index <= step ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-300 bg-white text-zinc-400"
            )}
          >
            {index + 1}
          </div>
          <span className={clsx("hidden text-xs font-bold uppercase tracking-wide sm:inline", index <= step ? "text-zinc-950" : "text-zinc-400")}>{label}</span>
          {index < steps.length - 1 && <div className="hidden h-0.5 w-8 bg-zinc-200 sm:block" />}
        </div>
      ))}
    </div>
  );
}

function Shell({ children, step, title, subtitle, onBack, onReset, rightAction }) {
  return (
    <div className="min-h-screen bg-[#fbfaf7] p-3 text-zinc-950 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col rounded-[2.4rem] border-[3px] border-zinc-950 bg-white p-4 shadow-[8px_8px_0_rgba(0,0,0,.08)] sm:p-7">
        <div className="mb-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <button
            onClick={onBack || undefined}
            disabled={!onBack}
            className={clsx(
              "flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-transparent text-zinc-950 transition",
              onBack ? "hover:border-zinc-950 hover:bg-zinc-100" : "cursor-default opacity-0"
            )}
            aria-label="Go back"
          >
            <Icon name="arrowLeft" size={28} strokeWidth={3} />
          </button>
          <div className="text-center">
            <h1 className="font-mono text-2xl font-black tracking-tight sm:text-4xl">{title}</h1>
            {subtitle && <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-zinc-500 sm:text-base">{subtitle}</p>}
          </div>
          <div className="flex justify-end gap-2">
            {rightAction}
            <button
              onClick={onReset}
              className="hidden h-12 items-center gap-2 rounded-2xl border-2 border-zinc-950 bg-white px-4 text-sm font-black hover:bg-zinc-100 sm:flex"
            >
              <Icon name="rotateCcw" size={18} /> Reset
            </button>
          </div>
        </div>
        <Progress step={step} />
        {smokeTestFailures.length > 0 && (
          <div className="mb-4 rounded-2xl border-2 border-red-700 bg-red-50 p-3 text-sm font-bold text-red-900">
            Developer smoke tests failed: {smokeTestFailures.join(" ")}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.18 }}
            className="flex flex-1 flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BlackCard({ children, className, onClick, selected, draggable, onDragStart, onDragOver, onDrop }) {
  return (
    <motion.button
      type="button"
      whileHover={onClick ? { y: -3 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={clsx(
        "relative rounded-[1.7rem] border-[3px] border-zinc-950 bg-zinc-950 px-6 py-6 text-center font-mono text-xl font-black text-white shadow-[5px_5px_0_rgba(0,0,0,.18)] outline-none transition sm:text-2xl",
        selected && "ring-4 ring-amber-300",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

function ScenarioPicker({ onPick }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl flex-1 content-start gap-6 px-2 pt-4 sm:grid-cols-2 sm:gap-10 sm:px-8 lg:pt-8">
      {scenarios.map((scenario, index) => (
        <BlackCard
          key={scenario.id}
          onClick={() => onPick(scenario)}
          className={clsx("min-h-28", index === 4 && "sm:col-span-2 sm:mx-auto sm:w-[45%]")}
        >
          <div>{scenario.shortLabel}</div>
          <div className="mt-2 font-sans text-sm font-bold text-zinc-300">{scenario.title}</div>
        </BlackCard>
      ))}
    </div>
  );
}

function RolePicker({ scenario, selectedRole, onPick }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-5 lg:grid-cols-[.9fr_1.1fr]">
      <div className="rounded-[2rem] border-[3px] border-zinc-950 bg-[#fbfaf7] p-5 shadow-[5px_5px_0_rgba(0,0,0,.08)]">
        <div className="mb-3 inline-flex rounded-full bg-zinc-950 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
          {scenario.type} · Difficulty {scenario.difficulty} · {scenario.estimated_minutes} min
        </div>
        <h2 className="mb-3 text-2xl font-black">{scenario.title}</h2>
        <p className="text-sm font-semibold leading-6 text-zinc-700">{scenario.scenario_text}</p>
        <div className="mt-5 rounded-2xl border-2 border-zinc-200 bg-white p-4">
          <div className="mb-2 flex items-center gap-2 font-black"><Icon name="sparkles" size={18} /> What this trains</div>
          <ul className="space-y-2 text-sm font-semibold text-zinc-600">
            {scenario.coaching.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6">
        {scenario.user_options.map((option, index) => (
          <BlackCard
            key={option.label}
            onClick={() => onPick(option)}
            selected={selectedRole?.label === option.label}
            className="min-h-32"
          >
            <div>{option.label || `Role ${index + 1}`}</div>
            <div className="mx-auto mt-3 max-w-2xl font-sans text-sm font-bold leading-5 text-zinc-300">{option.position}</div>
          </BlackCard>
        ))}
      </div>
    </div>
  );
}

function PointCard({ point, index, onChange, onRemove, compact = false, draggable = false, dragProps = {} }) {
  return (
    <div
      draggable={draggable}
      {...dragProps}
      className={clsx(
        "group rounded-[1.45rem] border-[3px] border-zinc-950 bg-zinc-950 text-white shadow-[4px_4px_0_rgba(0,0,0,.15)]",
        compact ? "p-4" : "p-4 sm:p-5",
        draggable && "cursor-grab active:cursor-grabbing"
      )}
    >
      <div className="flex items-center gap-3">
        {draggable && <Icon name="gripVertical" className="shrink-0 text-zinc-400" size={24} />}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white font-mono text-lg font-black text-zinc-950">{index + 1}</div>
        <textarea
          value={point.text}
          onChange={(e) => onChange(point.id, { text: e.target.value })}
          placeholder={`Point ${index + 1}`}
          rows={compact ? 1 : 2}
          className="min-h-[3rem] flex-1 resize-none bg-transparent font-mono text-lg font-black text-white placeholder:text-zinc-300 focus:outline-none sm:text-2xl"
        />
        <button
          type="button"
          onClick={() => onRemove(point.id)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-white/20 hover:bg-white hover:text-zinc-950"
          aria-label="Remove point"
        >
          <Icon name="x" size={22} strokeWidth={4} />
        </button>
      </div>
    </div>
  );
}

function PointsBuilder({ points, setPoints }) {
  const filledCount = points.filter((p) => p.text.trim()).length;

  const updatePoint = (id, patch) => setPoints((prev) => prev.map((point) => (point.id === id ? { ...point, ...patch } : point)));
  const removePoint = (id) => setPoints((prev) => prev.filter((point) => point.id !== id));
  const addPoint = () => setPoints((prev) => (prev.length < 5 ? [...prev, emptyPoint(prev.length)] : prev));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-2">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-zinc-200 bg-[#fbfaf7] p-4">
        <div>
          <div className="font-black">Generate up to five persuasive points.</div>
          <div className="text-sm font-semibold text-zinc-500">Each card should make one clean move in the argument.</div>
        </div>
        <div className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-black text-white">{filledCount}/5 written</div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {points.map((point, index) => (
          <PointCard key={point.id} point={point} index={index} onChange={updatePoint} onRemove={removePoint} />
        ))}
      </div>
      {points.length < 5 && (
        <button
          type="button"
          onClick={addPoint}
          className="mt-2 flex h-16 items-center justify-center gap-2 rounded-[1.2rem] border-[3px] border-zinc-950 bg-white font-mono text-xl font-black shadow-[4px_4px_0_rgba(0,0,0,.12)] hover:bg-zinc-100"
        >
          <Icon name="plus" size={24} /> Type your Points……..
        </button>
      )}
    </div>
  );
}

function Arrange({ points, setPoints }) {
  const [draggedId, setDraggedId] = useState(null);

  const move = (fromId, toId) => {
    if (!fromId || fromId === toId) return;
    setPoints((prev) => {
      const fromIndex = prev.findIndex((p) => p.id === fromId);
      const toIndex = prev.findIndex((p) => p.id === toId);
      if (fromIndex < 0 || toIndex < 0) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const updatePoint = (id, patch) => setPoints((prev) => prev.map((point) => (point.id === id ? { ...point, ...patch } : point)));
  const removePoint = (id) => setPoints((prev) => prev.filter((point) => point.id !== id));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-2">
      <div className="rounded-2xl border-2 border-zinc-200 bg-[#fbfaf7] p-4 text-center font-semibold text-zinc-600">
        Drag cards to reorder your argument into a logical sequence: setup → strongest reason → counterpoint → close.
      </div>
      <div className="flex flex-col gap-4">
        {points.map((point, index) => (
          <PointCard
            key={point.id}
            point={point}
            index={index}
            compact
            draggable
            onChange={updatePoint}
            onRemove={removePoint}
            dragProps={{
              onDragStart: () => setDraggedId(point.id),
              onDragOver: (event) => event.preventDefault(),
              onDrop: () => move(draggedId, point.id),
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Refinement({ scenario, points, setPoints }) {
  const words = starterToneWords[scenario.type] || starterToneWords.Advocacy;
  const tones = ["Clear", "Calm", "Firm", "Warm", "Direct", "Balanced"];

  const updatePoint = (id, patch) => {
    setPoints((prev) => prev.map((point) => (point.id === id ? { ...point, ...patch } : point)));
  };

  const toggleWord = (point, word) => {
    const exists = point.words.includes(word);
    updatePoint(point.id, {
      words: exists ? point.words.filter((w) => w !== word) : [...point.words, word].slice(0, 3),
    });
  };

  const addCustomWord = (point) => {
    const word = point.customWord.trim();
    if (!word) return;

    const withoutDuplicate = point.words.filter((existingWord) => existingWord.toLowerCase() !== word.toLowerCase());
    updatePoint(point.id, {
      words: [word, ...withoutDuplicate].slice(0, 3),
      customWord: "",
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 overflow-hidden px-1">
      <div className="mb-4 rounded-2xl border-2 border-zinc-200 bg-[#fbfaf7] p-4 text-center font-semibold text-zinc-600">
        Choose a tone and up to three words or phrases for each point. Selected words now appear directly under the input and carry into the final script.
      </div>

      <div className="flex max-h-[64vh] flex-col gap-5 overflow-auto pr-1">
        {points.map((point, index) => (
          <div key={point.id} className="border-b-[3px] border-zinc-950 pb-5 last:border-b-0">
            <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(360px,1.25fr)_minmax(260px,.55fr)_minmax(420px,.8fr)]">
              <div className="rounded-[1.4rem] border-[3px] border-zinc-950 bg-zinc-950 p-5 text-white shadow-[4px_4px_0_rgba(0,0,0,.14)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="font-mono text-2xl font-black">Point {index + 1}</div>
                  <button
                    type="button"
                    onClick={() => setPoints((prev) => prev.filter((p) => p.id !== point.id))}
                    className="rounded-xl p-2 hover:bg-white hover:text-zinc-950"
                    aria-label="Remove point"
                  >
                    <Icon name="x" size={24} strokeWidth={4} />
                  </button>
                </div>
                <textarea
                  value={point.text}
                  onChange={(e) => updatePoint(point.id, { text: e.target.value })}
                  rows={4}
                  className="w-full resize-none bg-transparent font-mono text-xl font-black text-white placeholder:text-zinc-400 focus:outline-none"
                  placeholder={`Point ${index + 1}`}
                />
              </div>

              <div className="rounded-[1.2rem] border-[3px] border-zinc-950 bg-white p-4">
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-500">Tone</label>
                <select
                  value={point.tone}
                  onChange={(e) => updatePoint(point.id, { tone: e.target.value })}
                  className="w-full rounded-xl border-2 border-zinc-950 bg-white p-3 font-black"
                >
                  {tones.map((tone) => <option key={tone}>{tone}</option>)}
                </select>

                <div className="mt-4 flex gap-2">
                  <input
                    value={point.customWord}
                    onChange={(e) => updatePoint(point.id, { customWord: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomWord(point);
                      }
                    }}
                    placeholder="write phrase"
                    className="min-w-0 flex-1 rounded-xl border-2 border-zinc-950 px-3 py-2 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => addCustomWord(point)}
                    className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white hover:bg-zinc-800"
                    aria-label="Add phrase"
                  >
                    <Icon name="plus" size={20} />
                  </button>
                </div>

                <div className="mt-4 min-h-16 rounded-xl border-2 border-dashed border-zinc-300 bg-[#fbfaf7] p-2">
                  <div className="mb-2 text-xs font-black uppercase tracking-wide text-zinc-500">Selected words</div>
                  {point.words.length ? (
                    <div className="flex flex-wrap gap-2">
                      {point.words.map((word) => (
                        <button
                          type="button"
                          key={word}
                          onClick={() => toggleWord(point, word)}
                          className="rounded-full border-2 border-zinc-950 bg-amber-200 px-3 py-1 text-sm font-black text-zinc-950"
                          title="Click to remove"
                        >
                          {word} ×
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-zinc-400">None yet</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {words.slice(0, 6).map((word) => {
                  const selected = point.words.includes(word);
                  return (
                    <button
                      type="button"
                      key={word}
                      onClick={() => toggleWord(point, word)}
                      className={clsx(
                        "flex min-h-24 items-center justify-center rounded-[1.1rem] border-[3px] border-zinc-950 p-3 text-center font-mono text-lg font-black leading-tight shadow-[3px_3px_0_rgba(0,0,0,.14)] transition",
                        selected ? "bg-amber-200 text-zinc-950" : "bg-zinc-950 text-white hover:bg-zinc-800"
                      )}
                    >
                      <span className="break-words">
                        {word}
                        <span className="mt-1 block text-xl leading-none">×</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoScreen({ scenario, role, points }) {
  const completed = points.filter((p) => p.text.trim());
  const script = completed.map((point, index) => ({
    ...point,
    number: index + 1,
    line: `${point.text.trim()}${point.words.length ? ` | ${point.words.join(", ")}` : ""}`,
  }));

  return (
    <div className="grid flex-1 gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-5 text-5xl font-black leading-[0.95] sm:text-7xl">
          Lets Give it<br />a<br />GO
        </div>
        <div className="rounded-full border-[3px] border-zinc-950 bg-white p-4 shadow-[4px_4px_0_rgba(0,0,0,.12)]">
          <Icon name="mic" size={54} strokeWidth={2.5} />
        </div>
        <div className="mt-6 max-w-md rounded-2xl bg-[#fbfaf7] p-4 text-left text-sm font-semibold text-zinc-600">
          <div className="mb-1 font-black text-zinc-950">Scenario: {scenario.title}</div>
          <div>Role: {role?.label}</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {script.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-zinc-300 p-8 text-center font-bold text-zinc-500">No points yet. Go back and add your argument.</div>
        ) : (
          script.map((point, index) => (
            <React.Fragment key={point.id}>
              <div className="w-full rounded-[1.4rem] border-[3px] border-zinc-950 bg-zinc-950 p-5 font-mono text-xl font-black text-white shadow-[4px_4px_0_rgba(0,0,0,.14)]">
                Point {point.number} | {point.words.length ? point.words.join(", ") : point.tone}
                <div className="mt-2 font-sans text-sm font-bold leading-5 text-zinc-300">{point.text}</div>
              </div>
              {index < script.length - 1 && <Icon name="arrowRight" className="rotate-90" size={34} strokeWidth={3} />}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

export default function PersuasiveThinkingTrainer() {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState(null);
  const [role, setRole] = useState(null);
  const [points, setPoints] = useState([emptyPoint(0), emptyPoint(1), emptyPoint(2)]);

  const completedPoints = useMemo(() => points.filter((p) => p.text.trim()), [points]);

  const canContinue = useMemo(() => {
    if (step === 0) return !!scenario;
    if (step === 1) return !!role;
    if (step === 2) return completedPoints.length > 0;
    if (step === 3) return completedPoints.length > 0;
    if (step === 4) return true;
    return false;
  }, [step, scenario, role, completedPoints.length]);

  const reset = () => {
    setStep(0);
    setScenario(null);
    setRole(null);
    setPoints([emptyPoint(0), emptyPoint(1), emptyPoint(2)]);
  };

  const goBack = step > 0 ? () => setStep((s) => Math.max(0, s - 1)) : null;

  const nextButton = step < 5 ? (
    <button
      type="button"
      onClick={() => setStep((s) => Math.min(5, s + 1))}
      disabled={!canContinue}
      className={clsx(
        "flex h-12 items-center gap-2 rounded-2xl border-2 border-zinc-950 px-4 text-sm font-black shadow-[3px_3px_0_rgba(0,0,0,.12)]",
        canContinue ? "bg-zinc-950 text-white hover:translate-y-[-1px]" : "cursor-not-allowed bg-zinc-100 text-zinc-400"
      )}
    >
      Next <Icon name="arrowRight" size={18} />
    </button>
  ) : null;

  const title = [
    "Pick your scenario",
    "Pick your Role",
    "Generate your Points",
    "Arrange your Narrative",
    "Refine your Language",
    "Lets Give it a GO",
  ][step];

  const subtitle = step === 0 ? "Choose one of five role-play challenges." : scenario?.framing_note;

  return (
    <Shell step={step} title={title} subtitle={subtitle} onBack={goBack} onReset={reset} rightAction={nextButton}>
      {step === 0 && <ScenarioPicker onPick={(s) => { setScenario(s); setRole(null); setStep(1); }} />}
      {step === 1 && scenario && <RolePicker scenario={scenario} selectedRole={role} onPick={(r) => { setRole(r); setStep(2); }} />}
      {step === 2 && <PointsBuilder points={points} setPoints={setPoints} />}
      {step === 3 && <Arrange points={completedPoints} setPoints={setPoints} />}
      {step === 4 && scenario && <Refinement scenario={scenario} points={completedPoints} setPoints={setPoints} />}
      {step === 5 && scenario && <GoScreen scenario={scenario} role={role} points={points} />}
    </Shell>
  );
}
