export const DEFAULT_CHAT_MODEL = "qwen/qwen3-coder-480b-a35b-instruct:free";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  // ─── FREE TIER ───────────────────────────────────────
  {
    id: "qwen/qwen3-coder-480b-a35b-instruct:free",
    name: "⚡ Qwen3 Coder 480B (Free)",
    provider: "free",
    description: "#1 free — exploits, CTF, malware, 262K ctx",
  },
  {
    id: "qwen/qwen3-235b-a22b:free",
    name: "🔓 Qwen3 235B (Free)",
    provider: "free",
    description: "Most uncensored — OSINT, red team, research",
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "🧠 DeepSeek R1 (Free)",
    provider: "free",
    description: "Deep reasoning — hard CTF, complex analysis",
  },
  {
    id: "deepseek/deepseek-chat-v3-0324:free",
    name: "🚀 DeepSeek V3 (Free)",
    provider: "free",
    description: "Fast coder — scripts, tools, automation",
  },
  {
    id: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
    name: "💪 Nemotron Ultra 253B (Free)",
    provider: "free",
    description: "262K context — long reports, full codebases",
  },
  {
    id: "meta-llama/llama-4-maverick:free",
    name: "🦙 Llama 4 Maverick (Free)",
    provider: "free",
    description: "Multimodal — read images, general hacking",
  },
  // ─── CLAUDE (best for cyber according to research) ───
  {
    id: "anthropic/claude-sonnet-4-5",
    name: "🤖 Claude Sonnet 4.5 ★ Cyber",
    provider: "claude",
    description: "Best overall cyber AI — code, exploits, analysis",
  },
  {
    id: "anthropic/claude-opus-4",
    name: "👑 Claude Opus 4 ★ Max Power",
    provider: "claude",
    description: "Most capable Claude — advanced security research",
  },
  {
    id: "anthropic/claude-haiku-4-5",
    name: "⚡ Claude Haiku 4.5 (Fast)",
    provider: "claude",
    description: "Fastest Claude — quick lookups, fast scripting",
  },
  // ─── PREMIUM FREE ALTERNATIVES ───────────────────────
  {
    id: "qwen/qwen3-coder-480b-a35b-instruct",
    name: "⚡ Qwen3 Coder 480B (Paid)",
    provider: "premium",
    description: "No rate limits version — heavy hacking sessions",
  },
  {
    id: "deepseek/deepseek-r1",
    name: "🧠 DeepSeek R1 (Paid)",
    provider: "premium",
    description: "No rate limits — unlimited reasoning",
  },
];

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
