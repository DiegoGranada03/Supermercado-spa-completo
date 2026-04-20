import { useEffect, useState } from "react";
import { getSales, createSale, deleteSale } from "../../services/saleService";
import { getProducts } from "../../services/productService";
import { getUsers } from "../../services/userService";

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const salesRes = await getSales();
    const prodRes = await getProducts();
    const userRes = await getUsers();

    setSales(salesRes.data);
    setProducts(prodRes.data);
    setUsers(userRes.data);
  };

  const handleCreate = async () => {
    const product = products.find(p => p.id === Number(productId));

    await createSale({
      productId,
      userId,
      quantity,
      total: product.price * quantity
    });

    setProductId("");
    setUserId("");
    setQuantity("");

    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteSale(id);
    fetchData();
  };

  return (
    <div>
      <h2>Ventas 🧾</h2>

      <div className="mb-3">
        <select
          className="form-control mb-2"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Seleccionar Producto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          className="form-control mb-2"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Seleccionar Usuario</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Cantidad"
          className="form-control mb-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="btn btn-success" onClick={handleCreate}>
          Registrar Venta
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Usuario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sales.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.Product?.name}</td>
              <td>{s.User?.name}</td>
              <td>{s.quantity}</td>
              <td>{s.total}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}
                >
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

export default SalesPage;