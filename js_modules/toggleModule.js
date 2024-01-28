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
                // "공간 사진촬영" 행을 지우고 만들어진 행들로 패키지2 생성
                removeAndMoveRows(uniqueSpecialRows, clonedRow);
            });
        }

        // 패키지에 추가했으니 배열에서 삭제
        deleteRow(row);
    });

    // 패키지를 생성하고 아코디언 자동으로 열리게
    toggleAccordion(accordionId, true);

    // 필요할 시 리턴
    return uniqueSpecialRows;
}

// 되돌리는 함수
function removeAndMoveRows (uniqueSpecialRows, clonedRow) {
    // 패키지 1의 행들 모두 지우기
    window.clearAccordionTable("accordion3");
    // deleteRow(clonedRow);

    // clonedRow를 제외한 새로운 배열을 생성
    uniqueSpecialRows = uniqueSpecialRows.filter(row => !row.isEqualNode(clonedRow));

    console.log(uniqueSpecialRows);

    // clonedRow를 제외한 새로운 배열로 패키지2 생성
    moveRowsToAccordionTable(uniqueSpecialRows, "accordion4");

    // 배열 비우기
    uniqueSpecialRows.length = 0;
}

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