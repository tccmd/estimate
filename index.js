import { initializeDate } from "./js_modules/dateModule.js";
import { createAccordionAsync } from "./js_modules/accordion.js";
import { initializeScreenshot } from "./js_modules/screenshot.js";
import { options1, options2 } from "./js_modules/data.js";
import { selectRequiredOptionsOnce } from "./js_modules/row.js";

// 페이지 로드 시 초기화 함수 호출
window.onload = function () {
  initialize();
};

// 초기화 함수
function initialize() {
  // 현재 날짜 초기화
  initializeDate();
  // 스크린샷
  initializeScreenshot();
  // 아코디언1 생성 후 필수 옵션 모두 선택
  createAccordionAsync("Accordion1", "필수 사항", options1).then(
    selectRequiredOptionsOnce.bind(null, "Accordion1")
  ); // 아코디언 생성 후 옵션 모두 선택
  createAccordionAsync("Accordion2", "선택 사항", options2);
}
