# proxr — Complete Guide

> **"Your GPU. Your rules. Your earnings."**
> A decentralized GPU compute marketplace — rent out your hardware, power the AI economy.

---

## Table of Contents

1. [What is proxr?](#1-what-is-proxr)
2. [Compute — Run AI Workloads](#2-compute--run-ai-workloads)
3. [Create — AI Image Generation](#3-create--ai-image-generation)
4. [Earn — Make Money from Your GPU](#4-earn--make-money-from-your-gpu)
5. [proxr cli — Local Coding Agent](#5-proxr-cli--local-coding-agent)
6. [Token $PROXR — Network Economy](#6-token-proxr--network-economy)
7. [Staking — Passive Income from $PROXR](#7-staking--passive-income-from-proxr)
8. [Referral — Invite & Earn](#8-referral--invite--earn)
9. [How It Works Under the Hood](#9-how-it-works-under-the-hood)
10. [Pricing Summary](#10-pricing-summary)
11. [Brand Kit](#11-brand-kit)

---

## 1. What is proxr?

Imagine a GPU cloud — but instead of renting from AWS or Google, you're tapping into the idle GPUs of people around the world. People like you.

That's proxr.

**The problem proxr solves:**

- Big cloud providers charge a premium for compute that's often sitting underutilized anyway.
- Most AI platforms store your prompts, log your usage, and can cut your access at any time.
- Centralized infra means centralized control — one company decides what's allowed.

**How proxr is different:**

- Your prompts are **never stored** — they pass through and disappear.
- Workers (GPU contributors) only see raw text — **no identity, no metadata**.
- No single company controls the network. No one can deplatform you.
- Models run **uncensored** — no corporate filter deciding what you're allowed to ask.

---

## 2. Compute — Run AI Workloads

Go to [proxr.app/compute](https://proxr.app/compute) and start using AI instantly. No setup required.

### Getting Started

1. Visit the site → get **5 free prompts** with no account required.
2. Type your message and hit send.
3. Want more? Create an account and top up with credits.

### Credit System

- **1 credit = $0.01 (one US cent)**
- Purchased with **USDC** (stablecoin)
- Credits never expire
- Failed jobs are automatically refunded

### Model Tiers

#### Standard — 10 credits/message
- Model: **Qwen3 8B Uncensored**
- Runs directly in your browser via WebGPU
- Fast, affordable, great for everyday tasks

#### Pro — 15 credits/message (20 with Deep Think)
- Models: **Qwen3.5 27B** or **SuperGemma4 26B** (your choice)
- Runs on dedicated native worker GPUs
- Supports: **web search** (live internet results), **vision** (image input), **deep thinking** (extended reasoning)

> 💡 **Tip:** Use Standard for casual questions. Switch to Pro when you need deep analysis, real-time info, or image understanding.

---

## 3. Create — AI Image Generation

Go to [proxr.app/create](https://proxr.app/create) to generate images with AI.

**Price: 20 credits = $0.20 per image**

Images are **never stored on proxr servers** — they're returned directly to you. Download them yourself if you want to keep them.

### Available Options

**Style:**
- None (open prompt)
- Photo (photorealistic)
- Cinematic
- Anime
- Digital Art
- 3D

**Aspect Ratio:**
- Square
- Portrait
- Landscape

**NSFW Toggle:** Available for adult content (18+). Content involving minors is never generated under any circumstances.

**Advanced Settings:**
- Negative prompt — describe what you don't want in the image
- Steps — render iterations (default: 32; higher = more detail, slower)
- Guidance — how strictly the model follows your prompt (default: 4.0)
- Seed — fixed number for reproducible outputs

---

## 4. Earn — Make Money from Your GPU

Go to [proxr.app/earn](https://proxr.app/earn) to start contributing as a Worker and earning **$USDC**.

The idea is simple: you lend your GPU to the proxr network. Every time a user sends a job and it gets processed by your hardware, you get paid.

There are 2 ways to contribute:

---

### Option 1: Native Worker ⚡ (Recommended)
**Earnings: $0.10–0.14 per job**

The most profitable path. Run a script in your terminal and your GPU starts processing AI jobs automatically in the background.

**Advantages:**
- Earn up to **10x more** than browser workers
- Runs in the **background** — no browser tab needed
- Handles larger, more powerful models (Qwen3.5 27B, SuperGemma4 26B)

**Setup:**
1. Make sure you have **Node.js 18+** installed (`brew install node` on Mac)
2. You'll need a **compatible GPU** (NVIDIA, AMD, or Apple Silicon)
3. Click "Get my command" on the Earn page → receive your unique terminal command
4. Paste it into your terminal → connected and earning immediately

> ⚠️ Your worker token is shown **once only** during setup. Save it somewhere safe.

**Technology stack:** Native workers use **ollama** as the AI engine with hardware acceleration:
- NVIDIA → CUDA
- Apple Silicon (M1/M2/M3/M4) → Metal
- AMD / Intel → Vulkan

---

### Option 2: Browser Worker
**Earnings: $0.07 per job**

The easiest entry point — just keep a browser tab open on the Earn page. Your GPU runs the Qwen3 8B model via **WebGPU** automatically.

**Limitations:**
- Significantly lower earnings
- Tab must stay open while earning
- Only handles smaller models

> Good for getting started, or if you don't have a discrete GPU (integrated graphics or lighter Apple Silicon).

---

### Worker Dashboard

On the Earn page, you get real-time stats:
- **Status:** Online / Offline
- **$USDC earned:** Total earnings
- **Uptime:** How long you've been running
- **Jobs:** Total jobs processed
- **tok/s:** Your generation speed (tokens per second)
- **Network:** Connection to the orchestrator

---

## 5. proxr cli — Local Coding Agent

proxr also ships a **CLI coding agent** you can install directly in your terminal. Think GitHub Copilot or Cursor — but the model runs on proxr's decentralized network, not a single corporate server.

### Install

```bash
npm i -g @proxr/cli
```

Requires Node.js 18+. Once installed, run it from inside any project folder:

```bash
proxr                          # interactive mode
proxr "fix the failing test"   # one-shot task
```

First run will ask for an **API key** — get one at proxr.app → Settings → API Keys.

### How It Works

You give an instruction, and the agent runs in a loop:

```
Read code → Edit what's needed → Run tests → Repeat until done
```

Key behaviors:
- **Asks for permission** before every edit or shell command (allow once, allow for session, or deny)
- Shows a **colored diff** of every change
- Makes small, targeted edits — never rewrites entire files
- If an edit causes a syntax error, it **auto-reverts**
- Won't claim success until tests actually pass

### Code Privacy

- **Your code is never uploaded** — all edits and shell commands run locally on your machine
- **Secrets are stripped automatically** before being sent to the model: API keys, `.env` contents, private keys, emails — the model only sees redacted placeholders
- Workers only receive the **snippet** being processed — they never know who you are

### Workspace & Memory

Every project gets a `.proxr/` folder containing `journal.md` — a log of what the agent has done. This is re-read at the start of each session, so the agent remembers prior context.

The agent also reads `proxr.md`, `AGENTS.md`, or `CLAUDE.md` in the project root as additional context. Run `/init` to auto-generate `proxr.md`.

### Available Commands

| Command | Function |
|---------|----------|
| `/init` | Generate project memory (proxr.md) |
| `/workspace` | View project work journal |
| `/login` | Set or update API key |
| `/help` | List all commands |
| `/exit` | Quit |

### Configuration Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PROXR_API_KEY` | — | API key (required) |
| `PROXR_MODEL` | `proxr-pro` | Model to use |
| `PROXR_YOLO` | `0` | Set `1` to auto-approve all edits |
| `PROXR_MAX_STEPS` | `40` | Max steps per task |

- **npm:** `@proxr/cli`
- **Source:** [github.com/proxr/cli](https://github.com/proxr/cli)

---

## 6. Token $PROXR — Network Economy

$PROXR is the native token of the proxr network — designed so its value grows alongside network adoption.

**Important distinction:** $PROXR is not what you use to pay for compute. That uses credits (USDC). $PROXR is a separate token that **captures the value** generated by network growth.

### Simple Analogy

Think of proxr like a busy diner. Credits are the cash customers use to pay for meals. $PROXR is like equity in the diner — the more customers it serves, the more valuable the equity becomes.

### Where Does Revenue Come From?

Two sources:

**1. Compute Margin (Inference Revenue)**
- Every paid inference job: workers receive **70%** of the job's credit value (or **80%** if the worker is staking).
- The remaining **30%** goes to the network treasury.

**2. $PROXR Trading Fees**
- Every time $PROXR is bought or sold on the open market, **35%** of the trading fee goes to treasury.

### What Does the Treasury Do?

Treasury is automatically split in two **every day:**

```
Treasury USDC
    ├── 50% → Buy $PROXR on open market → BURN (permanently destroyed)
    └── 50% → Distributed to all $PROXR Stakers (paid in USDC)
```

**Buyback & Burn effect:** $PROXR supply shrinks continuously as the network grows. More users → more revenue → more burns → scarcer supply.

### Treasury Stats (Live, as of June 2026)

| Metric | Value |
|--------|-------|
| $PROXR burned to date | 8.2M (0.82% of total supply) |
| Total buybacks executed | 11 |
| $PROXR currently staked | 42.1M (4.2% of supply) |
| Total paid to holders/stakers | $5,840 USDC |

---

## 7. Staking — Passive Income from $PROXR

Staking means locking your $PROXR into an on-chain vault and earning 3 benefits simultaneously.

**Key point:** Your $PROXR stays in your own on-chain wallet. No server holds your funds. Only you can unstake or claim.

### 3 Benefits of Staking

#### 1. 💵 Daily USDC from Treasury
- Every day at **15:00 UTC**, half of the treasury is distributed to all stakers
- Distribution is proportional: the more you've staked relative to total network stake, the larger your share
- Paid directly to your on-chain vault — claimable any time

#### 2. 🎟️ Free Daily Credits
- Staking grants you a daily allocation of free credits to use for AI
- Amount scales proportionally with your stake
- Free credits are **consumed first** before your paid credits
- Resets every midnight UTC — unused credits don't roll over
- Requirement: you must have used proxr at least once in the last 7 days (prevents farming by inactive accounts)

#### 3. ⚡ Worker Earnings Boost (if you're also a Worker)
- Workers who stake at least **1,000,000 $PROXR** earn **80% revenue per job** (vs. the standard 70%)
- Staking pays twice: USDC from treasury + bigger cut from every job processed

### How to Stake

1. Go to [proxr.app/staking](https://proxr.app/staking)
2. Stake however much $PROXR you hold
3. Wait **24 hours** — new deposits start counting after 24h (prevents reward sniping)
4. Rewards accumulate automatically every day

### Auto-Compound

Optional feature: **auto-compound**. When enabled, your daily USDC reward is automatically used to buy $PROXR and re-stake it. Fully automatic compounding. If a transaction fails, the reward is still sent as plain USDC.

### Unstaking

- Unstake any time, no penalty
- Unstaking starts from the **most recent** deposit — older matured deposits keep earning
- Partial unstaking has a minimum threshold

---

## 8. Referral — Invite & Earn

Bring people to proxr and earn **5% of every prompt they pay for, forever**.

### How It Works

1. Go to **Settings → Referrals** to get your link: `proxr.app/r/yourcode`
2. Share it
3. Anyone who opens it can try proxr immediately, no account needed (valid for 30 days in their browser)
4. If they create an account, they're permanently linked to you — no expiry, no transfers
5. Every paid prompt they send → you earn 5%

### What Counts?

| Usage Type | You earn 5%? |
|------------|-------------|
| Paid chat (Standard / Pro) | ✅ Yes |
| Paid image generation | ✅ Yes |
| Paid API usage | ✅ Yes |
| Staker daily credits | ✅ Yes |
| Free / onboarding prompts | ❌ No |

### Where Does the 5% Come From?

It doesn't cut into worker earnings. The 5% comes from the protocol/treasury share:
- Standard: Worker 70% / Treasury 25% / You 5%
- Worker staked: Worker 80% / Treasury 15% / You 5%

**Withdrawals:** Referral earnings land in the same balance as worker earnings. Minimum withdrawal is **$1.00**, sent as **USDC on Solana**.

---

## 9. How It Works Under the Hood

A simplified technical overview of the proxr system.

### 3 Core Components

```
[You/User]  ←→  [Orchestrator]  ←→  [Worker]
```

#### User Client (You)
- Open proxr.app, authenticate via **Privy** (auth system)
- Pick a model tier, type your message
- Receive streamed responses in real-time via **Socket.io**

#### Orchestrator (Control Center)
The "brain" of the network — a Node.js server that handles:

- **Authentication:** Verifies you and connected workers
- **Queue management:** Separate request queues per tier (Standard / Pro)
- **Worker matching:** Selects workers using **weighted-random by speed (tok/s)** — faster workers get more jobs, but all workers get a fair share
- **Web search:** When a model needs to browse, the orchestrator runs Brave Search API, fetches the top 3 results, extracts content, and passes it to the model as context
- **Stats broadcast:** Every 5 seconds, updates worker count, queue depth, and job totals for all online users
- **Zero persistence:** Prompts pass through — nothing is stored

#### Workers (GPU Contributors)

| Type | Technology | Serves |
|------|-----------|--------|
| Browser Worker | WebLLM + WebGPU | Standard tier (Qwen3 8B) |
| Native Worker | ollama + CUDA/Metal/Vulkan | Pro tier (Qwen3.5 27B, SuperGemma4 26B, Devstral) |
| Image Worker | ComfyUI | Image generation (Pro tier) |

### Flow of a Single Chat Message

```
1. You send a message
2. Orchestrator receives it → checks your tier
3. Request enters the appropriate queue
4. Orchestrator picks the right idle worker
5. Job is sent to the worker
6. Worker runs the model, streams tokens back to orchestrator
7. Orchestrator forwards tokens to you in real-time
8. Job completes → worker returns to idle → earnings credited
```

### Web Search Flow (Pro Tier)

When you ask something that needs live info, the model decides on its own when to search:

```
1. You send a message (Pro tier)
2. Worker runs model
3. Model emits tool call: web_search("query")
4. Orchestrator runs Brave Search API
5. Fetches top 3 URLs, extracts content
6. Sends results to model as additional context
7. Model continues generating based on new info
8. Response streams to you, with source citations
```

### Privacy — How Your Prompts Stay Safe

- The orchestrator **does not store** conversation content — it only routes traffic
- Workers only receive **raw text** — no name, email, or identity attached
- No permanent logs of what you asked

---

## 10. Pricing Summary

### Cost to Use AI

| Service | Price |
|---------|-------|
| Chat Standard (Qwen3 8B) | 10 credits = $0.10/message |
| Chat Pro (27B model) | 15 credits = $0.15/message |
| Chat Pro + Deep Think | 20 credits = $0.20/message |
| Image Generation | 20 credits = $0.20/image |

### Worker Earnings

| Worker Type | Per Job | Notes |
|-------------|---------|-------|
| Browser Worker | $0.07 | Tab must stay open |
| Native Worker | $0.10–0.14 | Background, dedicated GPU |
| Native Worker + Staking | +10% per job | Requires staking ≥1M $PROXR |

### Revenue Split per Job

```
Total credits from user (e.g. 15 credits = $0.15)
    ├── Worker:    70% → $0.105  (or 80% = $0.12 if worker is staking)
    └── Treasury:  30% → $0.045  (or 20% if worker is staking)
        ├── 50% of treasury → Buyback & Burn $PROXR
        └── 50% of treasury → Distributed to Stakers in USDC
```

---

## 11. Brand Kit

Visual identity and brand guidelines for proxr — for anyone creating content, writing about proxr, or building on top of the platform.

---

### Name & Writing

| ✅ Correct | ❌ Incorrect |
|-----------|-------------|
| `proxr` | `Proxr`, `PROXR`, `ProXR` |
| `$PROXR` | `$proxr`, `proxr token`, `PROXR` |
| `proxr cli` | `Proxr CLI`, `ProxrCLI` |

**Key rules:**
- Always lowercase: **proxr** (never "Proxr" or "PROXR")
- At the start of a sentence, still `proxr` — not "Proxr"
- The token is always written **$PROXR** (all caps, dollar sign)

---

### Tagline

> **"Your GPU. Your rules. Your earnings."**

This is the primary tagline used consistently across all platforms. Do not alter or abbreviate it.

Supporting taglines:
- *"A peer-to-peer GPU network where anyone can contribute compute and earn, while users get private, uncensored AI."*
- *"Decentralized. Private. Yours."* (three core pillars)

---

### Logo

The proxr wordmark is built around the name itself — lowercase, sharp, and terminal-native. The `r` at the end is a deliberate truncation, echoing the dropped-vowel naming convention that signals speed and directness.

**Logo characteristics:**
- Font: **Space Mono** — monospaced, geometric, zero-pretension
- All lowercase
- Primary color: **white on black**
- No gradients, no color accents

**Usage:**
- On dark backgrounds: white logo
- On light backgrounds: black logo
- Do not alter proportions, color, or font

---

### Colors

proxr uses a **pure monochrome palette** — no accent colors. The aesthetic is intentionally terminal-black to reinforce privacy and infrastructure credibility.

#### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Pure Black** | `#000000` | Main page background |
| **Near Black** | `#0F0F0F` | Card / panel background |
| **Dark Surface** | `#1A1A1A` | Elevated surface, secondary cards |
| **Muted Surface** | `#252525` | Hover states, secondary background |
| **Pure White** | `#FFFFFF` | Primary text, logo |
| **Off White** | `#F5F5F5` | Text on dark surfaces |
| **Muted Text** | `#888888` | Secondary text, placeholders, captions |
| **Border** | `rgba(255,255,255,0.08)` | Dividers, subtle borders |

#### Functional Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Error** | `#E5534B` | Error states, warning messages |
| **Online / Success** | `#22C55E` | "Connected" status, online indicator |
| **Earning** | `#22C55E` | Earnings counter, active worker state |

> 💡 **Color principle:** When in doubt, black and white only. proxr deliberately avoids the colorful gradient aesthetic common in "web3" or "AI" brands.

---

### Typography

proxr uses two fonts that create a clean terminal aesthetic:

#### 1. Primary / Code Font
**Space Mono**
- Used for: logo, headings, UI text, chat interface, everything
- Character: monospaced, geometric, readable
- Available via Google Fonts

#### 2. System UI (Fallback)
```
ui-monospace, "Courier New", Monaco, Consolas, monospace
```
- Used for: code blocks, terminal output, config snippets

#### 3. Decorative
**Pixel-style accents** (sparingly)
- Used for: loading states, status indicators
- Never for body copy

---

### Voice & Tone

How proxr communicates — as consistent as its visuals.

#### Core Principles

**1. Lowercase-first**
All informal communication uses lowercase throughout — matching the brand name itself. Not a typo. A choice.

```
✅ "your gpu is now earning."
✅ "no logs. no filters. no limits."
❌ "Your GPU Is Now Earning."
```

**2. Short and direct**
No preamble. Short sentences. Get to the point.

```
✅ "Open a tab. Start earning."
✅ "Your prompts aren't stored."
❌ "We are excited to share that our platform now enables users to..."
```

**3. Anti-corporate**
proxr positions itself as the opposite of big cloud. Avoid anything that sounds like a press release.

```
✅ "No AWS markup. No Google middleman."
✅ "Compute for the people, by the people."
❌ "Enterprise-grade distributed compute infrastructure."
```

**4. Technical but accessible**
We can talk about WebGPU, ollama, Socket.io — but always offer a plain-language version alongside.

**5. Three pillars, always consistent**
Every communication reinforces these values:
- **Private** — your prompts are not stored
- **Uncensored** — no corporate filter on what you can ask
- **Decentralized** — no single company controls the network

---

### Products & Sub-brands

| Name | Short description | URL |
|------|-------------------|-----|
| **proxr** | Main platform | proxr.app |
| **proxr compute** | AI chat interface | proxr.app/compute |
| **proxr create** | Image generation | proxr.app/create |
| **proxr earn** | Worker node dashboard | proxr.app/earn |
| **proxr cli** | Terminal coding agent | npm: `@proxr/cli` |
| **$PROXR** | Network token | proxr.app/staking |

All sub-products follow the naming convention: `proxr [name]` — all lowercase.

---

### Links & Social Media

| Platform | Handle / URL |
|----------|-------------|
| **Website** | [proxr.app](https://proxr.app) |
| **Docs** | [docs.proxr.app](https://docs.proxr.app) |
| **Blog** | [blog.proxr.app](https://blog.proxr.app) |
| **Network Stats** | [data.proxr.app](https://data.proxr.app) |
| **X / Twitter** | [@proxrapp](https://x.com/proxrapp) |
| **Telegram** | [t.me/proxr_io](https://t.me/proxr_io) |
| **GitHub** | [github.com/proxr-app/proxr](https://github.com/proxr-app/proxr) |

---

### Signature Visual Elements

Consistent design elements across all proxr products:

**1. Dot Grid Background**
Main page background uses a subtle dot pattern on black — evokes circuit boards and coordinate grids. proxr's signature visual.

**2. Live Network Counter**
Bottom-left of the compute interface always shows "X Workers / Y in Queue" — a constant reminder this is a real, live network.

**3. Connected Indicator**
Small green dot with "Connected" label — signals active network presence.

**4. Monospace Everything**
All UI text uses monospace fonts — numbers, labels, descriptions. Terminal-native by design.

**5. Minimal Animations**
Transitions are subtle and functional — no flashy effects. Loading states use simple pulse or blink animations that feel like a cursor, not a loading spinner.

---

*Documentation written based on proxr product design and network architecture — June 2026.*
