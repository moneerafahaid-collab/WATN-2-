// =============================
//   جلب التوكن من LocalStorage
// =============================
const token = localStorage.getItem("token");

if (!token) {
    // المستخدم غير مسجل دخول → رجّعه للصفحة
    window.location.href = "login.html";
}

// =============================
//   تحميل المواعيد عند فتح الصفحة
// =============================
document.addEventListener("DOMContentLoaded", loadAppointments);

async function loadAppointments() {
    const container = document.getElementById("appointmentsContainer");
    container.innerHTML = "جاري التحميل...";

    try {
        const res = await fetch("/api/appointments/user/1", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!data.length) {
            container.innerHTML = `
                <p class="text-gray-500">لا يوجد مواعيد حالياً</p>
            `;
            return;
        }

        // ================================
        //   بناء HTML لعرض جميع المواعيد
        // ================================
        container.innerHTML = data.map(app => {
            const date = new Date(app.appointment_datetime);

            return `
                <div onclick="window.location.href='appointment.html?id=${app._id}'"
                     class="bg-green-50 border border-green-200 p-3 rounded-lg mb-3 shadow cursor-pointer hover:bg-green-100 transition">
                    <p class="font-bold text-green-700 text-lg">${app.appointment_type}</p>
                    <p class="text-gray-600">📅 ${date.toLocaleString("ar-SA")}</p>
                </div>
            `;
        }).join("");

    } catch (err) {
        container.innerHTML = `<p class="text-red-600 font-bold">خطأ في تحميل البيانات</p>`;
    }
}
