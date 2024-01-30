import { moveRowsToAccordionTable } from './toggleModule.js';

export function createAccordion(id, title) {
    // 부모 요소 생성
    var parentDiv = document.createElement('div');
    parentDiv.className = 'accordion-item'; // d-none';
    parentDiv.id = id;

    // 제목 헤더 생성
    var headerDiv = document.createElement('h2');
    headerDiv.className = 'accordion-header';
    headerDiv.id = 'panelsStayOpen-heading' + id;

    var button = document.createElement('button');
    button.className = 'accordion-button';
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', '#panelsStayOpen-collapse' + id);
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-controls', 'panelsStayOpen-collapse' + id);

    button.innerText = title;

    headerDiv.appendChild(button);

    // 내용 영역 생성
    var collapseDiv = document.createElement('div');
    collapseDiv.id = 'panelsStayOpen-collapse' + id;
    collapseDiv.className = 'accordion-collapse collapse show';

    var bodyDiv = document.createElement('div');
    bodyDiv.className = 'accordion-body';

    // 테이블 생성
    var table = document.createElement('table');
    table.className = 'table table-hover table-bordered package-table';
    table.id = 'quoteTable';

    // 테이블 헤더 생성
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var headerTitles = ['구분', '수량', '단가', '합계', '비고'];

    for (var i = 0; i < headerTitles.length; i++) {
        var th = document.createElement('th');
        th.innerText = headerTitles[i];
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 테이블 바디 생성
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // "행 모두 지우기" 버튼 생성
    var clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.className = 'btn btn-danger';
    // clearButton.setAttribute('onclick', `removeAccordion('${id}')`);
    clearButton.setAttribute('onclick', `clearAccordionTable('${id}')`);
    clearButton.innerText = '행 모두 지우기';

    // 버튼과 테이블을 내용에 추가
    bodyDiv.appendChild(table);
    bodyDiv.appendChild(clearButton);

    // 내용을 내용 영역에 추가
    collapseDiv.appendChild(bodyDiv);

    // 제목 헤더와 내용 영역을 부모에 추가
    parentDiv.appendChild(headerDiv);
    parentDiv.appendChild(collapseDiv);

    // accordion div를 찾는다
    var accordionDiv = document.getElementById('accordionPanelsStayOpenExample');
    accordionDiv.appendChild(parentDiv);

    // // 리스터 부착
    // createTableObserverByClass(headerDiv, button);
}

// 아코디언을 지우는 함수
// window.removeAccordion = (id) => {
//     var accordionItem = document.getElementById(id);
//     if (accordionItem) {
//         // 아코디언 내부의 모든 자식 요소를 얻어옴
//         var accordionChildren = accordionItem.children;

//         // 아코디언 내부의 모든 자식 요소를 제거
//         for (var i = accordionChildren.length - 1; i >= 0; i--) {
//             accordionChildren[i].remove();
//         }

//         // 아코디언 요소를 제거
//         accordionItem.remove();
//     }
// }
window.removeAccordion = (id) => {
    var accordionItem = document.getElementById(id);
    if (accordionItem) {
        accordionItem.remove();
    }
}

// // 아코디언의 행들을 체크해서 패키지를 결정
// function checkSpecialRows(table, headerDiv, button) {
//     var rows = table.getElementsByTagName('tr');
//     var specialRows = [];

//     // Iterate through rows and find special rows
//     for (var i = 0; i < rows.length; i++) {
//         var cells = rows[i].getElementsByTagName('td');
//         if (cells.length > 0) {
//             specialRows.push(rows[i]);
//         }
//     }

//     // Check conditions
//     // if (
//     //     specialRows.length >= 4 &&
//     //     new Set(specialRows.map(row => row.cells[0].textContent)).size === 4 &&
//     //     specialRows.every(row =>
//     //         ["공간 사진촬영", "공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
//     //     ) 
//     // ) {
//     //     // button.innerText = "패키지활영4 20% 할인";
//     //     // headerDiv.id = "accordionPackage" + "4";
//     //     // console.log(headerDiv.id);

//     // } 

//     if (
//         specialRows.length >= 3 &&
//         new Set(specialRows.map(row => row.cells[0].textContent)).size === 3 &&
//         specialRows.every(row =>
//             ["공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
//         )
//     ) {
//         // button.innerText = "패키지활영1 10% 할인";
//         // headerDiv.id = "accordionPackage" + "1";
//         // console.log(headerDiv.id);
//         createAccordion("accordionPackage1", "패키지 촬영1 10% 할인");
//         const uniqueSpecialRows = [...new Set(specialRows)];
//         moveRowsToAccordionTable(uniqueSpecialRows, "accordionPackage1", true);
//         observer.observe(table, { childList: true, subtree: true });

//     } else if (
//         specialRows.length >= 3 &&
//         new Set(specialRows.map(row => row.cells[0].textContent)).size === 3 &&
//         specialRows.every(row =>
//             ["공간 사진촬영", "공간 마케팅촬영", "드론 항공촬영"].includes(row.cells[0].textContent)
//         )
//     ) {
//         // button.innerText = "패키지활영2 10% 할인";
//         // headerDiv.id = "accordionPackage" + "2";
//         // console.log(headerDiv.id);

//     } else if (
//         specialRows.length >= 3 &&
//         new Set(specialRows.map(row => row.cells[0].textContent)).size === 3 &&
//         specialRows.every(row =>
//             ["공간 사진촬영", "공간 마케팅촬영", "인터뷰촬영"].includes(row.cells[0].textContent)
//         )
//     ) {
//         // button.innerText = "패키지활영3 10% 할인";
//         // headerDiv.id = "accordionPackage" + "3";
//         // console.log(headerDiv.id);

//     } else {
//         console.log("not package");
//         window.removeAccordion(headerDiv.id);
//     }
// }

// // 테이블이 추가되거나 삭제될 때 이벤트리스너
// function createTableObserverByClass(headerDiv, button) {
//     var targetTables = document.getElementsByClassName("package-table");

//     Array.from(targetTables).forEach(function (targetTable) {
//         var observer = new MutationObserver(function (mutations) {
//             mutations.forEach(function (mutation) {
//                 // Check if rows are added or removed
//                 if (mutation.type === 'childList') {
//                     checkSpecialRows(targetTable, headerDiv, button);
//                 }
//             });
//         });

//         // Configure and start the observer
//         var config = { childList: true, subtree: true };
//         observer.observe(targetTable, config);
//     });
// }

// 