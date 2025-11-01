import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TabsView from './components/TabsView';
import TodoFormMejorado from './components/TodoFormMejorado';
import TodoListMejorado from './components/TodoListMejorado';
import TodoDetails from './components/TodoDetails';
import { db } from './lib/firebaseClient';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { Menu, X } from 'lucide-react';
import './index.css';

function App() {
  const { user, loading } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState('tareas');
  const [viewMode, setViewMode] = useState('list');
  const [searchValue, setSearchValue] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cargar tareas desde Firebase
  useEffect(() => {
    if (!user) {
      setDbLoading(false);
      return;
    }

    try {
      setDbLoading(true);
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosData = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          todosData.push({
            id: docSnap.id,
            text: data.text,
            completed: data.completed || false,
            important: data.important || false,
            dueDate: data.dueDate || null,
            notes: data.notes || null,
            listId: data.listId || 'tareas',
            createdAt: data.createdAt?.toDate?.() || new Date(),
          });
        });
        setTodos(todosData);
        setDbLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error cargando tareas:', err);
      setDbLoading(false);
    }
  }, [user]);

  // Cargar listas desde Firebase
  useEffect(() => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'lists'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const listsData = [];
        querySnapshot.forEach((docSnap) => {
          listsData.push({
            id: docSnap.id,
            ...docSnap.data(),
          });
        });
        setLists(listsData);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error cargando listas:', err);
    }
  }, [user]);

  // Agregar nueva tarea
  const addTodo = async (text, details = {}) => {
    if (!user) return;

    try {
      let listId = activeList;
      
      if (activeList === 'importante') {
        listId = 'tareas';
        details.important = true;
      } else if (activeList === 'mi-dia') {
        listId = 'tareas';
        const today = new Date();
        details.dueDate = today.toISOString().split('T')[0];
      } else if (activeList === 'planeado') {
        listId = 'tareas';
        if (!details.dueDate) {
          const today = new Date();
          details.dueDate = today.toISOString().split('T')[0];
        }
      }

      await addDoc(collection(db, 'todos'), {
        userId: user.uid,
        text,
        completed: false,
        important: details.important || false,
        dueDate: details.dueDate || null,
        notes: details.notes || null,
        listId: listId,
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      console.error('Error agregando tarea:', err);
    }
  };

  // Eliminar tarea
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      setSelectedTodoId(null);
    } catch (err) {
      console.error('Error eliminando tarea:', err);
    }
  };

  // Completar/descompletar tarea
  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await updateDoc(doc(db, 'todos', id), {
        completed: !todo.completed,
      });
    } catch (err) {
      console.error('Error actualizando tarea:', err);
    }
  };

  // Marcar como importante
  const toggleImportant = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await updateDoc(doc(db, 'todos', id), {
        important: !todo.important,
      });
    } catch (err) {
      console.error('Error marcando como importante:', err);
    }
  };

  // Actualizar detalles de tarea
  const updateTodoDetails = async (id, updatedTodo) => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        text: updatedTodo.text,
        dueDate: updatedTodo.dueDate,
        notes: updatedTodo.notes,
        important: updatedTodo.important,
      });
    } catch (err) {
      console.error('Error actualizando detalles:', err);
    }
  };

  // Crear nueva lista
  const createList = async (name) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'lists'), {
        userId: user.uid,
        name,
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      console.error('Error creando lista:', err);
    }
  };

  // Obtener tareas filtradas
  const getFilteredTodos = () => {
    let filtered = todos.filter((todo) => {
      if (
        searchValue &&
        !todo.text.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return false;
      }

      if (activeList === 'tareas') {
        return todo.listId === activeList || todo.listId === 'tareas';
      }
      if (activeList === 'importante') {
        return todo.important;
      }
      if (activeList === 'mi-dia') {
        const today = new Date();
        const todoDate = todo.dueDate ? new Date(todo.dueDate) : null;
        return (
          todoDate && todoDate.toDateString() === today.toDateString()
        );
      }
      if (activeList === 'planeado') {
        return todo.dueDate;
      }

      return todo.listId === activeList;
    });

    return filtered;
  };

  // Obtener nombre de lista activa
  const getActiveListName = () => {
    const listNames = {
      tareas: 'Tareas',
      'mi-dia': 'Mi día',
      importante: 'Importante',
      planeado: 'Planeado',
      asignadas: 'Asignadas a mi usuario',
      correo: 'Correo electrónico marcado',
    };

    if (listNames[activeList]) return listNames[activeList];

    const customList = lists.find((l) => l.id === activeList);
    return customList ? customList.name : 'Tareas';
  };

  // Mostrar pantalla de carga
  if (loading || dbLoading) {
    return (
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className={`mt-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  // Mostrar pantalla de login si no hay usuario
  if (!user) {
    return <Auth darkMode={darkMode} />;
  }

  // App principal
  const filteredTodos = getFilteredTodos();
  const selectedTodo = todos.find((t) => t.id === selectedTodoId);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors flex flex-col md:flex-row`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 h-screen z-40 transition-transform duration-300`}
      >
        <Sidebar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeList={activeList}
          setActiveList={(list) => {
            setActiveList(list);
            setSidebarOpen(false); // Cerrar sidebar en móvil después de seleccionar
          }}
          lists={lists}
          onCreateList={createList}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-0 z-20`}>
          <div className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`md:hidden p-2 rounded transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Header Component */}
            <div className="flex-1">
              <Header
                darkMode={darkMode}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
          </div>
        </div>

        {/* Tabs View */}
        <TabsView
          darkMode={darkMode}
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeListName={getActiveListName()}
        />

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Todo Form */}
            <TodoFormMejorado
              onAddTodo={addTodo}
              darkMode={darkMode}
            />

            {/* Content Area with List and Details */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* List */}
              <div className="flex-1 min-w-0">
                <TodoListMejorado
                  todos={filteredTodos}
                  onDeleteTodo={deleteTodo}
                  onToggleTodo={toggleTodo}
                  onToggleImportant={toggleImportant}
                  onEditDetails={setSelectedTodoId}
                  darkMode={darkMode}
                />
              </div>

              {/* Details Panel - Hidden on mobile and tablet, visible on desktop */}
              {selectedTodo && (
                <div className="hidden xl:block w-80 flex-shrink-0">
                  <TodoDetails
                    todo={selectedTodo}
                    onClose={() => setSelectedTodoId(null)}
                    onUpdate={updateTodoDetails}
                    darkMode={darkMode}
                  />
                </div>
              )}
            </div>

            {/* Clear Completed */}
            {filteredTodos.some((t) => t.completed) && (
              <div className="mt-6 text-center">
                <button
                  onClick={async () => {
                    const completedIds = filteredTodos
                      .filter((t) => t.completed)
                      .map((t) => t.id);

                    for (const id of completedIds) {
                      await deleteTodo(id);
                    }
                  }}
                  className={`text-sm font-medium transition-colors ${
                    darkMode
                      ? 'text-gray-400 hover:text-red-400'
                      : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  Limpiar completadas (
                  {filteredTodos.filter((t) => t.completed).length})
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Details Panel - Modal */}
      {selectedTodo && (
        <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50">
          <div
            className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t rounded-t-2xl max-h-96 overflow-y-auto`}
          >
            <div className="p-4">
              <TodoDetails
                todo={selectedTodo}
                onClose={() => setSelectedTodoId(null)}
                onUpdate={updateTodoDetails}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;