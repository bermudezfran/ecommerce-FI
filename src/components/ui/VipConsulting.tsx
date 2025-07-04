/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getVipUsers, getUsersByVipStatus } from "../../services/mockApi";
import { LoadingSpinner } from "../LoadingSpinner";
import { VipStatsCard, PeriodStatsCard } from "../CardData";
import "./VipContulting.css";

export const VipConsulting = () => {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2024");

  const {
    execute: executeVipUsers,
    loading: loadingVip,
    error: errorVip,
    data: vipData,
  } = useApi(getVipUsers);
  const {
    execute: executeByMonth,
    loading: loadingByMonth,
    error: errorByMonth,
    data: monthData,
  } = useApi(getUsersByVipStatus);

  const handleGetVipUsers = () => {
    executeVipUsers();
  };

  const handleGetUsersByMonth = () => {
    executeByMonth(selectedMonth, selectedYear);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateTotalSpent = (user: any) => {
    return user.purchaseHistory.reduce(
      (total: number, purchase: any) => total + purchase.amountPaid,
      0
    );
  };

  return (
    <div className="vip-consulting">
      <div className="vip-header">
        <h1>🔍 Consultas VIP</h1>
        <p className="vip-subtitle">
          Consulta información detallada de usuarios VIP
        </p>
      </div>

      <div className="vip-sections">
        <div className="vip-section">
          <div className="section-header">
            <h2>👑 Todos los Usuarios VIP</h2>
            <button
              className="vip-btn primary"
              onClick={handleGetVipUsers}
              disabled={loadingVip}
            >
              {loadingVip ? (
                <LoadingSpinner size="small" />
              ) : (
                "Obtener Usuarios VIP"
              )}
            </button>
          </div>

          {errorVip && (
            <div className="error-message">
              <span>❌ Error: {errorVip}</span>
            </div>
          )}

          {vipData && (
            <div className="vip-results">
              <VipStatsCard data={vipData.data} />

              <div className="users-grid">
                {vipData.data?.users.map((user: any) => (
                  <div key={user.id} className="user-card vip">
                    <div className="user-header">
                      <span className="user-avatar">👤</span>
                      <div className="user-info">
                        <h3 className="user-name">{user.name}</h3>
                        <span className="vip-badge">VIP</span>
                      </div>
                    </div>

                    <div className="user-stats">
                      <div className="stat-item">
                        <span className="stat-label">Compras:</span>
                        <span className="stat-value">
                          {user.purchaseHistory.length}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Total Gastado:</span>
                        <span className="stat-value">
                          ${calculateTotalSpent(user).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {user.purchaseHistory.length > 0 && (
                      <div className="purchase-history">
                        <h4>Historial de Compras:</h4>
                        <div className="purchases-list">
                          {user.purchaseHistory.map(
                            (purchase: any, index: number) => (
                              <div key={index} className="purchase-item">
                                <span className="purchase-date">
                                  {formatDate(purchase.date)}
                                </span>
                                <span className="purchase-amount">
                                  ${purchase.amountPaid}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="vip-section">
          <div className="section-header">
            <h2>📅 Usuarios por Período</h2>
            <div className="date-filters">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="month-select"
              >
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="year-select"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>

              <button
                className="vip-btn secondary"
                onClick={handleGetUsersByMonth}
                disabled={loadingByMonth}
              >
                {loadingByMonth ? <LoadingSpinner size="small" /> : "Consultar"}
              </button>
            </div>
          </div>

          {errorByMonth && (
            <div className="error-message">
              <span>❌ Error: {errorByMonth}</span>
            </div>
          )}

          {monthData && (
            <div className="vip-results">
              <PeriodStatsCard data={monthData.data} />

              <div className="users-grid">
                {monthData.data?.users.map((user: any) => (
                  <div
                    key={user.id}
                    className={`user-card ${user.isVip ? "vip" : "regular"}`}
                  >
                    <div className="user-header">
                      <span className="user-avatar">👤</span>
                      <div className="user-info">
                        <h3 className="user-name">{user.name}</h3>
                        <span
                          className={`status-badge ${
                            user.isVip ? "vip" : "regular"
                          }`}
                        >
                          {user.isVip ? "VIP" : "Regular"}
                        </span>
                      </div>
                    </div>

                    <div className="user-stats">
                      <div className="stat-item">
                        <span className="stat-label">Compras:</span>
                        <span className="stat-value">
                          {user.purchaseHistory.length}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Total Gastado:</span>
                        <span className="stat-value">
                          ${calculateTotalSpent(user).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
