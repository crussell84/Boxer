$(document).ready(function () {
    const createTable = (category) => {
        const $tableBody = $("<tbody>");

        console.log(category);

        category.forEach((product) => {
            const $tableRow = $("<tr>");
            const $nameCol = $("<td>");
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

            $tableRow.append($nameCol, $stockCol, $reorderCol, $priceCol, $buttonsCol);
            $tableBody.append($tableRow);
        });

        return $tableBody
    }

    const createCategories = (categories) => {
        $.each(categories, (key, val) => {
            const $categoriesCol = $("div.categoriesCol")

            const $card = $("<div>").addClass("card");
            const $cardContent = $("<div>").addClass("card-content black-text");
            const $row = $("<div>").addClass("row");
            const $header = $("<h4>").addClass("ctgName");
            const $hr = $("<hr>");
            const $table = $("<table>").addClass("highlight");
            const $tableHead = $("<thead>");
            const $tableRow = $("<tr>");
            const $nameCol = $("<td>").text("Item Name");
            const $stockCol = $("<td>").text("Unit Stock");
            const $reorderCol = $("<td>").text("Unit Par");
            const $priceCol = $("<td>").text("Unit Price");
            const $buttonsCol = $("<td>");

            $tableRow.append($nameCol, $stockCol, $reorderCol, $priceCol, $buttonsCol);
            $tableHead.append($tableRow);
            $table.append($tableHead, createTable(val));

            $header.text(key);

            $row.append($header);

            $cardContent.append($row, $hr, $table);

            $card.append($cardContent);

            $categoriesCol.append($card);
        })
    }

    const getProductData = (userData) => {
        $.get(`/api/products/${userData.id}`).then((data) => {
            productObject = {};

            data.forEach((product) => {
                if(product.category in productObject) {
                    productObject[product.category].push(product);
                }
                
                else {
                    productObject[product.category] = [product]
                }
            });

            createCategories(productObject);
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