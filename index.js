import { initializeDate } from './js_modules/dateModule.js';
import { getUnitPrice, updateProduct, updateTotal } from './js_modules/priceModule.js';
import { moveRowsToAccordionTable, toggleAccordion } from './js_modules/toggleModule.js';

// 페이지 로드 시 초기화 함수 호출
window.onload = function () {
    initialize();
};

// 초기화 함수
function initialize() {
    // 현재 날짜 초기화
    initializeDate();
}

// 상단에 배열 선언
export var specialRows = [];

// 행을 추가하는 함수
window.addRow = (selectId) => {
    var selectedOption = document.getElementById(selectId).value;
    var currentRow = document.getElementById(selectId).closest('tr');

    if (selectedOption !== "none") {
        var newRow = document.createElement("tr");

        var cell1 = document.createElement("td");
        cell1.textContent = selectedOption;
        newRow.appendChild(cell1);

        cell1.addEventListener("click", function () {
            deleteRow(newRow);
        });

        var cell2 = document.createElement("td");
        var quantityInput = document.createElement("input");
        quantityInput.type = "text";
        quantityInput.value = 1;
        quantityInput.className = "amount";
        quantityInput.addEventListener("input", function () {
            updateProduct(newRow);
        });
        cell2.appendChild(quantityInput);
        newRow.appendChild(cell2);

        var cell3 = document.createElement("td");
        var unitPrice = getUnitPrice(selectedOption);
        cell3.textContent = unitPrice;
        cell3.className = "unit-price";
        newRow.appendChild(cell3);

        var cell4 = document.createElement("td");
        cell4.className = "result";
        newRow.appendChild(cell4);

        var cell5 = document.createElement("td");
        var textInput = document.createElement("input");
        textInput.type = "text";
        textInput.className = "notes-input";
        cell5.appendChild(textInput);
        newRow.appendChild(cell5);

        currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);

        updateProduct(newRow);

        if (
            (selectedOption === "공간 사진촬영" || selectedOption === "공간 마케팅촬영" || selectedOption === "드론 항공촬영" || selectedOption === "인터뷰촬영") &&
            !specialRows.includes(newRow)
        ) {
            specialRows.push(newRow);
            console.log("After Deletion:", specialRows);
        }

        console.log(specialRows);

        if (
            specialRows.length >= 4 &&
            new Set(specialRows.map(row => row.cells[0].textContent)).size === 4 &&
            specialRows.every(row =>
                ["공간 사진촬영", "공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
            )
        ) {
            const uniqueSpecialRows = [...new Set(specialRows)];
            moveRowsToAccordionTable(uniqueSpecialRows, "accordion3");
            toggleAccordion("accordion3", true);
        } else if (
            specialRows.length >= 3 &&
            new Set(specialRows.map(row => row.cells[0].textContent)).size === 3 &&
            specialRows.every(row =>
                ["공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
            )
        ) {
            const uniqueSpecialRows = [...new Set(specialRows)];
            moveRowsToAccordionTable(uniqueSpecialRows, "accordion4");
            toggleAccordion("accordion4", true);
        }
    }
}

// 행을 삭제하는 함수
export function deleteRow(row) {
    row.parentNode.removeChild(row);
    specialRows = specialRows.filter(existingRow => existingRow !== row);
    updateTotal();
}

// 특정 아코디언의 tbody 내부의 모든 행을 삭제하는 함수
window.clearAccordionTable = (accordionId) => {
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);
    while (accordionTable.firstChild) {
        accordionTable.removeChild(accordionTable.firstChild);
    }
    updateTotal();
    toggleAccordion(accordionId, false);
}
