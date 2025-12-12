// =============================
// 🔗 API CONFIG
// =============================
const API = "http://localhost:5000/api";

// =============================
// 📌 تحميل عدد المواعيد
// =============================
async function loadAppointmentsCount() {
    try {
        const res = await fetch(`${API}/appointments`);
        const data = await res.json();
        document.getElementById("appointmentsCount").textContent = data.length;

        // عرض المواعيد القادمة
        const container = document.getElementById("upcomingList");
        if (data.length === 0) {
            container.textContent = "لا توجد مواعيد قادمة";
            return;
        }

        container.innerHTML = data.map(app => `
            <div class="p-3 bg-green-50 border border-green-300 rounded-lg mb-2">
                <div><strong>الخدمة:</strong> ${app.appointment_type}</div>
                <div><strong>التاريخ:</strong> ${new Date(app.appointment_datetime).toLocaleString("ar-SA")}</div>
            </div>
        `).join("");

    } catch (err) {
        console.error(err);
    }
}

// =============================
// 📌 تحميل التنبيهات (ثابتة الآن)
// =============================
function loadNotifications() {
    document.getElementById("notificationsCount").textContent = 3; // مثال فقط
}

// =============================
// 📌 تحميل الخدمات (بشكل ثابت الآن)
// =============================
function loadServices() {
    const services = [
        { icon: "🧾", title: "تجديد الهوية الوطنية", time: "5-7 أيام" },
        { icon: "🚗", title: "تجديد رخصة القيادة", time: "24 ساعة" },
        { icon: "✈️", title: "خدمات الجوازات", time: "3-5 أيام" },
        { icon: "🏥", title: "الخدمات الصحية", time: "فوري" },
        { icon: "📚", title: "الخدمات التعليمية", time: "1-2 يوم" },
        { icon: "🏡", title: "الخدمات العقارية", time: "5-7 أيام" }
    ];

    const grid = document.getElementById("servicesGrid");

    grid.innerHTML = services.map(s => `
        <div class="bg-white rounded-xl p-6 shadow-md border border-green-600 text-center hover:bg-green-50 cursor-pointer">
            <div class="text-5xl mb-2">${s.icon}</div>
            <h4 class="text-xl font-bold text-green-700">${s.title}</h4>
            <p class="text-gray-600 text-sm">${s.time}</p>
        </div>
    `).join("");
}

// =============================
// 🚀 تشغيل جميع الدوال عند فتح الصفحة
// =============================
loadAppointmentsCount();
loadNotifications();
loadServices();
