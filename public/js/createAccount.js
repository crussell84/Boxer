$(document).ready(() => {
    const newAccountForm = $("form.newAccount");
    const usernameInput = $("input#username");
    const passwordInput = $("input#password");
    const confirmPasswordInput = $("input#lblPasswordConfirm");

    const resetForm = () => {
        usernameInput.val("");
        passwordInput.val("");
        confirmPasswordInput.val("");
    }

    const signUp = (username, password) => {
        console.log(`User: ${username} Pass: ${password}`)
        $.post("/api/signup", {
            username: username,
            password: password
        }).then((data) => {
            $.post("/api/login", {
                username: username,
                password: password
            }).then((data) => {
                window.location.replace(data);
            }).catch((err) => {
                console.log(`Error: ${err}`)
            })
        }).catch((err) => {
            console.log("Error:", err);
        });       
    }

    newAccountForm.on("submit", (event) => {
        event.preventDefault();

        const userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.password) {
            return
        }

        signUp(userData.username, userData.password);
        resetForm();
    })
})