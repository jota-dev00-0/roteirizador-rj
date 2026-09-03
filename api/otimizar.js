import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { prompt } = body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt é obrigatório" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Chave de API não configurada" });
    }

    const groq = new Groq({
      apiKey,
    });

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices?.[0]?.message?.content || "{}";
    return res.status(200).json(JSON.parse(content));
  } catch (error) {
    console.error("Erro ao otimizar rota:", error);
    return res.status(500).json({ error: "Erro ao processar a otimização" });
  }
}
