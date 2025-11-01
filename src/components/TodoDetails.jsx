import { X, Calendar, FileText, Star, Clock } from 'lucide-react';

function TodoDetails({ 
  todo, 
  onClose, 
  onUpdate, 
  darkMode 
}) {
  if (!todo) return null;

  const handleDueDateChange = (newDate) => {
    onUpdate(todo.id, { ...todo, dueDate: newDate });
  };

  const handleNotesChange = (newNotes) => {
    onUpdate(todo.id, { ...todo, notes: newNotes });
  };

  const handleImportantToggle = () => {
    onUpdate(todo.id, { ...todo, important: !todo.important });
  };

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg shadow-lg transition-colors w-full sm:w-80`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Detalles de la tarea
        </h3>
        <button
          onClick={onClose}
          className={`p-1 rounded transition-colors ${
            darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Task Title */}
        <div>
          <p className={`text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Tarea
          </p>
          <p className={`px-3 py-2 rounded-lg ${
            darkMode
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {todo.text}
          </p>
        </div>

        {/* Due Date */}
        <div>
          <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Calendar size={16} />
            Fecha de vencimiento
          </label>
          <input
            type="date"
            value={todo.dueDate || ''}
            onChange={(e) => handleDueDateChange(e.target.value || null)}
            className={`w-full px-3 py-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-700 border border-gray-600 text-white'
                : 'bg-gray-100 border border-gray-300 text-gray-800'
            }`}
          />
        </div>

        {/* Notes */}
        <div>
          <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <FileText size={16} />
            Notas
          </label>
          <textarea
            value={todo.notes || ''}
            onChange={(e) => handleNotesChange(e.target.value || null)}
            placeholder="Agrega notas..."
            rows="3"
            className={`w-full px-3 py-2 rounded-lg transition-colors resize-none ${
              darkMode
                ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-500'
                : 'bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Important Toggle */}
        <button
          onClick={handleImportantToggle}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${
            todo.important
              ? 'bg-yellow-100 text-yellow-700'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Star size={18} fill={todo.important ? 'currentColor' : 'none'} />
          {todo.important ? '⭐ Marcado como importante' : 'Marcar como importante'}
        </button>

        {/* Created Date */}
        <div className={`flex items-center gap-2 p-3 rounded-lg text-xs ${
          darkMode
            ? 'bg-gray-700 text-gray-400'
            : 'bg-gray-100 text-gray-500'
        }`}>
          <Clock size={14} />
          <span>
            Creado: {new Date(todo.createdAt).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodoDetails;
