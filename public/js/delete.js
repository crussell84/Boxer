$(document).ready(function () {
    const $deleteForm = $("form.deleteForm");

    const getProductData = (userData) => {
        const pathName = window.location.pathname;
        const productID = pathName.split("/")[3];
        const $inputFeild = $("input#inputItemName");

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
            $categoryCol.text(data.category);
            $stockCol.text(data.currentQuantity);
            $reorderCol.text(data.reorderThreshold);
            $costCol.text(data.costToGet);
            $priceCol.text(data.sellPrice);

            $tableRow.append($nameCol, $categoryCol, $stockCol, $reorderCol, $costCol, $priceCol);
            $tableBody.append($tableRow);
        });

        $inputFeild.removeAttr("disabled value");
    }

    const getUserData = () => {
        $.get("/api/users/data").then((data) => {
            $("#user-name").text(data.username);
            getProductData(data);
        });
    }

    $deleteForm.on("submit", (event) => {
        event.preventDefault();

        const pathName = window.location.pathname;
        const productID = pathName.split("/")[3];

        const userInput = $("input#inputItemName").val().trim();
        const itemName = $("td.itemNameCol")[0].innerText
        console.log(`User Input: ${userInput} Item Name: ${itemName}`);

        if(userInput === itemName) {
            $.ajax({
                url: `/api/products/${productID}`,
                type: 'DELETE',
                success: (result) => {
                    console.log(result);
                }
            });
            // $.delete(`/api/products/${productID}`).then(() => {
            //     console.log(window)
            // })
        }
    });

    getUserData();
});