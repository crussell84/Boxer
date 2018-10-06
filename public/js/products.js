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
        console.log(productData);

        $.post("/api/products/add", {
            itemName: productData.name,
            category: productData.category,
            currentQuantity: productData.stock,
            reorderThreshold: productData.par,
            sellPrice: productData.price,
            costToGet: 0,
            // UserId: ,
            
        }).then((data) => {
            window.location.reload();

        }).catch((err) => {
            console.log(err);
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

       if(!productData.name || !productData.category || !productData.stock || !productData.par || !productData.price){
           return
       }
       addProduct(productData);
       resetForm();
    })


    
});