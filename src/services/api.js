export async function otimizarRotas(prompt) {
  // 1. Atualizado para o endpoint oficial de Chat Completions da Groq
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
    },
    body: JSON.stringify({
      // 2. Substituído por um modelo rápido e gratuito da Groq (ex: Llama 3.3 70B)
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      // 3. Opcional: Garante que o modelo responda estritamente em formato JSON válido
      response_format: { type: "json_object" }, 
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) throw new Error("Erro na requisição da API do Groq");

  const data = await res.json();
  
  // 4. Tratamento modificado para ler a estrutura de resposta padrão da Groq/OpenAI
  const text = data.choices?.[0]?.message?.content || "";
  
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
