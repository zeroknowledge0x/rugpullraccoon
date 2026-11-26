// rugpullraccoon — one word, one username, one reward.
// The entry is a single make.fun handle; emit it deterministically.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const HANDLE = "rugpullraccoon";

// One word, 1..30 UTF-8 characters, not only whitespace: the sealed gate.
const chars = Array.from(HANDLE);
if (chars.length < 1 || chars.length > 30 || !HANDLE.trim() || /\s/.test(HANDLE)) {
  throw new Error("invalid handle");
}

// Determinism: a fixed handle and a fixed output path, nothing time- or host-dependent.
const outDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "/output").replace(/\/+$/, "");
const target = `${outDir}/entry.txt`;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, HANDLE, "utf8");
