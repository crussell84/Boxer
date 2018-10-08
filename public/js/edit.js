$(document).ready(function () {
    $('div.modal').modal({
        dismissible: false
      });

    const $editForm = $("form.editForm");

    const $inputName = $("input#inputName");
    const $inputCategory = $("input#inputCategory");
    const $inputStock = $("input#inputStock");
    const $inputPar = $("input#inputPar");
    const $inputCost = $("input#inputCost");
    const $inputPrice = $("input#inputPrice");

    const addDataToForm = () => {
        $inputName.val($("td.itemNameCol")[0].innerText);
        $inputCategory.val($("td.categoryCol")[0].innerText);
        $inputStock.val($("td.stockCol")[0].innerText);
        $inputPar.val($("td.parCol")[0].innerText);
        $inputCost.val($("td.costCol")[0].innerText);
        $inputPrice.val($("td.priceCol")[0].innerText);
    }

    const getProductData = (userData) => {
        const pathName = window.location.pathname;
        const productID = pathName.split("/")[3];

        

        const allInputsArray = [$inputName, $inputCategory, $inputStock, $inputPar, $inputCost, $inputPrice]

        $.get(`/api/products/${userData.id}/${productID}`).then((data) => {
            // Table elements
            const $tableBody = $("tbody.productTBody")
            const $tableRow = $("<tr>");
            const $nameCol = $("<td>");
            const $categoryCol = $("<td>");
            const $stockCol = $("<td>");
            const $reorderCol = $("<td>");
            const $costCol = $("<td>");
            const $priceCol = $("<td>");

            // Creating table with data                
            $nameCol.text(data.itemName).addClass("itemNameCol");
            $categoryCol.text(data.category).addClass("categoryCol");
            $stockCol.text(data.currentQuantity).addClass("stockCol");
            $reorderCol.text(data.reorderThreshold).addClass("parCol");
            $costCol.text(data.costToGet).addClass("costCol");
            $priceCol.text(data.sellPrice).addClass("priceCol");

            $tableRow.append($nameCol, $categoryCol, $stockCol, $reorderCol, $costCol, $priceCol);
            $tableBody.append($tableRow);

            addDataToForm();

            allInputsArray.forEach((input) => {
                input.removeAttr("disabled value");
            });

            $("button.editButton").removeClass("disabled");
        });
    }

    const getUserData = () => {
        $.get("/api/users/data").then((data) => {
            $("#user-name").text(data.username);
            getProductData(data);
        });
    }

    $editForm.on("submit", (event) => {
        event.preventDefault();

        const pathName = window.location.pathname;
        const productID = pathName.split("/")[3];
        console.log(productID)

        const productData = {
            itemName: $inputName.val().trim(),
            category: $inputCategory.val().trim(),
            currentQuantity: $inputStock.val().trim(),
            reorderThreshold: $inputPar.val().trim(),
            sellPrice: $inputCost.val().trim(),
            costToGet: $inputPrice.val().trim(), 
        }

        console.log(productData);

        if(!productData.itemName || !productData.category || !productData.currentQuantity || !productData.reorderThreshold || !productData.sellPrice || !productData.costToGet) {
            return
        }

        $.ajax({
            url: `/api/products/${productID}`,
            type: 'PUT',
            data: productData,
            success: (result) => {
                console.log("here");
                $('span.modalItemName').text($("td.itemNameCol")[0].innerText);
                $('div.modal').modal("open");      
            }
        });
    });

    getUserData();
});