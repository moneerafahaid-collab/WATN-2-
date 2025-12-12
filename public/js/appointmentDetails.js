// ================================
//    الحصول على ID من الرابط
// ================================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ================================
//       تحميل تفاصيل الموعد
// ================================
async function loadDetails() {
    try {
        const res = await fetch(`/api/appointments/search/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        const app = data[0];

        document.getElementById("type").textContent = `📌 ${app.appointment_type}`;
        document.getElementById("date").textContent = `📅 ${new Date(app.appointment_datetime).toLocaleString("ar-SA")}`;
        document.getElementById("location").textContent = `📍 ${app.location}`;
    } catch (err) {
        alert("خطأ في تحميل الموعد");
    }
}

loadDetails();

// ================================
//         حذف الموعد
// ================================
document.getElementById("deleteBtn").addEventListener("click", async () => {
    if (!confirm("هل أنت متأكد من حذف الموعد؟")) return;

    const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    alert("تم حذف الموعد بنجاح");
    window.location.href = "index.html";
});
