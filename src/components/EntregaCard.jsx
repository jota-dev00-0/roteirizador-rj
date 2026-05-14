import React from "react";
import { VOLUME_COLORS } from "../data/entregas";

const EntregaCard = ({ entrega, onRemove }) => {
  const { id, cliente, endereco, janela, volume } = entrega;
  const volColor = VOLUME_COLORS[volume] || "#888";

  return (
    <div className="entrega-card">
      <div className="entrega-header">
        <div className="entrega-cliente">{cliente}</div>
        <span
          className="vol-badge"
          style={{
            color: volColor,
            border: `1px solid ${volColor}33`
          }}
        >
          {volume}
        </span>
      </div>
      <div className="entrega-end">{endereco}</div>
      <div className="entrega-footer">
        <span className="janela-tag">⏰ {janela}</span>
        <button className="del-btn" onClick={() => onRemove(id)}>✕</button>
      </div>
    </div>
  );
};

export default EntregaCard;