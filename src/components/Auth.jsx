import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, LogOut } from 'lucide-react';

export function Auth({ darkMode = false }) {
  const { signIn, signUp, signOut, user, error: authError } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          throw new Error(error.message || 'Error en el registro');
        }
        setSuccess('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.');
        setEmail('');
        setPassword('');
        setTimeout(() => setIsSignUp(false), 2000);
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          throw new Error(error.message || 'Error al iniciar sesión');
        }
        setSuccess('¡Sesión iniciada exitosamente!');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Si el usuario está autenticado, mostrar botón de logout
  if (user) {
    return (
      <div className={`${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } min-h-screen flex items-center justify-center p-4`}>
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } p-8 rounded-lg shadow-lg max-w-md w-full`}>
          <div className="text-center mb-6">
            <p className={`text-lg font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Bienvenido 👋
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } mt-2`}>
              {user.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    } min-h-screen flex items-center justify-center p-4 transition-colors`}>
      <div className={`${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } p-8 rounded-lg shadow-lg w-full max-w-md transition-colors`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {isSignUp ? '📝 Registrarse' : '🔐 Iniciar Sesión'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <Mail size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${
                  darkMode
                    ? 'text-white placeholder-gray-500'
                    : 'text-gray-800 placeholder-gray-400'
                }`}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Contraseña
            </label>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <Lock size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${
                  darkMode
                    ? 'text-white placeholder-gray-500'
                    : 'text-gray-800 placeholder-gray-400'
                }`}
                placeholder="Mínimo 6 caracteres"
                required
                minLength="6"
              />
            </div>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error || authError}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading 
              ? 'Cargando...' 
              : isSignUp 
                ? 'Registrarse' 
                : 'Iniciar Sesión'
            }
          </button>
        </form>

        {/* Toggle Between Login/SignUp */}
        <p className={`mt-6 text-center text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
              setEmail('');
              setPassword('');
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            {isSignUp ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>

        {/* Info */}
        <div className={`mt-6 p-4 rounded-lg text-xs ${
          darkMode
            ? 'bg-gray-700 text-gray-300'
            : 'bg-gray-100 text-gray-600'
        }`}>
          <p className="font-medium mb-2">💡 Demo:</p>
          <p>Email: demo@example.com</p>
          <p>Contraseña: demo123</p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
