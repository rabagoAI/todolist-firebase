import { useState } from 'react';
import { Plus, Calendar, FileText, Star } from 'lucide-react';

function TodoFormMejorado({ onAddTodo, darkMode }) {
  const [input, setInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [important, setImportant] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input, {
        dueDate: dueDate || null,
        important,
        notes: notes || null,
      });
      setInput('');
      setDueDate('');
      setImportant(false);
      setNotes('');
      setShowAdvanced(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className={`rounded-lg shadow-md transition-colors overflow-hidden ${
        darkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
      }`}>
        {/* Main Input */}
        <div className="flex gap-2 p-4">
          <input
            type="text"
            placeholder="Agregar una nueva tarea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-base transition-colors ${
              darkMode
                ? 'text-white placeholder-gray-500'
                : 'text-gray-800 placeholder-gray-400'
            }`}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 space-y-3`}>
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agrega notas a esta tarea..."
                rows="2"
                className={`w-full px-3 py-2 rounded-lg transition-colors resize-none ${
                  darkMode
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Important Checkbox */}
            <button
              type="button"
              onClick={() => setImportant(!important)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors w-full ${
                important
                  ? 'bg-yellow-100 text-yellow-700'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star size={18} fill={important ? 'currentColor' : 'none'} />
              <span className="text-sm font-medium">
                {important ? 'Marcado como importante' : 'Marcar como importante'}
              </span>
            </button>
          </div>
        )}

        {/* Toggle Advanced Button */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`w-full px-4 py-2 transition-colors text-sm font-medium border-t ${
            darkMode
              ? 'border-gray-700 text-gray-400 hover:bg-gray-700'
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          {showAdvanced ? 'Ocultar opciones' : 'Más opciones'}
        </button>
      </div>
    </form>
  );
}

export default TodoFormMejorado;
