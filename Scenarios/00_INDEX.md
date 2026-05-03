# Scenarios — Index

The five prototype scenarios. Each has two files:

- `XX_name.md` — the human-readable design doc (read this first; it explains what the scenario teaches and how the AI should run it)
- `XX_name.json` — the machine-readable version (loaded by the app's code)

## The five

| # | Scenario | Type | Difficulty | Demo recommended? |
|---|---|---|---|---|
| 01 | Goalkeeper for Captain | Advocacy | 1 | **Yes — primary investor demo** |
| 02 | The Lunch Money Standoff | Negotiation | 2 | Yes — strong second choice |
| 03 | The Disputed Birthday Party | Adjudication | 2 | Yes if investor is intellectually engaged |
| 04 | The Group Project Free-rider | Dilemma | 3 | **No — uncomfortable, save for serious users** |
| 05 | The Group Chat Rule | Drafting / Pilpul | 3 | Yes if investor has 15+ minutes |

## Recommended order for user testing

For new users, run scenarios in roughly this order — easier first to build confidence, harder later when they're warmed up:

1. **Goalkeeper** — easy entry, clear structure, low emotional stakes
2. **Lunch Money** — vivid, accessible, introduces interest-vs-position thinking
3. **Birthday Party** — first time the user has to *rule*, not just argue a side
4. **Group Chat Rule** — the longest, most cognitively demanding, most distinctive
5. **Group Project** — the most uncomfortable; only after the user trusts the system

In user testing, most users will only complete 1–2 scenarios per session. That's fine. Track which scenarios users return to and which they avoid — that's product data.

## How the scenarios relate to each other

Each scenario trains a different cognitive move, by design:

- **Advocacy** (goalkeeper): make a case from disadvantage, anticipate the opposition
- **Negotiation** (lunch money): diagnose interests, work under power asymmetry
- **Adjudication** (birthday party): rule between two legitimate claims with reasoning that both could accept
- **Dilemma** (group project): commit to a path under irreducible uncertainty, name what it costs
- **Drafting / Pilpul** (group chat): build a rule that survives variation, articulate the underlying value

Together, these cover the spread of what serious legal cognition does. A user who works through all five has done a meaningful curriculum, not a sampler.

## What to update if you change a scenario

If you edit a `.json` file, the app reads the change immediately on next load — no code changes needed. If you edit the `.md` file, that's just for your own reference and doesn't affect the app.

If you change a scenario substantially, bump its `version` number in the JSON so you can track which prompt version was active when a particular conversation log was generated.
