$(document).ready(function () {
    const getProductData = (userData) => {
        $.get(`/api/products/${userData.id}`).then((data) => {
            console.log(`Products Data:`, data);
            data.forEach((product) => {
                // Table elements
                const $tableBody = $("tbody.productsTBody")
                const $tableRow = $("<tr>");
                const $nameCol = $("<td>");
                const $categoryCol = $("<td>");
                const $stockCol = $("<td>");
                const $reorderCol = $("<td>");
                const $priceCol = $("<td>");
                const $buttonsCol = $("<td>");

                // Button elements
                const $editButton = $("<a>").addClass("btn-floating orange btnForm");;
                const $editIcon = $("<i>").addClass("material-icons").text("border_color");;
                const $deleteButton = $("<a>").addClass("btn-floating red btnForm");;
                const $deleteIcon = $("<i>").addClass("material-icons").text("delete");

                // Creating table with data                
                $nameCol.text(product.itemName);
                $categoryCol.text(product.category);
                $stockCol.text(product.currentQuantity);
                $reorderCol.text(product.reorderThreshold);
                $priceCol.text(product.sellPrice);

                // Creating edit button                
                const editLink = `/products/edit/${product.id}`;
                $editButton.attr("href", editLink);
                $editButton.append($editIcon);

                // Creating delete button
                const deleteLink = `/products/delete/${product.id}`;
                $deleteButton.attr("href", deleteLink);
                $deleteButton.append($deleteIcon);
                
                $buttonsCol.append($editButton, $deleteButton);

                $tableRow.append($nameCol, $categoryCol, $stockCol, $reorderCol, $priceCol, $buttonsCol);
                $tableBody.append($tableRow);
            });
        });
    }

    const getUserData = () => {
        $.get("/api/users/data").then((data) => {
            $("#user-name").text(data.username);
            getProductData(data);
        });
    }
    
    getUserData();

    const newProductForm = $("form.newProduct");
    const itemName       = $("input#item-name");
    const itemCategory   = $("input#item-category");
    const unitStock      = $("input#unit-stock");
    const unitPar        = $("input#unit-par");
    const unitPrice      = $("input#unit-price");
    

    const resetForm = () => {
        itemName.val("");
        itemCategory.val("");
        unitStock.val("");
        unitPar.val("");
        unitPrice.val("");
    }

    const addProduct = (productData) => {
        $.get("/api/users/data").then((data) => {
            $.post("/api/products/add", {
                itemName: productData.name,
                category: productData.category,
                currentQuantity: productData.stock,
                reorderThreshold: productData.par,
                sellPrice: productData.price,
                costToGet: 0,
                UserId: data.id
            }).then(() => {
                window.location.reload();
            }).catch((err) => {
                console.log("Error:", err);
            });           
        });        
    }

    newProductForm.on("submit", (event) => {
        event.preventDefault();

       const productData = {
           name: itemName.val().trim(),
           category: itemCategory.val().trim(),
           stock: unitStock.val().trim(),
           par: unitPar.val().trim(),
           price: unitPrice.val().trim(), 
       }

       if(!productData.name || !productData.category || !productData.stock || !productData.par || !productData.price) {
           return
       }

       addProduct(productData);
       resetForm();
    })


    
});