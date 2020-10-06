function checkCookie() {
    if (document.cookie) {
        const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
        if (jwt) {
            const logout = document.querySelector("#login");
            logout.innerText= 'Logout';
            logout.href='#';
            const profile = document.querySelector("#signup");
            profile.innerText = 'Profile';
            profile.href="/profile";
            logout.addEventListener('click', removeCookie);
    }}
}

function removeCookie() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1900 00:00:00 UTC; path=/;";
    const login = document.querySelector("#login");
    login.innerText= 'Login';
    const signup = document.querySelector("#signup");
    signup.innerText = 'Signup';
    signup.href="/auth/signup";
    login.removeEventListener('click', removeCookie);
    login.href='/auth/login';
}
checkCookie();
