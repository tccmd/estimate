// rowModule.js

// // 새로운 행을 특정 행 뒤에 추가하는 함수
// export function addNewRow(option, referenceRow) {
//     // 새로운 행 생성
//     var newRow = document.createElement("tr");

//     // 첫 번째 열: 옵션 값
//     var cell1 = document.createElement("td");
//     cell1.textContent = option;
//     newRow.appendChild(cell1);

//     // 첫 번째 열에 대한 클릭 이벤트를 추가하여 행 삭제
//     cell1.addEventListener("click", function () {
//         deleteRow(newRow);
//     });

//     // 두 번째 열: 수량 입력
//     var cell2 = document.createElement("td");
//     var quantityInput = document.createElement("input");
//     quantityInput.type = "text";
//     quantityInput.value = 1; // 기본 값 설정
//     quantityInput.className = "amount";
//     quantityInput.addEventListener("input", function () {
//         updateProduct(newRow);
//     });
//     cell2.appendChild(quantityInput);
//     newRow.appendChild(cell2);

//     // 세 번째 열: 단가 (기본 값 설정)
//     var cell3 = document.createElement("td");
//     var unitPrice = getUnitPrice(option); // 기본 단가 설정
//     cell3.textContent = unitPrice;
//     cell3.className = "unit-price";
//     newRow.appendChild(cell3);

//     // 네 번째 열: 결과
//     var cell4 = document.createElement("td");
//     cell4.className = "result";
//     newRow.appendChild(cell4);

//     // 다섯 번째 열: 메모 입력
//     var cell5 = document.createElement("td");
//     var textInput = document.createElement("input");
//     textInput.type = "text";
//     textInput.className = "notes-input";
//     cell5.appendChild(textInput);
//     newRow.appendChild(cell5);

//     // 특정 행 다음에 새로운 행 삽입
//     referenceRow.parentNode.insertBefore(newRow, referenceRow.nextSibling);

//     // 행 추가 후 제품 및 로그 정보 업데이트
//     updateProduct(newRow);

//     // 콘솔에 관련 정보 기록
//     console.log("선택한 옵션:", cell1.textContent);
//     console.log("수량:", quantityInput.value);
//     console.log("단가:", unitPrice);
//     console.log("메모:", textInput.value);
// }