import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>🍽️</span>
          <h2>Cocina Chilena</h2>
        </div>
        <div className="navbar-links">
          <span className="badge">Menú Digital</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar