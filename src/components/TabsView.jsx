import { List, Grid, Calendar } from 'lucide-react';

function TabsView({ darkMode, viewMode, setViewMode, activeListName }) {
  const tabs = [
    { id: 'list', label: 'Lista', icon: List },
    { id: 'grid', label: 'Cuadrícula', icon: Grid },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
  ];

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
    } border-b px-6 py-3 flex items-center justify-between transition-colors`}>
      <div>
        <h2 className={`text-2xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {activeListName}
        </h2>
      </div>

      <div className={`flex gap-2 p-1 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-white'
      }`}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = viewMode === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : darkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
              title={tab.label}
            >
              <Icon size={18} />
              <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TabsView;