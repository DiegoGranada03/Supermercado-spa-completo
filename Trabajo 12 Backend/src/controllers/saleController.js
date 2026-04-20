const Sale = require("../models/Sale");

exports.getAll = async (req, res) => {
  const data = await Sale.findAll({ include: ["User", "Product"] });
  res.json(data);
};

exports.create = async (req, res) => {
  try {
    const { userId, productId, quantity, total } = req.body;

    const data = await Sale.create({
      userId,
      productId,
      quantity,
      total
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear venta" });
  }
};

exports.delete = async (req, res) => {
  await Sale.destroy({ where: { id: req.params.id } });
  res.json({ message: "Venta eliminada" });
};