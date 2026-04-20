import { useEffect, useState } from "react";
import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../../services/providerService";

function ProvidersPage() {
  const [providers, setProviders] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await getProviders();
      setProviders(res.data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const handleCreate = async () => {
    if (!name || !phone || !email || !city) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await createProvider({ name, phone, email, city });

      setName("");
      setPhone("");
      setEmail("");
      setCity("");

      fetchProviders();
    } catch (error) {
      console.error("Error al crear proveedor:", error);
    }
  };

  const handleEdit = (p) => {
    setName(p.name);
    setPhone(p.phone);
    setEmail(p.email);
    setCity(p.city);
    setEditingId(p.id);
  };

  const handleUpdate = async () => {
    try {
      await updateProvider(editingId, {
        name,
        phone,
        email,
        city,
      });

      setEditingId(null);
      setName("");
      setPhone("");
      setEmail("");
      setCity("");

      fetchProviders();
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar proveedor?")) return;

    try {
      await deleteProvider(id);
      fetchProviders();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
    }
  };

  return (
    <div>
      <h2>Proveedores 🏭</h2>

      {/* FORMULARIO */}
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {editingId ? (
          <button className="btn btn-warning" onClick={handleUpdate}>
            Actualizar Proveedor
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleCreate}>
            Crear Proveedor
          </button>
        )}
      </div>

      {/* TABLA */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {providers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay proveedores
              </td>
            </tr>
          ) : (
            providers.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.email}</td>
                <td>{p.city}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProvidersPage;