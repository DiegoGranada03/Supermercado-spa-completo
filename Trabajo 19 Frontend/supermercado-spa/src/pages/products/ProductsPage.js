import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleCreate = async () => {
    if (!name || !price) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await createProduct({
        name,
        description: "Producto creado desde React",
        price: parseFloat(price),
        stock: 10,
        providerId: 1,
      });

      setName("");
      setPrice("");
      fetchProducts();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditingId(product.id);
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editingId, {
        name,
        description: "Producto actualizado",
        price: parseFloat(price),
        stock: 10,
        providerId: 1,
      });

      setName("");
      setPrice("");
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div>
      <h2>Productos 🛒</h2>

      {/* FORMULARIO */}
      <div className="card p-3 mb-4 shadow">
  <h5 className="mb-3">Formulario</h5>
        <input
          type="text"
          placeholder="Nombre"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {editingId ? (
          <button className="btn btn-warning" onClick={handleUpdate}>
            Actualizar Producto
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleCreate}>
            Guardar Producto
          </button>
        )}
      </div>

      {/* TABLA */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No hay productos
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
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

export default ProductsPage;