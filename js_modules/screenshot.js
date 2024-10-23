import toggleAllAccordionButtons from "./buttonToggle.js";

// 스크린샷 전에 숨기는 함수
function hideSelectBoxForScreenshot() {
  const accordion1Row = document.querySelector(
    "#Accordion1 tbody tr:nth-child(1)"
  );
  const accordion2Row = document.querySelector(
    "#Accordion2 tbody tr:nth-child(1)"
  );

  if (accordion1Row) accordion1Row.style.display = "none"; // Accordion1의 두 번째 행 숨기기
  if (accordion2Row) accordion2Row.style.display = "none"; // Accordion2의 두 번째 행 숨기기
}

// 스크린샷 후에 다시 표시하는 함수
function showSelectBoxAfterScreenshot() {
  const accordion1Row = document.querySelector(
    "#Accordion1 tbody tr:nth-child(1)"
  );
  const accordion2Row = document.querySelector(
    "#Accordion2 tbody tr:nth-child(1)"
  );

  if (accordion1Row) accordion1Row.style.display = ""; // Accordion1의 두 번째 행 다시 표시
  if (accordion2Row) accordion2Row.style.display = ""; // Accordion2의 두 번째 행 다시 표시
}

// 아코디언을 닫는 함수
function closeAccordionIfRowsLessThanTwo() {
  const accordion2Rows = document.querySelectorAll("#Accordion2 tbody tr");

  if (accordion2Rows.length <= 1) {
    const accordion2 = document.querySelector("#Accordion2");
    if (accordion2) {
      const collapseDiv = accordion2.querySelector(".accordion-collapse");
      if (collapseDiv) {
        collapseDiv.classList.remove("show"); // 아코디언을 닫기 위해 'show' 클래스를 제거
        // collapseDiv.style.display = "none"; // 아코디언 내용 영역 숨기기
      }
    }
  }
}

function screenshot() {
  // 버튼 숨기기
  toggleAllAccordionButtons(false);

  // 셀렉트 박스 숨기기
  hideSelectBoxForScreenshot();

  // Accordion2의 행이 2개 이하이면 닫기
  closeAccordionIfRowsLessThanTwo();

  // 현재 페이지 스크롤 위치 저장
  const originalScrollY = window.scrollY;

  // 페이지 맨 위로 스크롤
  window.scrollTo(0, 0);

  var storeName = document.getElementById("storeName").value;

  // 스크롤 위치가 맨 위로 이동한 후 스크린샷 찍기
  setTimeout(() => {
    // 현재 페이지 전체를 스크린샷으로 찍기
    window.scrollTo(0, 0);
    html2canvas(document.body, {
      scale: 2,
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    }).then(function (canvas) {
      // 이미지 데이터 URL 얻기
      var imageDataURL = canvas.toDataURL("image/png");

      // 파일명 설정 (storeName을 이용하여 동적으로 생성)
      var fileName = storeName ? `${storeName} 견적서.png` : "견적서.png";

      // 이미지를 저장할 링크 생성
      var downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = fileName;

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

export function initializeScreenshot() {
  // 견적서 헤더를 탭하면 스크린샷하는 이벤트 리스너 추가
  document.getElementById("header").addEventListener("click", screenshot);
}
