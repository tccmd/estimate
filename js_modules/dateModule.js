// dateModule.js

export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

// 날짜를 초기화하는 함수
export function initializeDate() {
    const quoteDateElement = document.getElementById('quoteDate');
    const spanElement = quoteDateElement.querySelector('span');
    spanElement.textContent = getCurrentDate();
}