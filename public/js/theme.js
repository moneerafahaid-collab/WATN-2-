// قراءة الوضع من المتصفح
let theme = localStorage.getItem("theme") || "light";

// تطبيق الوضع الحالي
applyTheme(theme);

function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
}

function applyTheme(mode) {
    if (mode === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}
