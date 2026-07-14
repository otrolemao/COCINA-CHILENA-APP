import { useState, useEffect, useCallback } from 'react'
import { getPlatosChilenos } from './services/api'
import Navbar from './components/Navbar/Navbar'
import MenuPizarra from './components/menuPizarra/MenuPizarra'
import './App.css'

function App() {
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('cocina_chilena_menu')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error cargando persistencia:', error)
      return []
    }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    localStorage.setItem('cocina_chilena_menu', JSON.stringify(menu))
  }, [menu])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPlatosChilenos()
      if (data.length > 0 && menu.length === 0) {
        setMenu(data)
      }
    } catch (err) {
      setError(err.message || 'Ocurrio un error inesperado')
    } finally {
      setLoading(false)
    }
  }, [menu.length])

  useEffect(() => {
    loadData()
  }, [loadData])

  const agregarPlato = (nuevoPlato) => {
    const precioNumero = Number(nuevoPlato.precio)
    if (Number.isNaN(precioNumero) || precioNumero < 0) {
      alert('Precio invalido. Ingrese un numero valido mayor o igual a 0')
      return false
    }
    setMenu([...menu, { ...nuevoPlato, precio: precioNumero }])
    return true
  }

  const editarPrecio = (idMeal, nuevoPrecio) => {
    const precioNumero = Number(nuevoPrecio)
    if (Number.isNaN(precioNumero) || precioNumero < 0) {
      alert('Precio invalido. Ingrese un numero valido mayor o igual a 0')
      return false
    }
    setMenu(menu.map((plato) =>
      plato.idMeal === idMeal ? { ...plato, precio: precioNumero } : plato
    ))
    return true
  }

  const toggleDisponible = (idMeal) => {
    setMenu(menu.map((plato) =>
      plato.idMeal === idMeal ? { ...plato, disponible: !plato.disponible } : plato
    ))
  }

  const eliminarPlato = (idMeal) => {
    if (confirm('¿Seguro que deseas eliminar este plato?')) {
      setMenu(menu.filter((plato) => plato.idMeal !== idMeal))
    }
  }

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <h1>Cocina Chilena</h1>
        <p className="subtitulo">Administrador de Menu</p>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando platos chilenos...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>Error: {error}</p>
            <button className="btn-retry" onClick={loadData}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <MenuPizarra
            menu={menu}
            onAgregar={agregarPlato}
            onEditar={editarPrecio}
            onToggle={toggleDisponible}
            onEliminar={eliminarPlato}
          />
        )}
      </main>
    </div>
  )
}

export default App