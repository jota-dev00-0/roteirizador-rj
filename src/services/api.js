export async function otimizarRota(prompt) {
  const res = await fetch("/api/otimizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error("Erro na requisição de otimização");

  return res.json();
}
