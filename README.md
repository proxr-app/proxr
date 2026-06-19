# proxr
                               __  
   ____  _________  _  ______  / /_
  / __ \/ ___/ __ \| |/_/ __ \/ __/
 / /_/ / /  / /_/ />  </ /_/ / /_  
/ .___/_/   \____/_/|_|\____/\__/  
/_/                                

> **"your gpu. your rules. your earnings."**
> A decentralized P2P GPU compute network providing private, uncensored AI and image generation.

[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-black.svg?style=flat-mono)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-black.svg?style=flat-mono)](LICENSE)
[![Framework](https://img.shields.io/badge/built%20with-React%20%2B%20Vite-black.svg?style=flat-mono)](https://vite.dev)
[![Solana Only](https://img.shields.io/badge/chain-Solana-black.svg?style=flat-mono)](https://solana.com)

---

## 🛠️ Overview

`proxr` is a decentralized GPU marketplace that democratizes AI computation. Instead of relying on expensive, centralized cloud services (like AWS or Google Cloud) that log prompts, enforce corporate filters, and restrict access, `proxr` aggregates idle consumer GPUs worldwide into a single secure, high-performance computing network.

### Three Core Pillars
*   **🔒 private**: Prompts are routed dynamically and processed instantly. Conversation data is never stored on servers, and workers only process anonymous snippets.
*   **⚖️ uncensored**: The models run natively on peer hardware without corporate safety filters or alignment limits.
*   **🌐 decentralized**: Built as a peer-to-peer network where node selection is weighted dynamically by performance and speed.

---

## 🚀 Key Features

### 1. Compute Tiers
Run state-of-the-art Large Language Models directly from the web client or CLI:
*   **Standard Tier (10 credits/msg)**: Runs **Qwen3 8B Uncensored** locally in the browser utilizing **WebGPU** with zero installation.
*   **Pro Tier (15 credits/msg, 20 with Deep Think)**: Routes larger workloads (**Qwen3.5 27B** or **SuperGemma4 26B**) to native worker GPUs with supporting capabilities:
    *   **Live Web Search**: Live search queries routed via Brave Search API.
    *   **Vision**: Native image analysis.
    *   **Deep Thinking**: Advanced chain-of-thought reasoning models.

### 2. Create (AI Image Generation)
Generate custom imagery using decentralized GPU workers for **20 credits ($0.20) per image**:
*   Supports multiple styles (Cinematic, Anime, Photoreal, Digital Art, 3D).
*   Full aspect ratio control (Square, Portrait, Landscape).
*   Configurable negative prompts, seed inputs, guidance scales, and step sizes.
*   Zero server storage: images are returned directly to the browser payload.

### 3. CLI Coding Agent (`@proxr/cli`)
A terminal-native software development agent running on the `proxr` decentralized network.
*   **Local Action**: Edits code, creates files, and runs shell commands locally on your machine.
*   **Interactive Consent**: Asks for permission before every file write or terminal operation.
*   **Privacy-Native**: Auto-redacts secrets, API keys, emails, and `.env` variables before sending snippets to workers.

---

## ⚙️ Architecture & Data Flow

`proxr` coordinates workloads via a centralized orchestrator that routes traffic anonymously between clients and workers.

```
                  ┌──────────────────────────────┐
                  │          proxr App           │
                  │   (Privy Auth / Web Client)   │
                  └──────────────┬───────────────┘
                                 │
                   Socket.io Streams (JSON / WSS)
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │         Orchestrator         │
                  │       (Node.js Server)       │
                  └──────┬────────────────┬──────┘
                         │                │
             ┌───────────┘                └───────────┐
             ▼                                        ▼
┌──────────────────────────┐            ┌──────────────────────────┐
│     Browser Workers      │            │      Native Workers      │
│  (WebGPU / WebLLM Client)│            │(ollama / Vulkan/Metal/CUDA)│
└──────────────────────────┘            └──────────────────────────┘
```

### Prompt Routing & Job Matching
1.  **Inference Requests**: A user submits a message via Web or CLI.
2.  **Queueing**: Workloads are sorted into Standard/Pro queues by the orchestrator.
3.  **Weighted Worker Selection**: Workers are matched dynamically using a weighted-random selector based on active token-generation speed (tok/s), maximizing network throughput.
4.  **Token Streaming**: Worker runs inference (via ollama/WebGPU) and streams response back in real-time.
5.  **Payment Settlements**: Completed jobs trigger a 70% payout to the worker wallet (increases to 80% if the worker is staking $PROXR).

---

## 🪙 Network Economics & $PROXR Token

`$PROXR` is the network's utility and value capture token on Solana. While usage fees are paid using USDC-pegged credits, `$PROXR` captures overall network value.

### Revenue Loop
*   **Compute Margin**: Each inference fee splits 70/30. Workers receive 70% (80% if staking), and 30% is sent to the network treasury.
*   **Staking Distributions**: Stakers lock `$PROXR` inside their own on-chain vault to earn daily USDC dividends (50% of the treasury) and free daily credits.
*   **Buyback & Burn**: The other 50% of treasury USDC is used daily to buy `$PROXR` on the open market and burn it permanently, causing a deflating token supply.

---

## 💻 Developer Setup & Installation

### Local Development

1.  **Clone & Install Dependencies**:
    ```bash
    git clone https://github.com/proxr-app/proxr.git
    cd proxr
    npm install --legacy-peer-deps
    ```

2.  **Configuration**:
    Create a `.env` file in the root directory:
    ```env
    VITE_PRIVY_APP_ID=your_privy_app_id
    VITE_PRIVY_CLIENT_ID=your_privy_client_id
    ```

3.  **Run Dev Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` or the custom port outputted in the terminal.

### Running a Native Worker Node
To contribute GPU hardware and earn $USDC directly, run the terminal worker daemon:

1.  **System Requirements**:
    *   Node.js 18+
    *   NVIDIA GPU (CUDA), Apple Silicon (Metal), or AMD (Vulkan)
2.  **Launch Command**:
    Retrieve your worker command from the **Earn** dashboard on the app, then run:
    ```bash
    npx @proxr/worker --token <YOUR_WORKER_TOKEN>
    ```

### CLI Agent Installation
Install the terminal coding agent:
```bash
npm install -g @proxr/cli
```
Initialize in any project workspace:
```bash
proxr /init
proxr "implement a responsive card container"
```

---

## 📄 License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.
