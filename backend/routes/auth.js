const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Adresse email invalide." });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
  }

  try {
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "Compte créé avec succès." });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe obligatoires." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    const ok = user && (await bcrypt.compare(password, user.password));
    if (!ok) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Connexion réussie.",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

module.exports = router;
