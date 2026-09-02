import Groq from "groq-sdk";

const groq = new Groq({
<<<<<<< HEAD
  apiKey: process.env.GROQ_API_KEY,
=======
  // eslint-disable-next-line no-undef
  apiKey: process.env.GROQ_API_KEY
>>>>>>> services-ajustes-pr
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

<<<<<<< HEAD
  const { prompt } = req.body;

  try {
=======
  try {
    const { prompt } = req.body ?? {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt é obrigatório" });
    }

>>>>>>> services-ajustes-pr
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
<<<<<<< HEAD
      response_format: { type: "json_object" },
    });

    const content = completion.choices?.[0]?.message?.content || "{}";
    return res.status(200).json(JSON.parse(content));
  } catch (error) {
    console.error("Erro ao otimizar rota:", error);
    return res.status(500).json({ error: "Erro ao processar a otimização" });
=======
      response_format: { type: "json_object" }
    });

    const content = completion?.choices?.[0]?.message?.content;
    const response = JSON.parse(content);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Erro ao otimizar rotas" });
>>>>>>> services-ajustes-pr
  }
}
