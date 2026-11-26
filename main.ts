// Funniest One-Line Out-of-Office Reply.
//
// The joke: the away message confesses the inbox has been left alone and
// has begun answering mail by itself, then pre-apologises for whatever it
// already said. Writes the single line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (or /output/entry.txt when that variable is unset).
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The reply is kept in pieces so each half can be read on its own; the
// join keeps exactly one space between the situation and the apology.
const SEGMENTS = [
  "Out of office — my inbox is unsupervised and has started replying to people on its own.",
  "Whatever it told you, I'm sorry in advance.",
];

const GATE_MIN = 1;
const GATE_MAX = 160;

function buildReply(): string {
  const reply = SEGMENTS.join(" ");
  const length = Array.from(reply).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(
      `reply is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`,
    );
  }
  if (reply.indexOf("\n") !== -1) {
    throw new Error("reply must stay on one line");
  }
  return reply;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, "entry.txt"), buildReply(), { encoding: "utf8" });
