import { Routes, Route } from "react-router-dom";

import ProductsPage from "../pages/products/ProductsPage";
import UsersPage from "../pages/users/UsersPage";
import ProvidersPage from "../pages/providers/ProvidersPage";
import SalesPage from "../pages/sales/SalesPage";


function Home() {
  return (
    <div className="mt-4 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
        
        <h3 className="text-center mb-3">
          📄 Proyecto Final
        </h3>

        <hr />

        <h4 className="text-center">Supermercado App 🛒</h4>

        <p className="text-center text-muted">
          Sistema de gestión de productos y ventas
        </p>

        <hr />

        <p><strong>👨‍💻 Presentado por:</strong><br />
        Diego Alejandro Granada</p>

        <p><strong>🏫 Universidad:</strong><br />
        Universidad de Manizales</p>

        <p><strong>👩‍🏫 Docente:</strong><br />
        Natalia Marcela Castellanos</p>

        <p><strong>📚 Materia:</strong><br />
        Programación IV</p>

        <p><strong>📅 Fecha:</strong><br />
        19/04/2026</p>

      </div>
    </div>
  );
}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/sales" element={<SalesPage />} />
    </Routes>
  );
}

export default AppRoutes;