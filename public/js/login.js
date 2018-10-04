// $(document).ready(function() {
//     const newAccountForm = $("form.newAccount");
//     const usernameInput = $("input#username");
//     const passwordInput = $("input#passport");

//     const resetForm = () => {
//         usernameInput.val("");
//         passwordInput.val("");
//     }

//     const signUp = (username, password) => {
//         $.post("/api/signup", {
//             username: username,
//             password: password
//         }).then((data) => {
//             window.location.replace(data);
//         }).catch((err) => {
//             console.log(`Error: ${err}`);
//         })
//     }

//     newAccountForm.on("submit", (event) => {
//         event.preventDefault();

//         const userData = {
//             username: usernameInput.val().trim(),
//             password: passwordInput.val().trim()
//         };

//         if(!userData.username || !userData.password) {
//             return
//         }

//         signUp(userData.username, userData.password);
//         resetForm();
//     })
// })