const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

// جلب عدد المواعيد لعرضها في الحساب
async function loadAppointmentCount() {
  const res = await fetch("/api/appointments/user/1", {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await res.json();
  document.getElementById("count").textContent = data.length;
}

loadAppointmentCount();

// تسجيل الخروج
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
