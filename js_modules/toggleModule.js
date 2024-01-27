// toggleModule.js
import { deleteRow } from '../index.js';

// 특정 조건을 만족하는 행들을 열린 아코디언의 테이블로 옮깁니다.
export function moveRowsToAccordionTable(specialRows, accordionId) {
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);

    // uniqueSpecialRows를 사용하여 중복된 행을 방지
    var uniqueSpecialRows = specialRows.filter((row, index, self) =>
        index === self.findIndex((r) => row.isEqualNode(r))
    );

    uniqueSpecialRows.forEach(function (row) {
        var clonedRow = row.cloneNode(true);
        accordionTable.appendChild(clonedRow);
        deleteRow(row);
    });

    specialRows.length = 0;

    return specialRows;
}
// export function moveRowsToAccordionTable(uniqueSpecialRows, accordionId) {
//     // 열린 아코디언의 테이블을 찾습니다.
//     var accordionTable = document.querySelector(`#${accordionId} table tbody`);

//     // 특정 조건을 만족하는 행들을 아코디언 테이블로 옮깁니다.
//     uniqueSpecialRows.forEach(function (row) {
//         // 복제된 행을 생성합니다.
//         var clonedRow = row.cloneNode(true);

//         // 기존 아코디언 테이블에 새로운 행을 추가합니다.
//         accordionTable.appendChild(clonedRow);

//         // 원래 위치의 행을 삭제합니다.
//         deleteRow(row);
//     });

//     // 배열을 비웁니다.
//     uniqueSpecialRows.length = 0;

//     // 업데이트된 배열을 반환합니다.
//     return specialRows;
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


// 토글 함수
// function toggleClass(element, className) {
//     if (element.classList.contains(className)) {
//         element.classList.remove(className);
//     } else {
//         element.classList.add(className);
//     }
// }
