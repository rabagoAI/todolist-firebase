import TodoItemMejorado from './TodoItemMejorado';
import { CheckCircle2 } from 'lucide-react';

function TodoListMejorado({ 
  todos, 
  onDeleteTodo, 
  onToggleTodo,
  onToggleImportant,
  onEditDetails,
  darkMode 
}) {
  if (todos.length === 0) {
    return (
      <div className={`text-center py-16 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } transition-colors`}>
        <CheckCircle2 size={48} className={`mx-auto mb-4 ${
          darkMode ? 'text-gray-600' : 'text-gray-300'
        }`} />
        <p className={`text-lg font-medium ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No hay tareas
        </p>
        <p className={`text-sm ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          ¡Agrega una nueva tarea para comenzar!
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 rounded-lg overflow-hidden shadow-md ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } transition-colors`}>
      {todos.map((todo, index) => (
        <TodoItemMejorado
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onToggle={onToggleTodo}
          onToggleImportant={onToggleImportant}
          onEditDetails={onEditDetails}
          darkMode={darkMode}
          isLast={index === todos.length - 1}
        />
      ))}
    </div>
  );
}

export default TodoListMejorado;
