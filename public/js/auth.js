// ================================
// 🔐 كود إدارة جلسة المستخدم (Auth)
// ================================

// جلب التوكن من LocalStorage
export function getToken() {
    return localStorage.getItem("token");
}

// حفظ التوكن بعد تسجيل الدخول
export function saveToken(token) {
    localStorage.setItem("token", token);
}

// حذف التوكن (تسجيل خروج)
export function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// حماية الصفحات
export function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = "login.html";
    }
    return token;
}
