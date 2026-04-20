const cors = require("cors");
const express = require("express");
const sequelize = require("./config/database");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const providerRoutes = require("./routes/providerRoutes");

const Product = require("./models/Product");
const Provider = require("./models/Provider");

const Sale = require("./models/Sale");
const User = require("./models/User");

const saleRoutes = require("./routes/saleRoutes");

// RELACION
Provider.hasMany(Product, { foreignKey: "providerId" });
Product.belongsTo(Provider, { foreignKey: "providerId" });

Sale.belongsTo(User, { foreignKey: "userId" });
Sale.belongsTo(Product, { foreignKey: "productId" });

const app = express();
app.use(cors());


app.use(express.json());

app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/providers", providerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada");

   const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
  })
  .catch((err) => {
    console.error("Error", err);
  });