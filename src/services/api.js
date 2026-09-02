export async function otimizarRota(prompt) {
  try {
    const response = await fetch("/services/otimizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log("Resultado da IA:", data);
    return data;
  } catch (error) {
    console.error("Erro na chamada:", error);
  }
}