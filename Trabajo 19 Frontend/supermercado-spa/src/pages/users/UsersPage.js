import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleCreate = async () => {
    await createUser({ name, email, role: "cliente" });
    setName("");
    setEmail("");
    fetchUsers();
  };

  const handleEdit = (u) => {
    setName(u.name);
    setEmail(u.email);
    setEditingId(u.id);
  };

  const handleUpdate = async () => {
    await updateUser(editingId, { name, email, role: "cliente" });
    setEditingId(null);
    setName("");
    setEmail("");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h2>Usuarios 👤</h2>

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editingId ? (
        <button className="btn btn-warning" onClick={handleUpdate}>
          Actualizar
        </button>
      ) : (
        <button className="btn btn-success" onClick={handleCreate}>
          Crear
        </button>
      )}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;