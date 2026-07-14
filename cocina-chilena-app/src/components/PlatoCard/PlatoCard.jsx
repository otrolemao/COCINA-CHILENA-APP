import { useState } from 'react'
import './PlatoCard.css'

function PlatoCard({ plato, onEditar, onToggle, onEliminar }) {
  const [editando, setEditando] = useState(false)
  const [nuevoPrecio, setNuevoPrecio] = useState(plato.precio)

  const handleEditar = () => {
    if (editando) {
      const exito = onEditar(plato.idMeal, nuevoPrecio)
      if (exito !== false) {
        setEditando(false)
      }
    } else {
      setEditando(true)
      setNuevoPrecio(plato.precio)
    }
  }

  const claseCard = `plato-card ${!plato.disponible ? 'no-disponible' : ''}`

  return (
    <div className={claseCard}>
      <div className="plato-imagen">
        <img src={plato.strMealThumb} alt={plato.strMeal} />
        <div className="plato-estado">
          <span className={`estado-badge ${plato.disponible ? 'disponible' : 'agotado'}`}>
            {plato.disponible ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      </div>

      <div className="plato-info">
        <h3>{plato.strMeal}</h3>

        <div className="plato-precio">
          {editando ? (
            <div className="editar-precio">
              <input
                type="number"
                value={nuevoPrecio}
                onChange={(e) => setNuevoPrecio(e.target.value)}
                min="0"
                step="100"
                className="input-precio"
              />
              <span>CLP</span>
            </div>
          ) : (
            <p className="precio">${plato.precio.toLocaleString()} CLP</p>
          )}
        </div>

        <div className="plato-acciones">
          <button className="btn-editar" onClick={handleEditar}>
            {editando ? 'Guardar' : 'Editar Precio'}
          </button>

          <button
            className={`btn-toggle ${plato.disponible ? 'btn-disponible' : 'btn-agotado'}`}
            onClick={() => onToggle(plato.idMeal)}
          >
            {plato.disponible ? 'Marcar Agotado' : 'Marcar Disponible'}
          </button>

          <button className="btn-eliminar" onClick={() => onEliminar(plato.idMeal)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlatoCard