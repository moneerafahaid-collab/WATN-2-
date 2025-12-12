const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

// قراءة ID من رابط الصفحة
const params = new URLSearchParams(window.location.search);
const appointmentId = params.get("id");

// تحميل بيانات الموعد القديم
async function loadAppointment() {
    const res = await fetch(`/api/appointments/${appointmentId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();

    // تعبئة الحقول
    document.getElementById("appointmentType").value = data.appointment_type;

    const dateObj = new Date(data.appointment_datetime);
    document.getElementById("date").value = dateObj.toISOString().slice(0, 10);
    document.getElementById("time").value = dateObj.toTimeString().slice(0, 5);
}

loadAppointment();

// حفظ التعديلات
async function saveAppointment() {
    const type = document.getElementById("appointmentType").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const newDate = new Date(`${date}T${time}`);

    const body = {
        appointment_type: type,
        appointment_datetime: newDate
    };

    const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();

    const msg = document.getElementById("result");
    msg.textContent = "✅ تم تحديث الموعد بنجاح!";
    msg.className = "text-green-700 font-bold text-center mt-3";

    setTimeout(() => {
        window.location.href = "appointment.html?id=" + appointmentId;
    }, 1000);
}
