// toggleModule.js

import { deleteRow } from '../index.js';
import { numberWithCommas } from './priceModule.js';
import { createAccordion } from './accordion.js'

// 특정 조건을 만족하는 행들을 열린 아코디언의 테이블로 옮깁니다.
export function moveRowsToAccordionTable(uniqueSpecialRows, accordionId, discount) {
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);

    // uniqueSpecialRows를 사용하여 중복된 행을 방지
    var uniqueSpecialRows = uniqueSpecialRows.filter((row, index, self) =>
        index === self.findIndex((r) => row.isEqualNode(r))
    );

    uniqueSpecialRows.forEach(function (row) {

        var discountRate = 0.1;
        // Assuming row.cells[3] contains the value to which you want to apply a discount
        if (discount) {
            if (accordionId.includes("accordionPackage4")) {
                discountRate = 0.2;
            }
            var originalValue = parseFloat(row.cells[2].textContent.replace(/,/g, '')) || 0;
            var discountedValue = originalValue * (1 - discountRate);
            // row.cells[3].textContent = discountedValue; // Assuming you want 2 decimal places
            row.cells[3].textContent = numberWithCommas(discountedValue);
        }

        var clonedRow = row.cloneNode(true);

        accordionTable.appendChild(clonedRow);

        // 클릭 이벤트 리스너 추가
        clonedRow.querySelector('td').addEventListener("click", function () {
            if (row.cells[0].textContent === "공간 사진촬영") {
                var newAccordionId = "accordionPackage1" + generateRandomString(2);
                uniqueSpecialRows = uniqueSpecialRows.filter(row => !row.isEqualNode(clonedRow));
                window.clearAccordionTable(accordionId);
                createAccordion(newAccordionId, "패키지 촬영1 10% 할인");
                moveRowsToAccordionTable(uniqueSpecialRows, newAccordionId, true);

            } else if (row.cells[0].textContent === "인터뷰촬영") {
                var newAccordionId = "accordionPackage2" + generateRandomString(2);
                uniqueSpecialRows = uniqueSpecialRows.filter(row => !row.isEqualNode(clonedRow));
                window.clearAccordionTable(accordionId);
                createAccordion(newAccordionId, "패키지 촬영2 10% 할인");
                moveRowsToAccordionTable(uniqueSpecialRows, newAccordionId, true);

            } else if (row.cells[0].textContent === "드론 항공촬영") {
                var newAccordionId = "accordionPackage3" + generateRandomString(2);
                uniqueSpecialRows = uniqueSpecialRows.filter(row => !row.isEqualNode(clonedRow));
                window.clearAccordionTable(accordionId);
                createAccordion(newAccordionId, "패키지 촬영3 10% 할인");
                moveRowsToAccordionTable(uniqueSpecialRows, newAccordionId, true);

            } else if (row.cells[0].textContent === "공간 마케팅촬영") {
                window.clearAccordionTable(accordionId);
            }
        });

        // 패키지에 추가했으니 배열에서 삭제
        deleteRow(row);
    });
    // // "accordion4"이면서 "result" 열 값이 음수일 때의 행을 추가
    // if (accordionId === "accordion4") {
    //     var hiddenRow = document.createElement('tr');
    //     hiddenRow.className = 'd-none';
    //     hiddenRow.innerHTML = '<td></td><td></td><td></td><td class="result">-5000</td><td></td>';
    //     accordionTable.appendChild(hiddenRow);
    // }

    // 패키지를 생성하고 아코디언 자동으로 열리게
    // toggleAccordion(accordionId, true);

    // 필요할 시 리턴
    return uniqueSpecialRows;
}

// // 되돌리는 함수
// function removeAndMoveRows(accordionId, uniqueSpecialRows, clonedRow) {
//     // 패키지 1의 행들 모두 지우기
//     // 아코디언 지우기
//     window.removeAccordion(accordionId);

//     // clonedRow를 제외한 새로운 배열을 생성
//     uniqueSpecialRows = uniqueSpecialRows.filter(row => !row.isEqualNode(clonedRow));

//     console.log(uniqueSpecialRows);

//     // 아코디언 새로 생성
//     createAccordion("accordionPackage1", "");
//     // clonedRow를 제외한 새로운 배열로 패키지2 생성
//     moveRowsToAccordionTable(uniqueSpecialRows, "accordion3", false);

//     // 배열 비우기
//     uniqueSpecialRows.length = 0;
// }
// export function moveRowsToAccordionTable(uniqueSpecialRows, accordionId) {
//     var accordionTable = document.querySelector(`#${accordionId} table tbody`);

//     // uniqueSpecialRows를 사용하여 중복된 행을 방지
//     var uniqueSpecialRows = uniqueSpecialRows.filter((row, index, self) =>
//         index === self.findIndex((r) => row.isEqualNode(r))
//     );

//     uniqueSpecialRows.forEach(function (row) {
//         var clonedRow = row.cloneNode(true);

//         accordionTable.appendChild(clonedRow);

//         // "공간 사진촬영" 행에 대해서만 클릭 이벤트 리스너 추가
//         if (row.cells[0].textContent === "공간 사진촬영") {
//             clonedRow.querySelector('td').addEventListener("click", function () {
//                 // "공간 사진촬영" 행을 지우고 만들어진 행들로 패키지2 생성
//                 removeAndMoveRows(uniqueSpecialRows, clonedRow);
//             });
//         }

//         // 패키지에 추가했으니 배열에서 삭제
//         deleteRow(row);
//     });

//     // 패키지를 생성하고 아코디언 자동으로 열리게
//     toggleAccordion(accordionId, true);

//     // 필요할 시 리턴
//     return uniqueSpecialRows;
// }

// // 되돌리는 함수
// function removeAndMoveRows (uniqueSpecialRows, clonedRow) {
//     // 패키지 1의 행들 모두 지우기
//     window.clearAccordionTable("accordion4");

//     // clonedRow를 제외한 새로운 배열을 생성
//     uniqueSpecialRows = uniqueSpecialRows.filter(row => !row.isEqualNode(clonedRow));

//     console.log(uniqueSpecialRows);

//     // clonedRow를 제외한 새로운 배열로 패키지2 생성
//     moveRowsToAccordionTable(uniqueSpecialRows, "accordion3");

//     // 배열 비우기
//     uniqueSpecialRows.length = 0;
// }

// // 아코디언 아이템을 보이게 설정
// export function toggleAccordion(accordionId, isBlock) {
//     var accordionItem = document.getElementById(accordionId);
//     if (accordionItem) {
//         if (isBlock) {
//             accordionItem.classList.remove('d-none');
//             accordionItem.classList.add('d-block');
//         } else {
//             accordionItem.classList.remove('d-block');
//             accordionItem.classList.add('d-none');
//         }
//     }
// }