export async function otimizarRota(prompt) {
  const response = await fetch("/api/otimizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao otimizar rotas");
  }

  return response.json();
}

export const otimizarRotas = otimizarRota;