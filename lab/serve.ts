// Serves the survey packet and saves its answers to survey.json beside it.
// Built to die with the survey. Run: bun lab/serve.ts — then open http://localhost:4012
// From a phone on the same Wi-Fi: HOST=0.0.0.0 bun lab/serve.ts — then open http://<this-machine's-ip>:4012

import { rename } from "node:fs/promises";

const dir = import.meta.dir;
const pagePath = `${dir}/packet.html`;
const answersPath = `${dir}/survey.json`;

const BODY_LIMIT_BYTES = 256 * 1024;
const ANSWER_LIMIT_COUNT = 1000;
const ANSWER_LIMIT_CHARS = 20_000;

const port = Number(process.env.PORT ?? 4012);
const hostname = process.env.HOST ?? "127.0.0.1";

type Answers = Record<string, string | boolean>;
type Parsed = { ok: true; answers: Answers } | { ok: false; error: string };

function parseAnswers(body: string): Parsed {
	let value: unknown;
	try {
		value = JSON.parse(body);
	} catch {
		return { ok: false, error: "body is not JSON" };
	}
	const answers = (value as { answers?: unknown } | null)?.answers;
	if (typeof answers !== "object" || answers === null || Array.isArray(answers)) return { ok: false, error: "body has no answers object" };
	const entries = Object.entries(answers);
	if (entries.length > ANSWER_LIMIT_COUNT) return { ok: false, error: `more than ${ANSWER_LIMIT_COUNT} answers` };
	for (const [key, answer] of entries) {
		const isText = typeof answer === "string" && answer.length <= ANSWER_LIMIT_CHARS;
		if (!isText && typeof answer !== "boolean") return { ok: false, error: `answer "${key}" is neither text within ${ANSWER_LIMIT_CHARS} characters nor a boolean` };
	}
	return { ok: true, answers: answers as Answers };
}

async function save(request: Request): Promise<Response> {
	const parsed = parseAnswers(await request.text());
	if (!parsed.ok) return new Response(parsed.error, { status: 400 });
	const savedAt = new Date().toISOString();
	// Written whole to a sibling, then renamed: a crash mid-write cannot leave half a survey.
	const draftPath = `${answersPath}.tmp`;
	await Bun.write(draftPath, JSON.stringify({ saved_at: savedAt, answers: parsed.answers }, null, "\t") + "\n");
	await rename(draftPath, answersPath);
	return Response.json({ saved_at: savedAt });
}

async function load(): Promise<Response> {
	const file = Bun.file(answersPath);
	if (!(await file.exists())) return Response.json({ saved_at: null, answers: {} });
	return new Response(file, { headers: { "content-type": "application/json", "cache-control": "no-store" } });
}

const server = Bun.serve({
	port,
	hostname,
	maxRequestBodySize: BODY_LIMIT_BYTES,
	async fetch(request) {
		const { pathname } = new URL(request.url);
		if (pathname === "/" && request.method === "GET") return new Response(Bun.file(pagePath), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
		if (pathname === "/survey.json" && request.method === "GET") return load();
		if (pathname === "/survey.json" && request.method === "PUT") return save(request);
		return new Response("not found", { status: 404 });
	},
	error(error) {
		console.error(error);
		return new Response(`server error: ${error.message}`, { status: 500 });
	},
});

console.log(`survey packet → http://${hostname === "0.0.0.0" ? "<this-machine's-ip>" : "localhost"}:${server.port}  ·  answers → ${answersPath}`);
