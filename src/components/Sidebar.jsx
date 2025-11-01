import { useState } from 'react';
import { 
  Sun, Moon, Plus, MoreHorizontal, ListTodo, Star, Calendar, 
  CheckSquare, Users, Mail, Inbox, ChevronDown 
} from 'lucide-react';

function Sidebar({ darkMode, setDarkMode, activeList, setActiveList, lists, onCreateList }) {
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName);
      setNewListName('');
      setShowNewList(false);
    }
  };

  const mainMenuItems = [
    { id: 'mi-dia', label: 'Mi día', icon: Inbox, color: 'text-blue-500' },
    { id: 'importante', label: 'Importante', icon: Star, color: 'text-yellow-500' },
    { id: 'planeado', label: 'Planeado', icon: Calendar, color: 'text-purple-500' },
    { id: 'tareas', label: 'Tareas', icon: CheckSquare, color: 'text-green-500' },
    { id: 'asignadas', label: 'Asignadas a mi usuario', icon: Users, color: 'text-pink-500' },
    { id: 'correo', label: 'Correo electrónico marcado', icon: Mail, color: 'text-red-500' },
  ];

  return (
    <aside className={`${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-r h-screen w-64 overflow-y-auto flex flex-col transition-colors`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <ListTodo className="w-6 h-6 text-primary" />
        <h1 className={`text-xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          To Do
        </h1>
      </div>

      {/* Dark Mode Toggle */}
      <div className={`flex items-center gap-2 p-4 border-b ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded transition-colors ${
            darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm font-medium">
            {darkMode ? 'Claro' : 'Oscuro'}
          </span>
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <p className={`text-xs font-semibold uppercase tracking-wider ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        } px-2 mb-3`}>
          Menú
        </p>
        
        {mainMenuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeList === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveList(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-600'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} className={isActive ? '' : item.color} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Custom Lists Section */}
      <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-xs font-semibold uppercase tracking-wider ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Mis Listas
          </p>
          <button
            onClick={() => setShowNewList(!showNewList)}
            className={`p-1 rounded hover:bg-opacity-80 transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <Plus size={18} className="text-primary" />
          </button>
        </div>

        {/* New List Input */}
        {showNewList && (
          <div className={`mb-3 p-2 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <input
              type="text"
              placeholder="Nombre de la lista..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
              className={`w-full bg-transparent outline-none text-sm ${
                darkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
              }`}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCreateList}
                className="flex-1 bg-primary hover:bg-blue-600 text-white py-1 px-2 rounded text-sm font-medium transition-colors"
              >
                Crear
              </button>
              <button
                onClick={() => setShowNewList(false)}
                className={`flex-1 py-1 px-2 rounded text-sm font-medium transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lists */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {lists.map(list => (
            <button
              key={list.id}
              onClick={() => setActiveList(list.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                activeList === list.id
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-600'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium text-sm">{list.name}</span>
              <button
                className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <MoreHorizontal size={16} />
              </button>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
