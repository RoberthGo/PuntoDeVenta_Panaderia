import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import Main from './pages/Main'
import { authService } from './services'

function App() {
  // Inicializar estados con datos de localStorage si existen
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated())
  const [userData, setUserData] = useState(() => authService.getCurrentUser())
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar sesión al cargar la aplicación
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

  const handleLogin = async (loginData) => {
    try {
      setError(null)
      console.log('Login data received:', loginData); // Debug log
      
      const response = await authService.login(loginData.nombreUsuario, loginData.clave)
      
      if (response) {
        setUserData(response)
        setIsAuthenticated(true)
      } else {
        throw new Error('No se recibieron datos del usuario')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError(error.message || 'Usuario o contraseña incorrectos')
      setIsAuthenticated(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsAuthenticated(false)
      setUserData(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Mostrar loading mientras se verifica la sesión
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
