const Product = require("../models/Product");

// GET TODOS
const Provider = require("../models/Provider");

exports.getAll = async (req, res) => {
  const products = await Product.findAll({
    include: Provider,
  });
  res.json(products);
};

// GET POR ID
exports.getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
};

// CREATE
exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// UPDATE
exports.update = async (req, res) => {
  await Product.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({ message: "Updated" });
};

// DELETE
exports.delete = async (req, res) => {
  await Product.destroy({
    where: { id: req.params.id },
  });
  res.json({ message: "Deleted" });
};