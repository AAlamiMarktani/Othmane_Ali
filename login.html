const API_URL = "http://localhost:5000/api/auth/login";

const form = document.getElementById("loginForm");
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

  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    return showMessage("Email et mot de passe obligatoires.", "error");
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Connexion…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Une erreur est survenue.");

    showMessage("Connexion réussie.", "ok");
    form.reset();
  } catch (err) {
    showMessage(err.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Se connecter";
  }
});