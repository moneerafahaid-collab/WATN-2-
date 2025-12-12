document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.message || "بيانات الدخول غير صحيحة";
      errorEl.classList.remove("hidden");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);

    window.location.href = "index.html";

  } catch (err) {
    errorEl.textContent = "خطأ في الاتصال بالخادم";
    errorEl.classList.remove("hidden");
  }
});
