const API_URL = "http://localhost:5000/api/auth/register";

const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "msg " + type;
  message.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.hidden = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirm = form.confirm.value;

  if (!name || !email || !password) {
    return showMessage("Tous les champs sont obligatoires.", "error");
  }
  if (password.length < 6) {
    return showMessage("Le mot de passe doit contenir au moins 6 caractères.", "error");
  }
  if (password !== confirm) {
    return showMessage("Les mots de passe ne correspondent pas.", "error");
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Création en cours…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Une erreur est survenue.");

    showMessage("Compte créé. Vous pouvez maintenant vous connecter.", "ok");
    form.reset();
  } catch (err) {
    showMessage(err.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Créer mon compte";
  }
});
