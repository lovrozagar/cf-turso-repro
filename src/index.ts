/*
 * .dev.vars:
 * TURSO_URL=https://your-db.region.turso.io
 * TURSO_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
 */
interface Env {
	TURSO_URL: string
	TURSO_TOKEN: string
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url)

		if (url.pathname === "/db-2") {
			const t = Date.now()
			const res = await fetch(`${env.TURSO_URL}/v2/pipeline`, {
				body: JSON.stringify({
					requests: [
						{ stmt: { sql: "SELECT * FROM storefront" }, type: "execute" },
						{ type: "close" },
					],
				}),
				headers: {
					Authorization: `Bearer ${env.TURSO_TOKEN}`,
					"Content-Type": "application/json",
				},
				method: "POST",
			})

			const data = await res.json()

			return Response.json({ data, headers: Object.fromEntries(res.headers.entries()), time: Date.now() - t }, { headers: { "Content-Type": "application/json" } })
		}

		return new Response("GET /db-2", { status: 200 })
	},
}
