$(document).ready(function () {
    const loginForm = $("form.login");
    const usernameInput = $("input#username");
    const passwordInput = $("input#password");

    const resetForm = () => {
        usernameInput.val("");
        passwordInput.val("");
    }

    const loginUser = (username, password) => {
        $.post("/api/login", {
            username: username,
            password: password
        }).then((data) => {
            console.log(data);
            window.location.replace(data);
        }).catch((err) => {
            console.log(`Error: ${err}`)
        })
    }

    loginForm.on("submit", (event) => {
        event.preventDefault();

        const userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.password) {
            return;
        }

        loginUser(userData.username, userData.password);
        resetForm();
    });
})