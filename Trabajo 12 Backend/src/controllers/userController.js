const User = require("../models/User");

exports.getAll = async (req, res) => {
  const data = await User.findAll();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await User.findByPk(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await User.create(req.body);
  res.json(data);
};

exports.update = async (req, res) => {
  await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({ message: "Updated" });
};

exports.delete = async (req, res) => {
  await User.destroy({
    where: { id: req.params.id },
  });
  res.json({ message: "Deleted" });
};