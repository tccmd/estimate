// data.js

// 가격 데이터와 옵션을 통합한 객체
export const optionsWithPrices = {
  "기본 3D 공간촬영 (20평 기준)": 500000,
  서버유지보수비: 80000,
  "서버유지보수비 1년": 384000,
  "UI 커스텀": 550000,
  "트림 보정작업": 350000,
  태그: 9000,
  "평수 추가": 10000,
  "색감 보정작업": 350000,
  네비게이션: 350000,
  // 구분선은 여기에 포함시키지 않음
  "공간 사진촬영": 450000,
  "공간 마케팅촬영": 700000,
  "드론 항공촬영": 500000,
  인터뷰촬영: 500000,
};

// 옵션 목록 생성
export const options1 = Object.keys(optionsWithPrices).slice(0, 7);
export const options2 = [
  ...Object.keys(optionsWithPrices).slice(7, 9), // 색감 보정작업
  "--------------------------", // 구분선 추가
  ...Object.keys(optionsWithPrices).slice(9), // 나머지 옵션
];

// 패키지 정보
export var package1 = {
  id: "package1",
  packge: "패키지 촬영1",
  packageArray: ["공간 마케팅촬영", "드론 항공촬영", "인터뷰촬영"],
  discount: 10,
  price: 1530000,
};

export var package2 = {
  id: "package2",
  packge: "패키지 촬영2",
  packageArray: ["공간 사진촬영", "공간 마케팅촬영", "드론 항공촬영"],
  discount: 10,
  price: 1485000,
};

export var package3 = {
  id: "package3",
  packge: "패키지 촬영3",
  packageArray: ["공간 사진촬영", "공간 마케팅촬영", "인터뷰촬영"],
  discount: 10,
  price: 1485000,
};

export var package4 = {
  id: "package4",
  packge: "패키지 촬영4",
  packageArray: [
    "공간 사진촬영",
    "공간 마케팅촬영",
    "드론 항공촬영",
    "인터뷰촬영",
  ],
  discount: 20,
  price: 1720000,
};
