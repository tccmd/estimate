import { optionsWithPrices } from "./data.js";

// 숫자에 쉼표를 추가하는 함수
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 옵션에 따른 기본 단가를 반환하는 함수
export function getUnitPrice(option) {
  return optionsWithPrices[option] || 0; // 가격이 존재하지 않으면 0 반환
}

// 공급가합계를 업데이트하는 함수
export function updateTotal() {
  var totalAmountElement = document.getElementById("totalAmount");
  var resultElements = document.querySelectorAll(".result");
  var totalAmount = 0;

  resultElements.forEach(function (resultElement) {
    var result = parseFloat(resultElement.textContent.replace(/,/g, "")) || 0;
    totalAmount += result;
  });

  // 부가세 포함 합계 계산
  var vatRate = 0.1; // 10%
  var totalWithVatElement = document.getElementById("totalWithVat1");
  var totalWithVatElement2 = document.getElementById("totalWithVat2");
  var totalWithVatElement3 = document.getElementById("totalWithVat3");
  var vatIncludedTotal = totalAmount + totalAmount * vatRate; // assuming 10% VAT

  // 특정 형식으로 포맷팅
  var formattedVatIncludedTotal = numberToKorean(Math.floor(vatIncludedTotal));

  // 결과 업데이트
  totalAmountElement.textContent = numberWithCommas(totalAmount);
  totalWithVatElement.textContent = formattedVatIncludedTotal;
  totalWithVatElement2.textContent = numberWithCommas(vatIncludedTotal);
  totalWithVatElement3.textContent = " 원)";
}

// 네 번째 열(합계)을 계산하고 업데이트하는 함수
export function updateProduct(row) {
  var quantity = row.querySelector("td:nth-child(2) input").value;
  var unitPrice =
    parseFloat(
      row.querySelector("td:nth-child(3)").textContent.replace(/,/g, "")
    ) || 0;
  // var unitPrice = row.querySelector("td:nth-child(3)").textContent;
  var product = quantity * unitPrice;

  // 숫자에 콤마 추가
  row.querySelector("td:nth-child(4)").textContent = numberWithCommas(product);

  // 합계 업데이트 호출
  updateTotal();
}

// 숫자를 한글로 변환하는 함수
export function numberToKorean(number) {
  var units = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  var positions = ["", "십", "백", "천"];

  var result = "";
  var numberString = String(Math.floor(number));

  for (var i = 0; i < numberString.length; i++) {
    var digit = parseInt(numberString.charAt(i));
    var position = (numberString.length - i - 1) % 4;

    if (digit !== 0) {
      result += units[digit] + positions[position];
    }

    if (position === 0 && digit !== 0 && i < numberString.length - 1) {
      // 만, 억, 조 등의 자리수일 때
      result += getUnitName(numberString.length - i - 1);
    }
  }

  return result + " 원정";
}

// 자리수에 따른 큰 단위 이름 가져오기
export function getUnitName(position) {
  var units = ["", "만", "억", "조", "경", "해"];
  return units[Math.floor(position / 4)];
}
