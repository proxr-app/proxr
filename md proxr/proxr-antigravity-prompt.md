# proxr — Antigravity Build Prompt

Paste this entire prompt into Antigravity (Gemini Flash 2.5 Medium).

---

## PROMPT START

Build a full React + Vite web app for **proxr** — a decentralized GPU compute marketplace. The app should feel like a premium terminal-native product: dark, monospaced, minimal, anti-corporate. Think Vercel meets a hacker's GPU rig.

---

## TECH STACK

- **React + Vite**
- **React Router v6** for client-side routing
- **Tailwind CSS** for styling
- **@privy-io/react-auth** for wallet + auth (Privy)
- **Lucide React** for icons
- **Dummy backend** via in-memory state + mock async functions (no real API needed, but structure as if it will be replaced)

---

## BRAND & DESIGN SYSTEM

### Typography
- **Primary font:** `Space Mono` (Google Fonts) — use for ALL UI text, headings, labels, everything
- **Fallback:** `ui-monospace, "Courier New", Monaco, Consolas, monospace`

### Color Palette (strict — no deviation)
```
--color-bg:           #000000   /* main background */
--color-surface:      #0F0F0F   /* card / panel */
--color-surface-2:    #1A1A1A   /* elevated surface */
--color-hover:        #252525   /* hover state */
--color-white:        #FFFFFF   /* primary text */
--color-off-white:    #F5F5F5   /* secondary text on dark */
--color-muted:        #888888   /* placeholder, caption */
--color-border:       rgba(255,255,255,0.08)  /* dividers */
--color-error:        #E5534B   /* error / destructive */
--color-green:        #22C55E   /* online, success, earning */
```

**Rules:**
- Background is always `#000000`
- No gradients, no color accents, no blues or purples
- The only color that isn't black/white/gray is `#22C55E` (green for live/online states) and `#E5534B` (red for errors)
- Borders are always `rgba(255,255,255,0.08)` — never solid white

### Dot Grid Background
The main page background uses a CSS dot grid pattern:
```css
background-color: #000000;
background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
background-size: 24px 24px;
```
Apply this to the root `<body>` or main wrapper. Cards/panels sit on top of this.

### Components Feel
- Cards: `background: #0F0F0F`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 8px`
- Buttons (primary): `background: #FFFFFF`, `color: #000000`, `font-weight: 600`, hover: `background: #F5F5F5`
- Buttons (secondary/ghost): `border: 1px solid rgba(255,255,255,0.2)`, `color: #FFFFFF`, transparent bg
- Inputs: `background: #0F0F0F`, `border: 1px solid rgba(255,255,255,0.12)`, `color: #FFFFFF`, focus: border turns `rgba(255,255,255,0.4)`
- All text is lowercase where it's a label/UI element (matches brand voice)

---

## PRIVY SETUP

Use `@privy-io/react-auth`. Wrap the app in `<PrivyProvider>`.

```jsx
// main.jsx
import { PrivyProvider } from '@privy-io/react-auth';

<PrivyProvider
  appId="YOUR_PRIVY_APP_ID"
  config={{
    appearance: {
      theme: 'dark',
      accentColor: '#FFFFFF',
      logo: 'https://proxr.app/logo.png',
    },
    loginMethods: ['wallet', 'email'],
    defaultChain: { id: 1, name: 'Ethereum' },
    supportedChains: [
      { id: 1, name: 'Ethereum' },
      { id: 137, name: 'Polygon' },
      { id: 8453, name: 'Base' },
    ],
  }}
>
  <App />
</PrivyProvider>
```

**Auth behavior:**
- Top-right navbar: show "connect" button if not logged in → triggers `login()` from `usePrivy()`
- When connected: show truncated wallet address (e.g. `0x1a2b...3c4d`) + green dot indicator
- Disconnect button in a small dropdown on the address

---

## ROUTING STRUCTURE

```
/                → Landing page
/compute         → AI Chat interface
/create          → Image generation
/earn            → Worker dashboard
/staking         → Staking interface
/referral        → Referral dashboard
```

---

## SHARED LAYOUT

### Navbar (present on all pages)
- Left: `proxr` wordmark in Space Mono, white, lowercase, no logo image needed
- Center: nav links — `compute` · `create` · `earn` · `staking` — all lowercase, muted color, white on hover/active
- Right: connect wallet button (Privy) or wallet address if connected
- `border-bottom: 1px solid rgba(255,255,255,0.08)`
- Background: `#000000` with slight backdrop blur

### Footer (landing page only)
- One row: `proxr` left, links center (docs · blog · github · twitter · telegram), `© 2026 proxr` right
- All lowercase, muted text
- `border-top: 1px solid rgba(255,255,255,0.08)`

---

## PAGE 1 — LANDING PAGE (`/`)

### Hero Section
- Headline: `"your gpu. your rules. your earnings."` (lowercase, large, Space Mono)
- Subheadline: `"a peer-to-peer GPU network. contribute compute, earn USDC. use private, uncensored AI."`
- Two CTA buttons: `start computing` (primary, white) and `start earning` (ghost/secondary)
- Below CTAs: small live stats pill — `● 142 workers online · 3 in queue` (green dot, muted text, updates via mock interval every 5s with slight random variation ±5)

### How It Works Section
Three cards side by side:
1. **contribute** — "share your GPU, earn USDC per job processed"
2. **compute** — "run uncensored AI models on real people's hardware"
3. **earn** — "passive income from hardware you already own"

Each card: icon (Lucide), one-liner title, short description. No color fill, just border cards.

### Features Grid
Six feature tiles in a 3x2 grid:
- `private` — "your prompts pass through and disappear. nothing is stored."
- `uncensored` — "no corporate filter. no content policy. just the model."
- `decentralized` — "no single company controls the network."
- `earn USDC` — "get paid in stablecoin. minimum withdrawal $1.00."
- `$PROXR token` — "network token. stake to earn. supply burns over time."
- `open source` — "worker node is open source. verify what runs on your machine."

### Pricing Section
Two columns: **use AI** and **earn compute**

**Use AI:**
| tier | price |
|------|-------|
| standard chat | 10 credits / $0.10 per message |
| pro chat | 15 credits / $0.15 per message |
| pro + deep think | 20 credits / $0.20 per message |
| image generation | 20 credits / $0.20 per image |

**Earn compute:**
| type | per job |
|------|---------|
| browser worker | $0.07 |
| native worker | $0.10–$0.14 |
| native + staking | +10% per job |

### Stats Bar
Full-width strip with 4 live numbers (mock, randomized on load):
- `$PROXR burned` → `8,200,000`
- `total staked` → `42,100,000`
- `workers ever online` → `3,841`
- `total USDC paid out` → `$5,840`

### CTA Banner
Full-width dark card at the bottom:
- Text: `"ready to earn from your gpu?"`
- Subtext: `"connect your wallet and start in under 2 minutes."`
- Button: `get started` (primary white)

---

## PAGE 2 — COMPUTE (`/compute`)

A chat interface. Full-height layout, no footer.

### Layout
- Left sidebar (240px): conversation history list (dummy: show 3-4 placeholder conversations), `+ new chat` button at top
- Main area: chat messages + input at bottom
- Top bar: model selector dropdown

### Model Selector
Dropdown with two options:
```
● standard   Qwen3 8B · 10 credits/msg
● pro        Qwen3.5 27B · 15 credits/msg
```

### Chat Area
- Messages: user messages right-aligned (white bg, black text), assistant messages left-aligned (surface card style)
- Empty state: centered, `"what do you want to know?"` in large muted text, 4 suggestion chips below (e.g. "explain quantum computing", "write a python script", "what's the news today", "help me debug this code")
- Streaming effect: simulate streaming with a typing indicator (3 dots pulse) then reveal text word by word using `setTimeout`

### Input Bar
- Textarea (auto-resize), send button (arrow icon)
- Below input: credit cost indicator — `"this message will cost 10 credits"` in muted text
- If not connected: input is disabled, show `"connect wallet to start"` overlay

### Dummy Backend
Mock function `sendMessage(message, model)` that:
1. Waits 800ms
2. Returns a realistic-looking AI response (hardcode 3-4 varied responses, rotate randomly)
3. Simulates streaming by splitting response into words and yielding them with 40ms delay

### Credit Counter
Top-right of page: `credits: 240` — mock balance, deduct on each message send

---

## PAGE 3 — CREATE (`/create`)

Image generation interface.

### Layout
- Left panel (320px): all controls
- Right panel: generated image display area

### Controls (left panel)
```
prompt textarea       (large, multi-line)
style selector        (pill buttons: none · photo · cinematic · anime · digital art · 3d)
aspect ratio          (pill buttons: square · portrait · landscape)
nsfw toggle           (off by default)
[advanced settings accordion]
  negative prompt     (textarea)
  steps               (slider: 1–64, default 32)
  guidance            (slider: 1–10, default 4.0)
  seed                (number input, optional)
[generate button]     ("generate image · 20 credits", primary white, full width)
```

### Right Panel (image display)
- Default state: dashed border box with camera icon and `"your image will appear here"`
- Loading state: animated placeholder (pulse) with text `"generating... this takes ~15 seconds"`
- Generated state: show a placeholder gray rectangle as the "image" (since we're dummy) with download button overlay on hover

### Dummy Backend
Mock `generateImage(params)`:
1. Returns a Promise that resolves after 3000ms
2. Returns a mock response `{ url: null, seed: 12345 }` — display a gray placeholder div
3. Deduct 20 credits on successful generation

---

## PAGE 4 — EARN (`/earn`)

Worker dashboard. Two modes: browser worker and native worker.

### Top Section — Worker Type Toggle
Two large cards side by side, clickable:

**browser worker**
- `$0.07 per job`
- "keep a tab open, start earning"
- "powered by WebGPU · model: Qwen3 8B"

**native worker** ⚡ (recommended badge)
- `$0.10–$0.14 per job`
- "run in background, earn 10x more"
- "powered by ollama · NVIDIA / Apple Silicon / AMD"

### Browser Worker Panel (shown when browser worker selected)
- Big toggle button: `start earning` / `stop earning`
- When active: show live mock stats updating every 2s
  - Status: `● online` (green)
  - Jobs processed: increments by 1 every ~8s
  - USDC earned: increments by $0.07 per job
  - tok/s: fluctuates between 18–32
  - Uptime: live timer

### Native Worker Panel (shown when native worker selected)
- Step-by-step setup:
  1. `install node.js 18+` — with code block `brew install node`
  2. `get your worker command` — button: `generate my command` → reveals mock terminal command:
     ```
     npx @proxr/worker --token=prxw_7f3k9x2mq8...
     ```
     with copy button
  3. `paste into terminal` — instruction text
- Warning box: `"your worker token is shown once. save it."` (amber/white bordered box)
- Below setup: status card showing `● offline` until user "connects" (mock button)

### Earnings Summary Card
Always visible at bottom:
- Total earned: `$0.00 USDC`
- Pending: `$0.00`
- Withdraw button (disabled until balance > $1.00)

---

## PAGE 5 — STAKING (`/staking`)

### Top Stats Row (4 cards)
- `$PROXR price` → `$0.0042` (mock)
- `your balance` → `0 $PROXR` (mock, 0 if not connected)
- `total staked` → `42,100,000 $PROXR`
- `next reward` → countdown timer to next 15:00 UTC

### Stake / Unstake Panel
Two tabs: `stake` and `unstake`

**Stake tab:**
- Input: amount of $PROXR to stake
- Max button (fills with mock balance)
- Info row: `"new deposits start earning after 24 hours"`
- Auto-compound toggle: on/off
- Submit button: `stake $PROXR` (primary, requires wallet connection)

**Unstake tab:**
- Input: amount to unstake
- Info: `"unstaking starts from most recent deposit"`
- Submit button: `unstake`

### Your Staking Position (card)
If not staked (default):
- `"you have no active stake"`
- `"stake $PROXR to earn daily USDC rewards"`

If staked (show mock data after user stakes in UI):
- Amount staked: `X $PROXR`
- Daily USDC reward estimate
- Claimable rewards: `$X.XX USDC` + `claim` button
- Worker boost status: green if ≥1M staked, gray otherwise

### How Staking Works (info section)
Three cards:
1. `daily USDC` — "50% of treasury distributed to stakers every day at 15:00 UTC"
2. `free credits` — "stake to earn daily AI credits. proportional to your share."
3. `worker boost` — "stake 1M+ $PROXR to earn 80% per job instead of 70%"

### Treasury Stats (live mock)
- `total treasury` → `$824 USDC`
- `burned to date` → `8,200,000 $PROXR`
- `buybacks executed` → `11`
- `total paid to stakers` → `$5,840 USDC`

---

## PAGE 6 — REFERRAL (`/referral`)

Requires wallet connection — show lock state if not connected.

### Your Referral Link
- Display: `proxr.app/r/abc123` (mock code)
- Copy button
- Share buttons: Twitter (pre-filled tweet), Telegram

### Stats Row (4 cards)
- `total referred` → `0`
- `active users` → `0`
- `total earned` → `$0.00 USDC`
- `this month` → `$0.00 USDC`

### How It Works (3 steps)
1. `share your link` — "anyone who opens it can try proxr for free, no account needed (30 days)"
2. `they sign up` — "if they create an account, they're permanently linked to you"
3. `earn forever` — "5% of every paid prompt they send, for life"

### Commission Table
| usage type | you earn 5%? |
|------------|-------------|
| paid chat (standard / pro) | ✅ yes |
| paid image generation | ✅ yes |
| paid api usage | ✅ yes |
| staker daily credits | ✅ yes |
| free / onboarding prompts | ❌ no |

### Referred Users Table
Empty state: `"no referrals yet. share your link to start earning."`
When populated (mock): show table with columns: `wallet` · `joined` · `prompts` · `earned`

### Earnings Card
- Total referral earnings: `$0.00 USDC`
- Withdraw button (disabled, min $1.00)
- Info: `"earnings land in the same balance as worker earnings. minimum withdrawal $1.00 USDC on Solana."`

---

## MOCK DATA & STATE

Create a `src/lib/mockStore.js` that exports:

```js
// Global mock state (use React Context or Zustand if available)
export const mockState = {
  credits: 240,
  workerStatus: 'offline',
  workerJobs: 0,
  workerEarnings: 0.00,
  stakedAmount: 0,
  claimableUSDC: 0.00,
  referralCode: 'abc123',
  referralEarnings: 0.00,
  networkStats: {
    workersOnline: 142,
    inQueue: 3,
    proxrBurned: 8200000,
    totalStaked: 42100000,
    totalPaidOut: 5840,
    workersEver: 3841,
  }
}

// Mock async functions
export async function sendChatMessage(message, model) { ... }
export async function generateImage(params) { ... }
export async function stakeTokens(amount) { ... }
export async function unstakeTokens(amount) { ... }
export async function claimRewards() { ... }
export async function withdrawEarnings() { ... }
```

Wrap the whole app in a `MockStoreProvider` context so any page can read/update state.

---

## ADDITIONAL DETAILS

### Live Network Counter (global)
A component `<NetworkPulse />` that shows `● 142 workers · 3 in queue` — visible in the bottom-left corner on landing page, and top of /compute and /earn pages. Updates via `setInterval` every 5s with random ±5 fluctuation.

### Toast Notifications
Use a simple custom toast system (or react-hot-toast if available):
- Success: dark card, green left border, white text
- Error: dark card, red left border, white text
- Show on: wallet connect, credit purchase, stake, unstake, claim, copy actions

### Empty States
Every table/list has a proper empty state: icon + muted text + optional CTA button. Never just blank space.

### Responsive
- Mobile: hamburger menu collapses nav links, sidebar on /compute collapses to a drawer
- Minimum supported width: 375px

### Page Transitions
Subtle fade-in on route change (opacity 0→1, 150ms).

---

## FILE STRUCTURE SUGGESTION

```
src/
  components/
    layout/
      Navbar.jsx
      Footer.jsx
      NetworkPulse.jsx
    ui/
      Button.jsx
      Card.jsx
      Input.jsx
      Toggle.jsx
      Badge.jsx
      Toast.jsx
  pages/
    Landing.jsx
    Compute.jsx
    Create.jsx
    Earn.jsx
    Staking.jsx
    Referral.jsx
  lib/
    mockStore.js
    mockApi.js
    utils.js
  styles/
    globals.css   (Space Mono import, CSS variables, dot grid)
  main.jsx
  App.jsx
```

---

## IMPORTANT NOTES FOR AI

1. **All text labels and UI strings should be lowercase** — matching proxr brand voice. Exception: proper nouns (USDC, WebGPU, GPU, NVIDIA, etc.) and table headers.
2. **No color outside the palette** — if you're tempted to add a blue or purple, use white or muted gray instead.
3. **Space Mono everywhere** — not Inter, not Geist, not system-ui for display text.
4. **The dot grid background is a signature element** — don't remove it from the landing page.
5. **Privy handles ALL auth** — no custom login modal, no email/password forms. Only `login()` from `usePrivy()`.
6. **Mock data should feel realistic** — numbers, wallet addresses, timestamps should look real (e.g. `0x7f3k...9x2m`, `Jun 14, 2026`, `$0.0042`).
7. **Never show loading spinners as empty circles** — use pulse/skeleton animations that match the card style.
8. **The `/compute` page should feel like a real chat app** — not a toy. Sidebar, message bubbles, streaming, model selector.

---

## PROMPT END
