// toggleModule.js

import { deleteRow } from '../index.js';

// 특정 조건을 만족하는 행들을 열린 아코디언의 테이블로 옮깁니다.
export function moveRowsToAccordionTable(uniqueSpecialRows, accordionId) {
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);

    // uniqueSpecialRows를 사용하여 중복된 행을 방지
    var uniqueSpecialRows = uniqueSpecialRows.filter((row, index, self) =>
        index === self.findIndex((r) => row.isEqualNode(r))
    );

    uniqueSpecialRows.forEach(function (row) {
        var clonedRow = row.cloneNode(true);
        accordionTable.appendChild(clonedRow);

        // "공간 사진촬영" 행에 대해서만 클릭 이벤트 리스너 추가
        if (row.cells[0].textContent === "공간 사진촬영") {
            clonedRow.querySelector('td').addEventListener("click", function () {
                // "공간 사진촬영" 행을 지우고 만들어진 행들을 다시 되돌린다
                // removeAndRestoreRows();
                window.clearAccordionTable('accordion3');
            });
        }
        // // 클론된 행에 대한 클릭 이벤트 리스너 추가 (별개의 인스턴스이기 때문)
        // clonedRow.querySelector('td').addEventListener("click", function () {
        //     deleteRow(clonedRow);
        // });

        deleteRow(row);
    });

    uniqueSpecialRows.length = 0;

    return uniqueSpecialRows;
}

// // 함수 내부에서 사용하기 위한 함수로, 특정 조건을 만족하는 행을 찾아 삭제합니다.
// function removeSpecialRow(rows, condition) {
//     const uniqueSpecialRows = rows.find(condition);
//     if (uniqueSpecialRows) {
//         deleteRow(uniqueSpecialRows);
//     }
// }

// 아코디언 아이템을 보이게 설정
export function toggleAccordion(accordionId, isBlock) {
    var accordionItem = document.getElementById(accordionId);
    if (accordionItem) {
        if (isBlock) {
            accordionItem.classList.remove('d-none');
            accordionItem.classList.add('d-block');
        } else {
            accordionItem.classList.remove('d-block');
            accordionItem.classList.add('d-none');
        }
    }
}