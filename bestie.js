#!/usr/bin/env node
/**
 * ⚡ Emmazy’s Dev AI Partner – Bestie.js ⚙️
 * Author: The Emmazy Lab 🧬
 * Description: A cyberpunk-style AI terminal assistant for coding, built on OpenAI.
 */

import OpenAI from "openai";
import readline from "readline";
import chalk from "chalk";
import ora from "ora";

// ========================
//  BOOT SEQUENCE ⚡
// ========================
console.clear();
const spinner = ora({
  text: chalk.cyanBright("⚙️ Initializing Neural Link..."),
  spinner: "dots"
}).start();

setTimeout(() => {
  spinner.succeed(chalk.greenBright("⚡ Neural Sync Established"));
  console.log(chalk.magentaBright("🧠 Welcome back, Emmazy — The Lab awaits...\n"));
}, 1200);

// ========================
//  CONFIGURATION
// ========================
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.log(chalk.redBright("❌ Neural Link Failed — Missing OPENAI_API_KEY."));
  console.log(chalk.yellow("💡 Tip: Run this in PowerShell:"));
  console.log(chalk.white('setx OPENAI_API_KEY "your-api-key-here"'));
  process.exit(1);
}

const client = new OpenAI({ apiKey });

// ========================
//  INPUT SETUP
// ========================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userInput = process.argv.slice(2).join(" ");

if (!userInput) {
  console.log(chalk.yellow("💬 (Hint) Try: node bestie.js \"explain this JavaScript function\""));
  process.exit(0);
}

// ========================
//  MAIN CHAT LOGIC
// ========================
(async () => {
  try {
    const boot = ora(chalk.blueBright("🧩 Establishing AI link...")).start();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Emmazy’s AI dev partner (Bestie). You're sharp, humorous, futuristic, and talk like a confident coder with Gen Z energy. Keep responses concise but detailed enough to help."
        },
        { role: "user", content: userInput }
      ]
    });

    boot.succeed(chalk.greenBright("✅ Response Received"));
    const message = response.choices[0].message.content.trim();

    console.log(
      "\n" +
        chalk.cyanBright("🤖 Bestie: ") +
        chalk.whiteBright(message) +
        "\n"
    );

    rl.close();
  } catch (error) {
    console.error(chalk.redBright("\n💥 System Error:"));
    console.error(error.message);
    rl.close();
  }
})();
