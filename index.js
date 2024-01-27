import { initializeDate } from './js_modules/dateModule.js';
import { getUnitPrice, updateProduct } from './js_modules/priceModule.js';
import { moveRowsToAccordionTable, toggleAccordion } from './js_modules/toggleModule.js'

// 페이지 로드 시 초기화 함수 호출
window.onload = function () {
    initialize();
};

// 초기화 함수
function initialize() {
    // 현재 날짜 초기화
    initializeDate();
}

// 상단에 배열을 선언해주세요
export var specialRows = [];

window.addRow = (selectId) => {
    // 선택한 옵션의 값을 가져오기
    var selectedOption = document.getElementById(selectId).value;

    // 현재 선택된 셀렉트 태그의 부모 행을 찾기
    var currentRow = document.getElementById(selectId).closest('tr');

    // 첫 번째 옵션인 경우에만 행을 만듭니다.
    if (selectedOption !== "none") {
        // 새로운 행 생성
        var newRow = document.createElement("tr");

        // 첫 번째 열은 옵션 값으로 설정
        var cell1 = document.createElement("td");
        cell1.textContent = selectedOption;
        newRow.appendChild(cell1);

        // 첫 번째 열에 대한 클릭 이벤트를 추가하여 행 삭제
        cell1.addEventListener("click", function () {
            deleteRow(newRow);
        });

        // 두 번째 열에는 수량 입력란
        var cell2 = document.createElement("td");
        var quantityInput = document.createElement("input");
        quantityInput.type = "text";
        quantityInput.value = 1; // 기본값을 1로 설정
        quantityInput.className = "amount";
        quantityInput.addEventListener("input", function () {
            updateProduct(newRow);
        });
        cell2.appendChild(quantityInput);
        newRow.appendChild(cell2);

        // 세 번째 열에는 단가 입력란 (기본 단가 설정)
        var cell3 = document.createElement("td");
        var unitPrice = getUnitPrice(selectedOption); // 기본 단가 설정
        cell3.textContent = unitPrice;
        cell3.className = "unit-price";
        newRow.appendChild(cell3);

        // 네 번째 열에는 합계
        var cell4 = document.createElement("td");
        cell4.className = "result";
        newRow.appendChild(cell4);

        // 다섯 번째 열에는 텍스트 인풋
        var cell5 = document.createElement("td");
        var textInput = document.createElement("input");
        textInput.type = "text";
        textInput.className = "notes-input";
        cell5.appendChild(textInput);
        newRow.appendChild(cell5);

        // 새로운 행을 현재 선택된 셀렉트 태그의 부모 행 다음에 삽입
        currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);

        // 행을 추가한 후에 합계 업데이트
        updateProduct(newRow);

        // // Log relevant information to the console
        // console.log("Selected Option:", selectedOption);
        // console.log("Quantity:", quantityInput.value);
        // console.log("Unit Price:", unitPrice);
        // console.log("Notes:", textInput.value);

        // 선택한 옵션이 특정 조건을 충족하는지 확인합니다.
        if (
            (selectedOption === "공간 사진촬영" || selectedOption === "공간 마케팅촬영" || selectedOption === "드론 항공촬영" || selectedOption === "인터뷰촬영") &&
            !specialRows.includes(newRow)
        ) {
            // 특정 조건을 충족하는 행을 배열에 저장합니다.
            specialRows.push(newRow);
            console.log("After Deletion:", specialRows);
        }

        console.log(specialRows);

        // 모든 행이 만들어진 후에 특정 조건을 충족하는 행을 삭제합니다.
        // console.log(specialRows[0].cells[0].textContent); // ... 뒤에 -가 있어서 안됐던듯
        if (
            specialRows.length >= 4 &&
            specialRows.every(row =>
                row.cells[0].textContent === "공간 사진촬영" ||
                row.cells[0].textContent === "공간 마케팅촬영" ||
                row.cells[0].textContent === "드론 항공촬영" ||
                row.cells[0].textContent === "인터뷰촬영"
            )
        ) {
            // 첫 번째 조건을 만족하는 행들을 accordion1의 테이블로 옮깁니다.
            moveRowsToAccordionTable(specialRows, "accordion3");
            // 아코디언 아이템을 보이게 설정
            toggleAccordion("accordion3");

            // addNewRowAfter("패키지촬영1", currentRow);
            //addNewRow("패키지촬영1");

            // specialRows.forEach(function (row) {
            //     deleteRow(row);
            // });

            // // 배열을 비웁니다.
            // specialRows = [];
        } else if (
            specialRows.length >= 3 &&
            specialRows.every(row =>
                row.cells[0].textContent === "공간 마케팅촬영" ||
                row.cells[0].textContent === "드론 항공촬영" ||
                row.cells[0].textContent === "인터뷰촬영"
            )
        ) {
            // 두 번째 조건을 만족하는 행들을 accordion2의 테이블로 옮깁니다.
            moveRowsToAccordionTable(specialRows, "accordion4");
            // 아코디언 아이템을 보이게 설정
            toggleAccordion("accordion4");

            // addNewRowAfter("패키지촬영2", currentRow);
            // addNewRow("패키지촬영2");

            // specialRows.forEach(function (row) {
            //     deleteRow(row);
            // });

            // // 배열을 비웁니다.
            // specialRows = [];
        }
    }
}

// 행을 삭제하는 함수
export function deleteRow(row) {
    row.parentNode.removeChild(row);
    // 삭제 후에 합계 업데이트
    updateTotal();

    // 삭제된 행을 배열에서 제거
    specialRows = specialRows.filter(function (existingRow) {
        return existingRow !== row;
    });
}