import { CheckCircle2, Circle, Trash2, Star, Calendar, AlignLeft } from 'lucide-react';
import { useState } from 'react';

function TodoItemMejorado({ 
  todo, 
  onDelete, 
  onToggle, 
  onToggleImportant,
  onEditDetails,
  darkMode, 
  isLast 
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={`
        flex items-center gap-3 px-4 py-3 transition-all hover:bg-blue-50 
        animate-fade-in group
        ${darkMode ? 'hover:bg-gray-700' : ''}
        ${!isLast ? (darkMode ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''}
      `}>
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 transition-colors ${
            todo.completed
              ? 'text-primary'
              : darkMode
                ? 'text-gray-500 hover:text-gray-400'
                : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {todo.completed ? (
            <CheckCircle2 size={24} />
          ) : (
            <Circle size={24} />
          )}
        </button>

        {/* Main Content */}
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <span className={`block text-base transition-colors ${
            todo.completed
              ? darkMode
                ? 'text-gray-500 line-through'
                : 'text-gray-400 line-through'
              : darkMode
                ? 'text-white'
                : 'text-gray-800'
          }`}>
            {todo.text}
          </span>
          
          {/* Detalles si existen */}
          {(todo.dueDate || todo.important) && (
            <div className="flex gap-3 mt-1">
              {todo.important && (
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  darkMode
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  ⭐ Importante
                </span>
              )}
              {todo.dueDate && (
                <span className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  <Calendar size={12} />
                  {new Date(todo.dueDate).toLocaleDateString('es-ES', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Important Button */}
          <button
            onClick={() => onToggleImportant(todo.id)}
            className={`p-2 rounded transition-all ${
              todo.important
                ? 'text-yellow-500 bg-yellow-500/10'
                : darkMode
                  ? 'text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10'
                  : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
            }`}
            title="Marcar como importante"
          >
            <Star size={18} fill={todo.important ? 'currentColor' : 'none'} />
          </button>

          {/* Details Button */}
          <button
            onClick={() => onEditDetails(todo.id)}
            className={`p-2 rounded transition-all ${
              darkMode
                ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-500/10'
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title="Ver detalles"
          >
            <AlignLeft size={18} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(todo.id)}
            className={`p-2 rounded transition-all ${
              darkMode
                ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'
                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
            }`}
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItemMejorado;
