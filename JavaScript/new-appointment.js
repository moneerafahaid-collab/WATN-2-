const API = "http://localhost:5000/api/appointments";

document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    user_id: Number(document.getElementById("userId").value),
    appointment_type: document.getElementById("type").value,
    appointment_datetime: new Date(document.getElementById("date").value),
    location: document.getElementById("location").value
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    document.getElementById("result").innerHTML =
      `<span class="text-green-600 font-bold">تم حجز الموعد بنجاح ✔</span>`;

    console.log("تم الحجز:", data);

  } catch (err) {
    document.getElementById("result").innerHTML =
      `<span class="text-red-600">حدث خطأ أثناء الحجز ❌</span>`;
  }
});
