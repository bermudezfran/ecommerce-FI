/* eslint-disable @typescript-eslint/no-explicit-any */
import "./CardData.css";

interface StatCard {
  number: number | string;
  label: string;
  color?: "primary" | "secondary" | "success" | "warning";
}

interface CardDataProps {
  stats: StatCard[];
  title?: string;
  className?: string;
}

export const CardData = ({ stats, title, className = '' }: CardDataProps) => {
  return (
    <div className={`stats-summary ${className}`}>
      {title && <h3 className="stats-title">{title}</h3>}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color || 'primary'}`}>
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VipStatsCard = ({ data }: { data: any }) => {
  const stats: StatCard[] = [
    {
      number: data?.totalVipUsers || 0,
      label: 'Total VIP',
      color: 'primary'
    },
    {
      number: data?.users?.length || 0,
      label: 'Usuarios Encontrados',
      color: 'secondary'
    }
  ]

  return <CardData stats={stats} title="Estadísticas VIP" />
}

export const PeriodStatsCard = ({ data }: { data: any }) => {
  const stats: StatCard[] = [
    {
      number: data?.users?.length || 0,
      label: 'Usuarios Activos',
      color: 'success'
    },
    {
      number: data?.totalVipUsers || 0,
      label: 'VIP en Período',
      color: 'warning'
    }
  ]

  return <CardData stats={stats} title="Estadísticas del Período" />
}
