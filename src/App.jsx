import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import Main from './pages/Main'
import { authService } from './services'

/**
 * Componente principal de la aplicación.
 * Gestiona la autenticación y renderiza Login o Main según el estado.
 * @returns {JSX.Element}
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated())
  const [userData, setUserData] = useState(() => authService.getCurrentUser())
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = () => {
      const isAuth = authService.isAuthenticated()
      const storedUser = authService.getCurrentUser()
      
      if (isAuth && storedUser) {
        setIsAuthenticated(true)
        setUserData(storedUser)
      } else {
        setIsAuthenticated(false)
        setUserData(null)
      }
      setLoading(false)
    }

    checkSession()
  }, [])

  /** @param {Object} loginData - Credenciales del usuario */
  const handleLogin = async (loginData) => {
    try {
      setError(null)
      const response = await authService.login(loginData.nombreUsuario, loginData.clave)
      
      if (response) {
        setUserData(response)
        setIsAuthenticated(true)
      } else {
        throw new Error('No se recibieron datos del usuario')
      }
    } catch (error) {
      setError(error.message || 'Usuario o contraseña incorrectos')
      setIsAuthenticated(false)
    }
  }

  /** Cierra la sesión del usuario actual */
  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsAuthenticated(false)
      setUserData(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="app loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <Main userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} error={error} />
      )}
    </div>
  )
}

export default App
