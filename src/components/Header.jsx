import React from "react";

const Header = ({ entregasCount, numCaminhoes, otimizado }) => (
  <div className="header">
    <div className="logo">
      <div className="logo-icon">🚛</div>
      <div>
        <div className="logo-text">ROTEIRO RJ</div>
        <div className="logo-sub">Sistema de Roteirização · Rio de Janeiro</div>
      </div>
    </div>
    <div className="header-stats">
      <div className="stat-chip">
        <div className="val">{entregasCount}</div>
        <div className="lbl">Entregas</div>
      </div>
      <div className="stat-chip">
        <div className="val">{numCaminhoes}</div>
        <div className="lbl">Caminhões</div>
      </div>
      {otimizado && (
        <div className="stat-chip">
          <div className="val" style={{ color: "#00C49A" }}>✓</div>
          <div className="lbl">Otimizado</div>
        </div>
      )}
    </div>
  </div>
);

export default Header;