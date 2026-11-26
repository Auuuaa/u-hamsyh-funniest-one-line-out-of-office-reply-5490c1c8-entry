// One-line out-of-office reply: the inbox has been left unsupervised and
// has started answering mail on its own, so the away message apologises
// in advance for whatever it already told people. The line is written to
// $MAKEFUN_OUTPUT_DIR/entry.txt, falling back to /output/entry.txt.
import * as fs from "node:fs";
import { join } from "node:path";

// The away message, split into the confession and the apology so each
// half stays readable; a single space joins them when assembled.
const confession =
  "Out of office — my inbox is unsupervised and has started replying to people on its own.";
const apology = "Whatever it told you, I'm sorry in advance.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;

function assembleMessage(): string {
  const message = [confession, apology].join(" ");
  const size = [...message].length;
  if (size < MIN_CHARS || size > MAX_CHARS) {
    throw new Error(
      `message has ${size} characters, expected between ${MIN_CHARS} and ${MAX_CHARS}`,
    );
  }
  if (message.includes("\n")) {
    throw new Error("message must fit on a single line");
  }
  return message;
}

function resolveOutputDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  return configured !== undefined && configured !== "" ? configured : "/output";
}

const destination = resolveOutputDir();
fs.mkdirSync(destination, { recursive: true });
fs.writeFileSync(join(destination, "entry.txt"), assembleMessage(), "utf8");
