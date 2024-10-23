// 클릭 이벤트 리스너를 추가할 요소 가져오기 (비고)
const toggleButtonsTrigger = document.querySelector(".form-group");

// 클릭 이벤트 리스너 추가
toggleButtonsTrigger.addEventListener("click", function () {
  toggleAllAccordionButtons();
});

// 모든 아코디언 테이블의 버튼들을 토글하는 함수 (비고)
export default function toggleAllAccordionButtons(open = true) {
  console.log("실행됨");
  // 모든 아코디언 아이템을 찾아서 버튼들을 설정
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((accordionItem) => {
    const buttons = accordionItem.querySelectorAll(".btn");
    buttons.forEach((button) => {
      const computedStyle = getComputedStyle(button);
      if (open) {
        button.style.display =
          computedStyle.display === "inline-block" ? "none" : "inline-block";
        // button.style.display = 'inline-block';
      } else {
        button.style.display = "none";
      }
    });
  });
}