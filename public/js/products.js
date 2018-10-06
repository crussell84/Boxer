$(document).ready(function () {
    const getProductData = (userData) => {
        $.get(`/api/products/${userData.id}`).then((data) => {
            console.log(`Products Data:`, data);
        });
    }

    const getUserData = () => {
        $.get("/api/users/data").then((data) => {
            console.log(`User Data:`, data)
            // data conatins data.username and data.id
            // Add all of the dynamic stuff you need with the user in here (including grabbing a reference to the id)
            $("#user-name").text(data.username);
            getProductData(data);
        });
    }
    
    getUserData();
});