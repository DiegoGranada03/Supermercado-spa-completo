import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import logo from "./Logo/logo-umanizales.png";




function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <div className="bg-dark text-white p-3 rounded mb-4 shadow">
          <div className="position-relative text-center">
            <img
              src={logo}
              alt="logo"
              width="50"
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)"
              }}
            />
            <h1 className="mb-0">🛒 Supermercado App</h1>
            <p className="mb-0">
              Sistema de gestión de productos y ventas
            </p>
            <img
              src={logo}
              alt="logo"
              width="50"
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)"
              }}
            />

          </div>
        </div>
        <nav className="mb-4 text-center">
          <Link className="btn btn-outline-primary me-2" to="/">Inicio</Link>
          <Link className="btn btn-outline-secondary me-2" to="/products">Productos</Link>
          <Link className="btn btn-outline-success me-2" to="/users">Usuarios</Link>
          <Link className="btn btn-outline-warning me-2" to="/providers">Proveedores</Link>
          <Link className="btn btn-outline-danger" to="/sales">Ventas</Link>
        </nav>
        <AppRoutes />

      </div>
    </BrowserRouter>
  );
}

export default App;