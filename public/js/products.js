$(document).ready(function () {
    const getProductData = (userData) => {
        $.get(`/api/products/${userData.id}`).then((data) => {
            console.log(`Products Data:`, data);
            data.forEach((product) => {
                const $tableBody = $("tbody.productsTBody")
                const $tableRow = $("<tr>");
                const $nameCol = $("<td>");
                const $categoryCol = $("<td>");
                const $stockCol = $("<td>");
                const $reorderCol = $("<td>");
                const $priceCol = $("<td>");
                
                $nameCol.text(product.itemName);
                $categoryCol.text(product.category);
                $stockCol.text(product.currentQuantity);
                $reorderCol.text(product.reorderThreshold);
                $priceCol.text(product.sellPrice);

                $tableRow.append($nameCol, $categoryCol, $stockCol, $reorderCol, $priceCol);
                $tableBody.append($tableRow);
            })
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