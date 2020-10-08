function checkCookie() {
    if (document.cookie) {
        const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
        if (jwt) {
            const logout = document.querySelector("#login");
            logout.innerText= 'Logout';
            logout.href='/auth/logout';
            const profile = document.querySelector("#signup");
            profile.innerText = 'Profile';
            profile.href="/profile";
    }}
}

checkCookie();
