require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // autorise le frontend (live server, file://, autre port)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mon premier serveur MERN !");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "L'API fonctionne correctement" });
});

app.use("/api/auth", require("./routes/auth"));

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur interne du serveur." });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB est connecté");

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur MongoDB :", error.message);
    process.exit(1);
  }
}

startServer();
