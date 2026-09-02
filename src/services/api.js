export async function otimizarRota(prompt) {
<<<<<<< HEAD
  const res = await fetch("/api/otimizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error("Erro na requisição de otimização");

  return res.json();
=======
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
>>>>>>> services-ajustes-pr
}

export const otimizarRotas = otimizarRota;