const token = localStorage.getItem("token");

// لو ما سجل دخول → رجعه login
if (!token) window.location.href = "login.html";

document.addEventListener("DOMContentLoaded", () => {
    loadAISuggestion();
    loadNotifications();
});

// ===============================
// 🔥 1) جلب اقتراح الذكاء الاصطناعي
// ===============================
async function loadAISuggestion() {
    const box = document.getElementById("aiBox");

    try {
        const res = await fetch("/api/appointments/ai/suggest/1", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();

        box.innerHTML = `
            <h3 class="text-lg font-bold text-green-700 mb-2">اقتراح ذكي</h3>
            <p class="text-gray-700">${data.suggestion}</p>
        `;
    } catch (err) {
        box.innerHTML = `<p class="text-red-700">تعذّر جلب اقتراح الذكاء</p>`;
    }
}

// ===============================
// 🔔 2) جلب التنبيهات (المواعيد القريبة)
// ===============================
async function loadNotifications() {
    const container = document.getElementById("notificationsContainer");

    try {
        const res = await fetch("/api/appointments/user/1", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();

        if (data.length === 0) {
            container.innerHTML = `<p class="text-gray-500">لا توجد مواعيد قريبة</p>`;
            return;
        }

        container.innerHTML = data.map(app => {
            const date = new Date(app.appointment_datetime);
            const diffHours = (date - new Date()) / 1000 / 3600;

            let alertText = "";
            let alertColor = "";

            if (diffHours <= 24 && diffHours > 0) {
                alertText = "⏰ موعدك غداً";
                alertColor = "text-orange-600";
            } else if (diffHours <= 1 && diffHours > 0) {
                alertText = "🚨 موعدك خلال ساعة!";
                alertColor = "text-red-600";
            } else if (diffHours < 0) {
                alertText = "✔️ موعد سابق";
                alertColor = "text-gray-500";
            } else {
                alertText = "📅 موعد قادم";
                alertColor = "text-green-600";
            }

            return `
                <div class="bg-gray-50 border p-4 rounded-xl shadow">
                    <p class="font-bold text-green-700 text-lg">${app.appointment_type}</p>
                    <p class="text-gray-600">${date.toLocaleString("ar-SA")}</p>
                    <p class="font-bold ${alertColor} mt-2">${alertText}</p>
                </div>
            `;
        }).join("");

    } catch (err) {
        container.innerHTML = `<p class="text-red-700 font-bold">فشل تحميل التنبيهات</p>`;
    }
}
