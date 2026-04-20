const Provider = require("../models/Provider");

// Obtener todos
exports.getAll = async (req, res) => {
  try {
    const data = await Provider.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Obtener uno por ID
exports.getById = async (req, res) => {
  try {
    const data = await Provider.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear
exports.create = async (req, res) => {
  try {
    const data = await Provider.create(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await provider.update(req.body);

    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
exports.delete = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await provider.destroy();

    res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};