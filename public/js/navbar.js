// ==============================
//      NAVBAR ثابت أسفل الشاشة
// ==============================
document.body.insertAdjacentHTML("beforeend", `
  <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t dark:border-gray-700 flex justify-around py-2 text-center">

    <a href="index.html" class="text-green-700 dark:text-green-300 flex flex-col items-center">
      <span class="text-2xl">🏠</span>
      <span class="text-sm font-bold">الرئيسية</span>
    </a>

    <a href="services.html" class="text-green-700 dark:text-green-300 flex flex-col items-center">
      <span class="text-2xl">🛠️</span>
      <span class="text-sm font-bold">الخدمات</span>
    </a>

    <a href="notifications.html" class="text-green-700 dark:text-green-300 flex flex-col items-center">
      <span class="text-2xl">🔔</span>
      <span class="text-sm font-bold">التنبيهات</span>
    </a>

    <a href="profile.html" class="text-green-700 dark:text-green-300 flex flex-col items-center">
      <span class="text-2xl">👤</span>
      <span class="text-sm font-bold">الحساب</span>
    </a>

    <!-- زر الوضع الليلي -->
    <div onclick="toggleTheme()" class="text-green-700 dark:text-green-300 flex flex-col items-center cursor-pointer">
      <span class="text-2xl">🌓</span>
      <span class="text-sm font-bold">الوضع</span>
    </div>

  </nav>
`);
