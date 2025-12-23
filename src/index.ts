export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url)

		if (url.pathname === "/db-2") {
			const t = Date.now()
			const res = await fetch(
				"https://store-2d8cto07-production-ecomet.aws-eu-west-1.turso.io/v2/pipeline",
				{
					body: JSON.stringify({
						requests: [
							{ stmt: { sql: "SELECT * FROM storefront" }, type: "execute" },
							{ type: "close" },
						],
					}),
					headers: {
						Authorization:
							"Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjY1MjAwNTgsImlkIjoiMmVkYTEzYjYtZDI5Ni00MjY4LWIwNmEtYTZkZjRhMTJlMGI2IiwicmlkIjoiNGZiNzY1MDMtYmI1Zi00NDA5LTlhODItNTQ0YjNlMTYwYzJmIn0.7zAWUYg8hrBoDCNeZBwhMmqzlUPTb0AdtrlVxVuXSD9zRIAvJ2Gx8CH8bdRp90OLYsIORdTrgWGKGe-Z29TECA",
						"Content-Type": "application/json",
					},
					method: "POST",
				},
			)
			const headers = Object.fromEntries(res.headers.entries())
			const data = await res.json()
			console.log("db-2", { data: JSON.stringify(data), headers, time: Date.now() - t })
			return Response.json({ data, headers, time: Date.now() - t })
		}

		return new Response("GET /db-2", { status: 200 })
	},
}
