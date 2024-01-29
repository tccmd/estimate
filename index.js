import { initializeDate } from './js_modules/dateModule.js';
import { numberWithCommas, getUnitPrice, updateProduct, updateTotal } from './js_modules/priceModule.js';
import { moveRowsToAccordionTable, toggleAccordion } from './js_modules/toggleModule.js';

// 페이지 로드 시 초기화 함수 호출
window.onload = function () {
    initialize();
};

// 초기화 함수
function initialize() {
    // 현재 날짜 초기화
    initializeDate();
    // 필수 옵션 모두 선택
    selectRequiredOptionsOnce('selectOptions1');
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
        cell3.textContent = numberWithCommas(unitPrice);
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

        // // 서버 유지보수비 행에 클릭 이벤트 리스너 부여
        // if (selectedOption === "서버유지보수비") {
        //     newRow.addEventListener("click", function () {
                
        //     });
        // }

        if (
            (selectedOption === "공간 사진촬영" || selectedOption === "공간 마케팅촬영" || selectedOption === "드론 항공촬영" || selectedOption === "인터뷰촬영") &&
            !specialRows.includes(newRow)
        ) {
            specialRows.push(newRow);
            console.log("specialRows:", specialRows);
        }

        if (
            specialRows.length >= 4 &&
            new Set(specialRows.map(row => row.cells[0].textContent)).size === 4 &&
            specialRows.every(row =>
                ["공간 사진촬영", "공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
            )
        ) {
            const uniqueSpecialRows = [...new Set(specialRows)];
            moveRowsToAccordionTable(uniqueSpecialRows, "accordion4", true);

            console.log("specialRows:", specialRows);
            console.log("uniqueSpecialRows:", uniqueSpecialRows);
        } else if (
            specialRows.length >= 3 &&
            new Set(specialRows.map(row => row.cells[0].textContent)).size === 3 &&
            specialRows.every(row =>
                ["공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
            )
        ) {
            const uniqueSpecialRows = [...new Set(specialRows)];
            moveRowsToAccordionTable(uniqueSpecialRows, "accordion3", true);

            console.log("specialRows:", specialRows);
            console.log("uniqueSpecialRows:", uniqueSpecialRows);
        }
    }
}

// 행을 삭제하는 함수
export function deleteRow(row) {
    if (row.parentNode) {
        row.parentNode.removeChild(row);
    }

    // 행이 원래 배열에 있는 인스턴스인지 확인하여 제거
    specialRows = specialRows.filter(existingRow => existingRow !== row);

    updateTotal();
}

// 특정 아코디언의 tbody 내부의 모든 행을 삭제하는 함수 (아코디언3, 4)
window.clearAccordionTable = (accordionId) => {
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);
    while (accordionTable.firstChild) {
        // accordionTable.removeChild(accordionTable.firstChild);
        deleteRow(accordionTable.firstChild);
    }
    updateTotal();
    toggleAccordion(accordionId, false);
}

// 필수 옵션을 한번씩 추가하는 함수
window.selectRequiredOptionsOnce = (selectOptions) => {
    // 필수 옵션 목록 가져오기
    const requiredOptions = Array.from(document.getElementById(selectOptions).options)
        .filter(option => option.value !== 'none' && option.value !== '서버유지보수비 1년')
        .map(option => option.value);

    // 특정 이벤트를 발생시키기 위한 함수
    function triggerEvent(element, eventName) {
        const event = new Event(eventName, { bubbles: true });
        element.dispatchEvent(event);
    }

    // 이미 선택된 옵션을 저장하는 Set
    const selectedOptions = new Set();

    // 필수 옵션을 반복하면서 한 번씩 선택
    requiredOptions.forEach(option => {
        const selectElement = document.getElementById(selectOptions);
        if (selectElement && !selectedOptions.has(option)) {
            // 필수 옵션이 아직 선택되지 않았다면, addRow 함수 호출
            selectElement.value = option; // 수동으로 값 설정
            triggerEvent(selectElement, 'change'); // change 이벤트 발생
            selectedOptions.add(option);
        }
    });
}

// 특정 아코디언의 tbody 내부의 thead, tr[0] 행을 제외한 모든 행을 삭제하는 함수 (아코디언1, 2)
function clearAccordionTableExceptFirstRow(accordionId) {
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);
    var rowsToKeep = accordionTable.querySelectorAll('tr:first-child');

    // Remove all rows except the first row
    Array.from(accordionTable.children).forEach(row => {
        if (!Array.from(rowsToKeep).includes(row)) {
            row.parentNode.removeChild(row);
        }
    });

    updateTotal(); // Update total after clearing the table
}

// 첫 번째 아코디언 행 모두 지우기
window.clearAccordionTableExceptFirstRow1 = () => {
    clearAccordionTableExceptFirstRow('accordion1');
}

// 두 번째 아코디언 행 모두 지우기
window.clearAccordionTableExceptFirstRow2 = () => {
    clearAccordionTableExceptFirstRow('accordion2');
}

// 모든 아코디언 테이블의 버튼들을 토글하는 함수 (비고)
window.toggleAllAccordionButtons = (open = true) => {
    // 모든 아코디언 아이템을 찾아서 버튼들을 설정
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(accordionItem => {
        const buttons = accordionItem.querySelectorAll('.btn');
        buttons.forEach(button => {
            const computedStyle = window.getComputedStyle(button);
            if (open) {
                button.style.display = computedStyle.display === 'inline-block' ? 'none' : 'inline-block';
                // button.style.display = 'inline-block';
            } else {
                button.style.display = 'none';
            }
        });
    });
}

// 클릭 이벤트 리스너를 추가할 요소 가져오기 (비고)
const toggleButtonsTrigger = document.querySelector('.form-group');

// 클릭 이벤트 리스너 추가
toggleButtonsTrigger.addEventListener('click', function () {
    toggleAllAccordionButtons();
});

// 스크린샷 전에 숨기는 함수
function hideSelectBoxForScreenshot() {
    // var selectBox1 = document.getElementById("selectOptions1");
    // var selectBox2 = document.getElementById("selectOptions2");
    var elementToRemove1 = document.querySelector('#panelsStayOpen-collapseOne tbody tr:nth-child(1)');
    var elementToRemove2 = document.querySelector('#panelsStayOpen-collapseTwo tbody tr:nth-child(1)');

    if (elementToRemove1 && elementToRemove2) {
        // selectBox1.style.display = 'none';
        // selectBox2.style.display = 'none';
        elementToRemove1.style.display = 'none';
        elementToRemove2.style.display = 'none';
    }
}

// 스크린샷 후에 다시 표시하는 함수
function showSelectBoxAfterScreenshot() {
    // var selectBox1 = document.getElementById("selectOptions1");
    // var selectBox2 = document.getElementById("selectOptions2");
    var elementToRemove1 = document.querySelector('#panelsStayOpen-collapseOne tbody tr:nth-child(1)');
    var elementToRemove2 = document.querySelector('#panelsStayOpen-collapseTwo tbody tr:nth-child(1)');
    if (elementToRemove1 && elementToRemove2) {
        // selectBox1.style.display = 'block';
        // selectBox2.style.display = 'block';
        elementToRemove1.style.display = 'table-row';
        elementToRemove2.style.display = 'table-row';
    }
}

function screenShot() {

    // 버튼 숨기기
    window.toggleAllAccordionButtons(false);

    // 셀렉트 박스 숨기기
    hideSelectBoxForScreenshot();

    // 현재 페이지 스크롤 위치 저장
    const originalScrollY = window.scrollY;

    // 페이지 맨 위로 스크롤
    window.scrollTo(0, 0);

    // 스크롤 위치가 맨 위로 이동한 후 스크린샷 찍기
    setTimeout(() => {
        // 현재 페이지 전체를 스크린샷으로 찍기
        window.scrollTo(0, 0);
        html2canvas(document.body, { scale: 2, windowWidth: document.body.scrollWidth, windowHeight: document.body.scrollHeight, scrollX: 0, scrollY: 0 }).then(function (canvas) {
            // 이미지 데이터 URL 얻기
            var imageDataURL = canvas.toDataURL("image/png");

            // 이미지를 저장할 링크 생성
            var downloadLink = document.createElement("a");
            downloadLink.href = imageDataURL;
            downloadLink.download = "estimate.png";

            // 링크를 클릭하여 이미지 다운로드
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // 원래 스크롤 위치로 복원
            window.scrollTo(0, originalScrollY);

            // 요소 다시 표시
            showSelectBoxAfterScreenshot();

        });
    }, 500); // setTimeout 내의 시간은 스크롤이 맨 위로 이동하기까지의 대기 시간
}

// 견적서 헤더를 탭하면 스크린샷하는 이벤트 리스너 추가
document.getElementById("header").addEventListener("click", screenShot);
