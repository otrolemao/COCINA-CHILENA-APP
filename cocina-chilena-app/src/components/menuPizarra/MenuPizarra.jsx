import { useState } from 'react'
import PlatoCard from '../PlatoCard/PlatoCard'
import './MenuPizarra.css'

function MenuPizarra({ menu, onAgregar, onEditar, onToggle, onEliminar }) {
  const [nuevoPlato, setNuevoPlato] = useState({
    strMeal: '',
    precio: '',
    strMealThumb: ''
  })

  const handleAgregar = (e) => {
    e.preventDefault()
    if (!nuevoPlato.strMeal.trim() || !nuevoPlato.precio) {
      alert('Complete todos los campos')
      return
    }
    const exito = onAgregar({
      idMeal: Date.now().toString(),
      strMeal: nuevoPlato.strMeal,
      strMealThumb: nuevoPlato.strMealThumb || 'https://via.placeholder.com/280x180?text=Sin+Imagen',
      precio: nuevoPlato.precio,
      disponible: true
    })
    if (exito !== false) {
      setNuevoPlato({ strMeal: '', precio: '', strMealThumb: '' })
    }
  }

  return (
    <div className="menu-pizarra">
      <div className="agregar-plato">
        <h3>Agregar Nuevo Plato</h3>
        <form onSubmit={handleAgregar} className="form-agregar">
          <input
            type="text"
            placeholder="Nombre del plato"
            value={nuevoPlato.strMeal}
            onChange={(e) => setNuevoPlato({ ...nuevoPlato, strMeal: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevoPlato.precio}
            onChange={(e) => setNuevoPlato({ ...nuevoPlato, precio: e.target.value })}
            min="0"
            step="100"
            required
          />
          <input
            type="text"
            placeholder="URL de imagen (opcional)"
            value={nuevoPlato.strMealThumb}
            onChange={(e) => setNuevoPlato({ ...nuevoPlato, strMealThumb: e.target.value })}
          />
          <button type="submit">Agregar Plato</button>
        </form>
      </div>

      <div className="platos-grid">
        {menu.length === 0 ? (
          <p className="sin-platos">No hay platos en el menú</p>
        ) : (
          menu.map((plato) => (
            <PlatoCard
              key={plato.idMeal}
              plato={plato}
              onEditar={onEditar}
              onToggle={onToggle}
              onEliminar={onEliminar}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default MenuPizarra