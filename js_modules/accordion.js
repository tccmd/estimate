import { addRow, selectRequiredOptionsOnce } from "./row.js";
import { updateTotal } from "./priceModule.js";
import { package1, package2, package3, package4 } from "./data.js";
import { numberWithCommas } from "./priceModule.js";

export function createAccordion(id, title, options = []) {
  // 부모 요소 생성
  var parentDiv = document.createElement("div");
  parentDiv.className = "accordion-item"; // d-none';
  parentDiv.id = id;

  // 제목 헤더 생성
  var headerDiv = document.createElement("h2");
  headerDiv.className = "accordion-header";
  headerDiv.id = "panelsStayOpen-heading" + id;

  var button = document.createElement("button");
  button.className = "accordion-button"; // + (id === "Accordion1" ? "" : " collapsed");
  button.type = "button";
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", "#panelsStayOpen-collapse" + id);
  button.setAttribute("aria-expanded", "true"); // id === "Accordion1" ? "true" : "false"); // Accordion1은 true, 나머지는 false
  button.setAttribute("aria-controls", "panelsStayOpen-collapse" + id);

  button.innerText = title;

  headerDiv.appendChild(button);

  // 내용 영역 생성
  var collapseDiv = document.createElement("div");
  collapseDiv.id = "panelsStayOpen-collapse" + id;
  collapseDiv.className = "accordion-collapse collapse show"; // + (id === "Accordion1" ? " show" : "");

  var bodyDiv = document.createElement("div");
  bodyDiv.className = "accordion-body";

  // 테이블 생성
  var table = document.createElement("table");
  table.className = "table table-hover table-bordered package-table";
  table.id = "quoteTable";

  // 테이블 헤더 생성
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headerTitles = ["구분", "수량", "단가", "합계", "비고"];

  for (var i = 0; i < headerTitles.length; i++) {
    var th = document.createElement("th");
    th.innerText = headerTitles[i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 테이블 바디 생성
  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  // 첫 번째 행 생성
  var row = document.createElement("tr");

  var selectCell = document.createElement("td");
  var select = document.createElement("select");
  select.id = "selectOptions" + id;
  select.onchange = function () {
    addRow(id, select.id);
  };

  // 옵션 추가
  if (options.length > 0) {
    var optgroup = document.createElement("optgroup");
    optgroup.label = title;

    options.forEach(function (optionText) {
      var option = document.createElement("option");

      // 구분선 처리
      if (optionText === "--------------------------") {
        option.value = ""; // 비활성화된 옵션
        option.text = optionText;
        option.disabled = true; // 비활성화
        option.style.color = "gray"; // 시각적으로 구분선처럼 보이게
      } else {
        option.value = optionText;
        option.text = optionText;
      }

      optgroup.appendChild(option);
    });

    select.appendChild(optgroup);
    selectCell.appendChild(select);
    row.appendChild(selectCell);

    // 나머지 빈 열들 추가
    for (var i = 0; i < 4; i++) {
      row.appendChild(document.createElement("td"));
    }

    tbody.appendChild(row);
    table.appendChild(tbody);
  }

  // "모두 추가" 버튼 생성
  if (!id.includes("package")) {
    var selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "btn btn-outline-primary me-2";
    selectButton.addEventListener("click", () => selectRequiredOptionsOnce(id));
    selectButton.innerText = "모두 추가";
  }

  // "행 모두 지우기" 버튼 생성
  var clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "btn btn-danger";
  if (id === "Accordion1" || id === "Accordion2") {
    clearButton.addEventListener("click", () => clearAccordionTable(id));
  } else {
    clearButton.addEventListener("click", () => removeAccordion(id));
  }
  clearButton.innerText = "모두 지우기";

  // 버튼과 테이블을 내용에 추가
  bodyDiv.appendChild(table);
  if (!id.includes("package")) bodyDiv.appendChild(selectButton);
  bodyDiv.appendChild(clearButton);

  // 내용을 내용 영역에 추가
  collapseDiv.appendChild(bodyDiv);

  // 제목 헤더와 내용 영역을 부모에 추가
  parentDiv.appendChild(headerDiv);
  parentDiv.appendChild(collapseDiv);

  // accordion div를 찾는다
  var accordionDiv = document.getElementById("accordionPanelsStayOpenExample");
  accordionDiv.appendChild(parentDiv);

  // // 리스터 부착
  // createTableObserverByClass(headerDiv, button);
  if (id !== "Accordion1") {
    observeAccordionRows(id);
  }

  return tbody;
}

export function createAccordionAsync(id, title, options) {
  return new Promise((resolve, reject) => {
    try {
      createAccordion(id, title, options); // 아코디언 생성

      // select 요소가 DOM에 생성되었는지 확인하는 함수
      const checkSelectElementExists = () => {
        const selectElement = document.getElementById("selectOptions" + id);
        if (selectElement) {
          // console.log('select 요소가 생성되었습니다.') // 로그 추가
          resolve(); // 아코디언이 정상적으로 추가되었을 때 resolve 호출
        } else {
          setTimeout(checkSelectElementExists, 100); // 100ms 후에 다시 확인
        }
      };

      checkSelectElementExists(); // 함수 호출하여 확인 시작
    } catch (error) {
      reject(error); // 다른 에러가 발생하면 reject 호출
    }
  });
}

// 아코디언의 tbody 내부의 thead, tr[0] 행을 제외한 모든 행을 삭제하는 함수
function clearAccordionTable(accordionId) {
  // 아코디언 내의 tbody 요소를 찾기
  const tbody = document.querySelector(
    `#${accordionId} .accordion-body table tbody`
  );

  if (!tbody) {
    console.error(`tbody not found for accordion with id: ${accordionId}`);
    return;
  }

  // tbody 내의 모든 행을 가져오기
  const rows = Array.from(tbody.rows);

  // 첫 번째 행(인덱스 0)과 thead는 제외하고 삭제
  for (let i = 1; i < rows.length; i++) {
    tbody.deleteRow(1); // 항상 첫 번째 행을 삭제
  }

  updateTotal();
}

// 아코디언을 지우는 함수
function removeAccordion(accordionId) {
  // 아코디언의 부모 요소를 찾습니다
  const accordionElement = document.getElementById(accordionId);

  // 아코디언 요소가 존재하는지 확인
  if (accordionElement) {
    // 부모 요소에서 해당 아코디언 요소를 삭제
    accordionElement.parentElement.removeChild(accordionElement);
    updateTotal();
    console.log(`${accordionId}가 삭제되었습니다.`);
  } else {
    console.error(`ID가 ${accordionId}인 아코디언을 찾을 수 없습니다.`);
  }
}

export function observeAccordionRows(accordionId) {
  // 아코디언의 tbody 요소를 가져옵니다
  const accordionElement = document.getElementById(accordionId);
  if (!accordionElement) {
    console.error("Accordion element not found:", accordionId);
    return;
  }

  const tbody = accordionElement.querySelector("tbody");
  if (!tbody) {
    console.error("Tbody element not found in accordion:", accordionId);
    return;
  }

  // MutationObserver 콜백 함수
  const callback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        handleAddedRows(mutation);
        handleRemovedRows(mutation);
        updateTotal();
      }
    });
  };

  // 행이 추가되었을 때 처리하는 함수
  function handleAddedRows(mutation) {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "TR" && !node.hasAttribute("data-moved")) {
          processAddedRow(node);
        }
      });
    }
  }

  // 추가된 행을 처리하는 함수
  function processAddedRow(node) {
    const rowData = getRowData(node);
    console.log(`${accordionId}에 새로운 행이 추가되었습니다:`, rowData[0]);

    const allRows = tbody.querySelectorAll("tr");
    const firstCellValues = getFirstCellValues(allRows);
    console.log(
      `아코디언: ${accordionId}, 첫 번째 셀 값들 (첫 행 제외):`,
      firstCellValues
    );

    // 패키지 처리
    const packages = [package1, package2, package3, package4];
    processPackages(packages, allRows);
  }

  // 패키지 처리 함수
  function processPackages(packages, allRows) {
    let packageMatchCounts = calculatePackageMatches(packages, allRows);

    // 일치하는 행의 개수 기준으로 패키지 정렬 (내림차순)
    packageMatchCounts.sort(
      (a, b) => b.matchingRows.length - a.matchingRows.length
    );

    // 패키지 처리 (가장 많이 일치하는 패키지부터 시작)
    for (let i = 0; i < packageMatchCounts.length; i++) {
      const bestMatchPackage = packageMatchCounts[i];
      if (bestMatchPackage.matchingRows.length > 0) {
        console.log(
          `${accordionId}에 ${bestMatchPackage.packageData.packageArray}이 가장 많이 포함된 행이 있습니다.`
        );
        const newAccordionTbody = createAccordion(
          bestMatchPackage.packageData.id,
          bestMatchPackage.packageData.packge
        );

        moveRowsToNewAccordion(
          bestMatchPackage.matchingRows,
          newAccordionTbody,
          bestMatchPackage.packageData.discount
        );

        removeInvalidAccordions(); // 패키지가 성립되지 않는 아코디언 삭제

        // 아코디언이 하나 생성되면 패키지 처리를 중단
        break;
      }
    }
  }

  // 패키지와 일치하는 행의 개수를 계산하는 함수
  function calculatePackageMatches(packages, allRows) {
    return packages.map((packageData) => {
      const matchingRows = Array.from(allRows).filter((row) => {
        const firstCellValue = getFirstCellValue(row);
        return packageData.packageArray.includes(firstCellValue);
      });
      return { packageData, matchingRows };
    });
  }

  // 행이 삭제되었을 때 처리하는 함수
  function handleRemovedRows(mutation) {
    if (mutation.removedNodes.length > 0) {
      mutation.removedNodes.forEach((node) => {
        if (node.nodeName === "TR") {
          console.log("행이 삭제되었습니다:", node);
          processRemovedRow(node);
        }
      });
    }
  }

  // 삭제된 행을 처리하는 함수
  function processRemovedRow(node) {
    const rowData = getRowData(node);
    console.log(`${accordionId}에서 행이 삭제되었습니다:`, rowData[0]);

    // 삭제된 행에 맞는 패키지 처리
    const allRows = tbody.querySelectorAll("tr");
    const firstCellValues = getFirstCellValues(allRows);
    const packages = [package1, package2, package3, package4];
    processPackages(packages, allRows);
    removeInvalidAccordions(); // 삭제 후 성립되지 않는 아코디언 삭제
  }

  // 아코디언 삭제 함수
  function removeInvalidAccordions() {
    // 모든 아코디언 요소를 선택
    const allAccordions = document.querySelectorAll(".accordion-item");

    allAccordions.forEach((accordion) => {
      const tbody = accordion.querySelector("tbody");

      // 특정 아코디언 제외
      if (accordion.id !== "Accordion1" && accordion.id !== "Accordion2") {
        // tbody가 존재하는 경우
        if (tbody) {
          // 첫 번째 셀 값들을 추출
          const firstCellValues = Array.from(tbody.children).map(
            (row) => row.children[0].innerText
          );

          // 패키지 객체 배열
          const packages = [package1, package2, package3, package4];

          // 해당 아코디언의 패키지 배열 가져오기
          const currentPackage = packages.find(
            (pkg) => pkg.id === accordion.id
          );

          // 패키지가 포함되지 않은 경우 아코디언 삭제
          if (
            currentPackage &&
            !isPackageIncluded(firstCellValues, currentPackage.packageArray)
          ) {
            console.log(
              `패키지가 성립되지 않는 아코디언을 삭제합니다: ${accordion.id}`
            );
            accordion.remove();
          } else {
            console.log(
              `아코디언 ${accordion.id}는 패키지를 포함하고 있습니다.`
            );
          }
        }
      } else {
        console.log(`아코디언 ${accordion.id}는 삭제되지 않습니다.`);
      }

      // tbody가 비어 있는 경우에도 로그
      if (tbody && tbody.children.length === 0) {
        console.log(`아코디언 ${accordion.id}의 tbody가 비어 있습니다.`);
      } else {
        console.log(
          `아코디언 ${accordion.id}의 tbody에 ${
            tbody ? tbody.children.length : 0
          }개의 행이 있습니다.`
        );
        console.log(tbody.children);
      }
    });
  }

  // 행의 데이터를 가져오는 함수
  function getRowData(row) {
    const cells = row.querySelectorAll("td");
    return Array.from(cells).map((cell) => cell.textContent.trim());
  }

  // 모든 행의 첫 번째 셀 값을 가져오는 함수
  function getFirstCellValues(rows) {
    return Array.from(rows)
      .slice(1)
      .map((row) => getFirstCellValue(row));
  }

  // 특정 행의 첫 번째 셀 값을 가져오는 함수
  function getFirstCellValue(row) {
    const firstCell = row.querySelector("td");
    return firstCell ? firstCell.textContent.trim() : "";
  }

  // MutationObserver 설정
  const observer = new MutationObserver(callback);
  observer.observe(tbody, { childList: true });

  console.log("Accordion row observation started for:", accordionId);
}

// 패키지 확인 함수
function isPackageIncluded(firstCellValues, packageArray) {
  return packageArray.every((option) => firstCellValues.includes(option));
}

// 행을 새 아코디언으로 이동시키는 함수
function moveRowsToNewAccordion(selectedRows, newAccordionTbody, discountRate) {
  console.log("moveRowsToNewAccordion 실행됨", selectedRows);
  selectedRows.forEach((row) => {
    row.setAttribute("data-moved", "true");
    applyDiscount(row, discountRate);
    newAccordionTbody.appendChild(row);
  });
}

// 할인율을 적용하는 함수
function applyDiscount(row, discountRate) {
  const originalValue =
    parseFloat(row.cells[2].textContent.replace(/,/g, "")) || 0;
  const discountedValue = originalValue * (1 - discountRate * 0.01);
  row.cells[3].textContent = numberWithCommas(discountedValue);
}
