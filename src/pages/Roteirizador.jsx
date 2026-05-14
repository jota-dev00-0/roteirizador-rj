import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Rotas from "../components/Rotas";
import { DEMO_ENTREGAS, TRUCK_LABELS } from "../data/entregas";
import { otimizarRotas } from "../services/api";

const Roteirizador = () => {
  const [entregas, setEntregas] = useState(DEMO_ENTREGAS);
  const [numCaminhoes, setNumCaminhoes] = useState(6);
  const [loading, setLoading] = useState(false);
  const [rotas, setRotas] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("entregas");
  const [csvText, setCsvText] = useState("");
  const [novo, setNovo] = useState({
    cliente: "",
    endereco: "",
    janela: "08:00-12:00",
    volume: "Médio"
  });

  const addEntrega = () => {
    if (!novo.cliente.trim() || !novo.endereco.trim()) return;
    setEntregas(p => [...p, { ...novo, id: Date.now() }]);
    setNovo({ cliente: "", endereco: "", janela: "08:00-12:00", volume: "Médio" });
  };

  const removeEntrega = (id) => setEntregas(p => p.filter(e => e.id !== id));

  const importCSV = () => {
    const lines = csvText.trim().split("\n").filter(Boolean);
    const novas = lines
      .map((l, i) => {
        const p = l.split(";");
        return {
          id: Date.now() + i,
          cliente: p[0]?.trim() || `Cliente ${i + 1}`,
          endereco: p[1]?.trim() || "",
          janela: p[2]?.trim() || "08:00-18:00",
          volume: p[3]?.trim() || "Médio"
        };
      })
      .filter(e => e.endereco);
    if (novas.length) {
      setEntregas(novas);
      setCsvText("");
      setTab("entregas");
    }
  };

  const otimizar = useCallback(async () => {
    if (entregas.length === 0) return;
    setLoading(true);
    setError("");
    setRotas(null);

    const prompt = `Você é um especialista em roteirização logística no Rio de Janeiro para uma empresa de móveis.
DADOS DO DIA:
- ${entregas.length} entregas para distribuir entre ${numCaminhoes} caminhões
- Depósito/saída: Centro do Rio de Janeiro, RJ
- Cidade: Rio de Janeiro, RJ

ENTREGAS:
${entregas.map((e, i) => `${i + 1}. Cliente: ${e.cliente} | Endereço: ${e.endereco} | Janela: ${e.janela} | Volume: ${e.volume}`).join("\n")}

REGRAS:
1. Divida as entregas entre exatamente ${numCaminhoes} caminhões de forma equilibrada (quantidade similar por caminhão)
2. Agrupe geograficamente: entregas próximas no mesmo caminhão (ex: Zona Sul juntos, Zona Norte juntos, Barra/Jacarepaguá juntos, etc)
3. Ordene a sequência de cada caminhão para minimizar distância percorrida
4. Respeite as janelas de horário quando possível
5. Considere o volume: caminhões com peças grandes não devem ter muitas paradas

Responda SOMENTE em JSON válido, sem markdown, sem texto extra:
{
  "resumo": "resumo da estratégia de distribuição usada",
  "caminhoes": [
    {
      "id": 1,
      "nome": "Caminhão 1",
      "regiao": "Zona Sul",
      "entregas": [
        { "ordem": 1, "cliente": "nome", "endereco": "endereço", "janela": "horário", "volume": "Grande/Médio/Pequeno", "observacao": "dica curta" }
      ],
      "km_estimado": 42,
      "tempo_estimado": "4h",
      "dica": "observação operacional"
    }
  ]
}`;

    try {
      const parsed = await otimizarRotas(prompt);
      setRotas(parsed);
      setTab("rotas");
    } catch (err) {
      setError("Erro ao processar a otimização. Verifique a conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [entregas, numCaminhoes]);

  return (
    <div className="app">
      <Header
        entregasCount={entregas.length}
        numCaminhoes={numCaminhoes}
        otimizado={!!rotas}
      />

      <div className="layout">
        <Sidebar
          entregas={entregas}
          tab={tab}
          setTab={setTab}
          numCaminhoes={numCaminhoes}
          setNumCaminhoes={setNumCaminhoes}
          csvText={csvText}
          setCsvText={setCsvText}
          novo={novo}
          setNovo={setNovo}
          addEntrega={addEntrega}
          removeEntrega={removeEntrega}
          importCSV={importCSV}
          rotas={rotas}
          otimizar={otimizar}
          loading={loading}
          TRUCK_LABELS={TRUCK_LABELS}
        />

        <div className="main-content">
          <div className="optimize-bar">
            <div className="optimize-info">
              <h2>ROTAS DO DIA</h2>
              <p>
                {rotas
                  ? `${rotas.caminhoes.length} caminhões · ${entregas.length} entregas otimizadas`
                  : "Adicione as entregas e clique em otimizar"}
              </p>
            </div>
          </div>

          {error && <div className="error-box">⚠ {error}</div>}

          {loading && (
            <div className="loading-overlay">
              <div className="loading-ring" />
              <div className="loading-text">CALCULANDO ROTAS...</div>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: 1 }}>
                IA analisando {entregas.length} endereços no Rio de Janeiro
              </div>
            </div>
          )}

          {!loading && !rotas && (
            <div className="empty-state">
              <div className="empty-icon">🗺</div>
              <div className="empty-title">NENHUMA ROTA GERADA</div>
              <div className="empty-text">
                Configure as entregas na barra lateral<br />
                e clique em <strong style={{ color: "var(--accent)" }}>Otimizar</strong> para gerar as rotas do dia
              </div>
            </div>
          )}

          {!loading && rotas && <Rotas rotas={rotas} />}
        </div>
      </div>
    </div>
  );
};

export default Roteirizador;