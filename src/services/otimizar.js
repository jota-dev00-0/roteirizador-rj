// api/otimizar.js (Roda direto nos servidores da Vercel)
import Groq from "groq-sdk";

const groq = new Groq({
  // Aqui a chave fica 100% protegida no servidor
  // eslint-disable-next-line no-undef
  apiKey: process.env.GROQ_API_KEY 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { prompt } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const conteudo = JSON.parse(completion.choices[0].message.content);

    return res.status(200).json(conteudo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}