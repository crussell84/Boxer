const username = $("#username");
const password = $("#password");
const createAccountButton = $("#createAccountButton");

const newUserInfo = {
    username: username.val().trim(),
    password: password.val().trim()
}

$.post("/")