import React from "react";
import { TRUCK_COLORS, TRUCK_LABELS } from "../data/entregas";
import { mapsLink } from "../utils/maps";

const Rotas = ({ rotas }) => {
  if (!rotas) return null;

  return (
    <>
      <div className="resumo-box">
        <div className="resumo-label">Estratégia da IA</div>
        {rotas.resumo}
      </div>

      <div className="rotas-grid">
        {rotas.caminhoes.map((c, i) => {
          const color = TRUCK_COLORS[i % TRUCK_COLORS.length];
          return (
            <div
              key={c.id}
              className="rota-card"
              style={{ animationDelay: `${i * 0.08}s`, borderTopColor: color, borderTopWidth: 2 }}
            >
              <div className="rota-header">
                <div className="rota-title">
                  <div className="truck-badge" style={{ background: color }}>
                    {TRUCK_LABELS[i]}
                  </div>
                  <div>
                    <div className="rota-nome">{c.nome}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: 1 }}>{c.regiao}</div>
                  </div>
                </div>
                <div className="rota-meta">
                  <div className="meta-item">
                    <div className="mv">{c.km_estimado}km</div>
                    <div className="ml">distância</div>
                  </div>
                  <div className="meta-item">
                    <div className="mv">{c.tempo_estimado}</div>
                    <div className="ml">tempo est.</div>
                  </div>
                  <div className="meta-item">
                    <div className="mv">{c.entregas.length}</div>
                    <div className="ml">paradas</div>
                  </div>
                </div>
              </div>

              <div className="rota-body">
                {c.entregas.map((p, pi) => (
                  <div key={pi} className="parada">
                    <div className="parada-num" style={{ background: color }}>
                      {p.ordem || pi + 1}
                    </div>
                    <div className="parada-info">
                      <div className="parada-cliente">{p.cliente}</div>
                      <div className="parada-end">{p.endereco}</div>
                      {p.observacao && <div className="parada-obs">{p.observacao}</div>}
                    </div>
                    <div className="parada-janela">{p.janela}</div>
                  </div>
                ))}
              </div>

              <div className="rota-footer">
                {c.dica && <div className="rota-dica">💡 {c.dica}</div>}
                <a
                  href={mapsLink(c.entregas)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-btn"
                >
                  ↗ Abrir no Google Maps
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Rotas;