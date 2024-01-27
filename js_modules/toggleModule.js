// toggleModule.js
import { specialRows } from '../index.js'
import { deleteRow } from './rowModule.js';

// 특정 조건을 만족하는 행들을 열린 아코디언의 테이블로 옮깁니다.
export function moveRowsToAccordionTable(specialRows, accordionId) {
    // 열린 아코디언의 테이블을 찾습니다.
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);

    // 특정 조건을 만족하는 행들을 아코디언 테이블로 옮깁니다.
    specialRows.forEach(function (row) {
        // 복제된 행을 생성합니다.
        var clonedRow = row.cloneNode(true);

        // 기존 아코디언 테이블에 새로운 행을 추가합니다.
        accordionTable.appendChild(clonedRow);

        // 원래 위치의 행을 삭제합니다.
        deleteRow(row);
    });

    // 배열을 비웁니다.
    specialRows = [];
}

// 아코디언 아이템을 보이게 설정
export function toggleAccordion(accordionId) {
    var accordionItem = document.getElementById(accordionId);
    if (accordionItem) {
        accordionItem.classList.remove('d-none');
        accordionItem.classList.add('d-block');
    }
}

// 특정 아코디언의 tbody 내부의 모든 행을 삭제합니다.
export function clearAccordionTable(accordionId) {
    // 열린 아코디언의 테이블을 찾습니다.
    var accordionTable = document.querySelector(`#${accordionId} table tbody`);

    // 모든 행을 삭제합니다.
    while (accordionTable.firstChild) {
        accordionTable.removeChild(accordionTable.firstChild);
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
