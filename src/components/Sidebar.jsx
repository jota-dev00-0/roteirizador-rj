import React, { useState } from "react";
import EntregaCard from "./EntregaCard";
import { TRUCK_COLORS } from "../data/entregas";

const Sidebar = ({
  entregas,
  tab,
  setTab,
  numCaminhoes,
  setNumCaminhoes,
  csvText,
  setCsvText,
  novo,
  setNovo,
  addEntrega,
  removeEntrega,
  importCSV,
  rotas,
  otimizar,
  loading,
  TRUCK_LABELS
}) => {
  const truckNumbers = [1, 2, 3, 4, 5, 6];

  return (
    <div className="sidebar">
      <div className="tab-bar">
        {[
          ["entregas", "📦 Entregas"],
          ["adicionar", "+ Adicionar"],
          ["importar", "↑ CSV"]
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab ${tab === id ? "active" : ""}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
        {rotas && (
          <button
            className={`tab ${tab === "rotas" ? "active" : ""}`}
            onClick={() => setTab("rotas")}
          >
            🗺 Rotas
          </button>
        )}
      </div>

      <div className="sidebar-content">
        {/* Configuração de caminhões */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-label">Caminhões disponíveis</div>
          <div className="caminhoes-config">
            {truckNumbers.map(n => (
              <button
                key={n}
                className={`caminhao-btn ${numCaminhoes === n ? "selected" : ""}`}
                style={
                  numCaminhoes === n
                    ? { background: TRUCK_COLORS[n - 1], borderColor: TRUCK_COLORS[n - 1], color: "#000" }
                    : {}
                }
                onClick={() => setNumCaminhoes(n)}
              >
                {n} {n === 1 ? "caminhão" : "caminhões"}
              </button>
            ))}
          </div>
        </div>

        {/* Aba: Entregas */}
        {tab === "entregas" && (
          <>
            <div className="section-label">{entregas.length} entregas hoje</div>
            {entregas.map(e => (
              <EntregaCard key={e.id} entrega={e} onRemove={removeEntrega} />
            ))}
          </>
        )}

        {/* Aba: Adicionar */}
        {tab === "adicionar" && (
          <div className="add-form">
            <div className="section-label" style={{ marginBottom: 14 }}>Nova entrega</div>
            <label className="field-label">Cliente</label>
            <input
              className="field-input"
              placeholder="Nome do cliente"
              value={novo.cliente}
              onChange={e => setNovo(p => ({ ...p, cliente: e.target.value }))}
            />
            <label className="field-label">Endereço completo</label>
            <input
              className="field-input"
              placeholder="Rua, número, bairro, Rio de Janeiro, RJ"
              value={novo.endereco}
              onChange={e => setNovo(p => ({ ...p, endereco: e.target.value }))}
            />
            <label className="field-label">Janela de horário</label>
            <select
              className="field-select"
              value={novo.janela}
              onChange={e => setNovo(p => ({ ...p, janela: e.target.value }))}
            >
              <option>08:00-12:00</option>
              <option>09:00-13:00</option>
              <option>10:00-14:00</option>
              <option>13:00-17:00</option>
              <option>14:00-18:00</option>
              <option>08:00-18:00</option>
            </select>
            <label className="field-label">Volume do móvel</label>
            <select
              className="field-select"
              value={novo.volume}
              onChange={e => setNovo(p => ({ ...p, volume: e.target.value }))}
            >
              <option>Grande</option>
              <option>Médio</option>
              <option>Pequeno</option>
            </select>
            <button
              className="add-btn"
              onClick={addEntrega}
              disabled={!novo.cliente || !novo.endereco}
            >
              + Adicionar entrega
            </button>
          </div>
        )}

        {/* Aba: Importar CSV */}
        {tab === "importar" && (
          <>
            <div className="section-label">Importar via CSV</div>
            <div className="hint">
              Cole abaixo, uma entrega por linha:<br />
              <strong style={{ color: "#666" }}>Nome;Endereço;Janela;Volume</strong><br /><br />
              Informe os dados reais para importar.
            </div>
            <textarea
              className="csv-area"
              placeholder="Nome;Endereço;Janela;Volume"
              value={csvText}
              onChange={e => setCsvText(e.target.value)}
            />
            <button
              className="add-btn"
              onClick={importCSV}
              disabled={!csvText.trim()}
            >
              ↑ Importar entregas
            </button>
          </>
        )}

        {/* Aba: Rotas (versão mini) */}
        {tab === "rotas" && rotas && (
          <>
            <div className="section-label">Resumo das rotas</div>
            {rotas.caminhoes.map((c, i) => (
              <div
                key={c.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "10px 12px",
                  marginBottom: 8
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div
                    className="truck-badge"
                    style={{
                      background: TRUCK_COLORS[i % TRUCK_COLORS.length],
                      width: 22,
                      height: 22,
                      fontSize: 10
                    }}
                  >
                    {TRUCK_LABELS[i]}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{c.regiao || c.nome}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)" }}>
                      {c.entregas.length} paradas · {c.km_estimado}km · {c.tempo_estimado}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Botão Otimizar fixo na parte inferior */}
      <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
        <button
          className="optimize-btn"
          style={{ width: "100%", clipPath: "none" }}
          onClick={otimizar}
          disabled={loading || entregas.length === 0}
        >
          {loading ? "OTIMIZANDO..." : `⚡ OTIMIZAR ${entregas.length} ENTREGAS`}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;