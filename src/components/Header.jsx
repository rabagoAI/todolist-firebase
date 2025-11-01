import { Search, Settings, HelpCircle, Share2, User } from 'lucide-react';

function Header({ darkMode, searchValue, setSearchValue }) {
  return (
    <header className={`${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-b shadow-sm transition-colors sticky top-0 z-10`}>
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-gray-800 border border-gray-700 focus-within:border-primary'
              : 'bg-gray-100 border border-gray-200 focus-within:border-primary'
          }`}>
            <Search size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm ${
                darkMode
                  ? 'text-white placeholder-gray-500'
                  : 'text-gray-800 placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-6">
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <HelpCircle size={20} />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <Share2 size={20} />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <Settings size={20} />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
