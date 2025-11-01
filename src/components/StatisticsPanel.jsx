import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

function StatisticsPanel({ stats, darkMode }) {
  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      icon: ListTodo,
      color: 'blue',
    },
    {
      label: 'Activas',
      value: stats.active,
      icon: Circle,
      color: 'orange',
    },
    {
      label: 'Completadas',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'green',
    },
  ];

  const colorMap = {
    blue: {
      light: 'bg-blue-50 text-blue-600 border-blue-200',
      dark: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    orange: {
      light: 'bg-orange-50 text-orange-600 border-orange-200',
      dark: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
    green: {
      light: 'bg-green-50 text-green-600 border-green-200',
      dark: 'bg-green-500/10 text-green-400 border-green-500/20',
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color];
        const colorClass = darkMode ? colors.dark : colors.light;

        return (
          <div
            key={stat.label}
            className={`
              p-4 rounded-lg border transition-transform hover:scale-105
              ${colorClass} animate-slide-in
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <Icon size={32} className="opacity-50" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatisticsPanel;
