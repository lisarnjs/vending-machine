const cokeEl = document.querySelector("#coke");
const waterEl = document.querySelector("#water");
const coffeeEl = document.querySelector("#coffee");
const cash = document.querySelector("#cash");
const card = document.querySelector("#card");
const sectionCash = document.querySelector("section.pay-cash");
const sectionCard = document.querySelector("section.pay-card");
const cashInput = document.querySelector("section.pay-cash>input");
const cashInputBtn = document.querySelector(".pay-cash__btn");
const cashList = document.querySelectorAll("ul.cash-list>li");
const sectionSelectDrink = document.querySelector("section.select-drink");
const change = document.querySelector("section.select-drink>.select-drink__change");
const buyListEl = document.querySelector("section.buy-list");

const cokePrice = 1100;
const waterPrice = 600;
const coffeePrice = 700;

let cokeCount = 0;
let waterCount = 0;
let coffeeCount = 0;

let pay = null;
let money = 0;
let cardMoney = 0;

cokeEl.querySelector("span").innerHTML = `${cokePrice}원`;
waterEl.querySelector("span").innerHTML = `${waterPrice}원`;
coffeeEl.querySelector("span").innerHTML = `${coffeePrice}원`;

cash.addEventListener("click", ()=>{
  pay = "cash";
  sectionCash.style.display = "block";
  sectionCard.style.display = "none";
})
card.addEventListener("click", ()=>{
  pay = "card";
  buyListEl.querySelector("#changeBtn").innerHTML = "구매 종료";
  sectionCash.style.display = "none";
  sectionCard.style.display = "block";
  cardMoney = prompt("고객님의 카드 잔액은?");
  sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}`;
})

cashInputBtn.addEventListener("click", () => {
  PrintInput();
})

cokeEl.addEventListener("click", ()=>{
  if(pay === "cash" && money >= cokePrice) {

    alert("cash 콜라 살 수 있음~");
    cokeCount += 1;
    buyListEl.querySelector("ul>li:first-child>span").innerHTML = `${cokeCount}개`;
    money -= cokePrice;
    change.innerHTML = `잔액 : ${money}원`;

  } else if (pay === "cash" && money <= cokePrice) {

    alert ("잔액 부족! 현금을 더 투입하세요.");

  } else if (pay === "card" && cardMoney >= cokePrice) {

    alert("card 콜라~");
    cokeCount += 1;
    buyListEl.querySelector("ul>li:first-child>span").innerHTML = `${cokeCount}개`;
    cardMoney -= cokePrice;
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;

  } else if (pay === "card" && cardMoney <= cokePrice) {

    alert ("잔액이 부족합니다.")

  } else {

    alert("결제수단을 먼저 선택해주세요.");

  }
})
waterEl.addEventListener("click", ()=>{
  if(pay === "cash" && money >= waterPrice) {

    alert("cash 물 살 수 있음~");
    waterCount += 1;
    buyListEl.querySelector("ul>li:nth-child(2)>span").innerHTML = `${waterCount}개`;
    money -= waterPrice;
    change.innerHTML = `잔액 : ${money}원`;

  } else if (pay === "cash" && money <= waterPrice) {

    alert("잔액 부족! 현금을 더 투입하세요.");

  } else if (pay === "card" && cardMoney >= waterPrice) {

    alert("card 물~");
    waterCount += 1;
    buyListEl.querySelector("ul>li:nth-child(2)>span").innerHTML = `${waterCount}개`;
    cardMoney -= waterPrice;
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;

  } else if (pay === "card" && cardMoney <= waterPrice) {

    alert ("잔액이 부족합니다.")

  } else {

    alert("결제수단을 먼저 선택해주세요.");

  }
})
coffeeEl.addEventListener("click", ()=>{
  if(pay === "cash" && money >= coffeePrice) {

    alert("cash 커피 살 수 있음~");
    coffeeCount += 1;
    buyListEl.querySelector("ul>li:last-child>span").innerHTML = `${coffeeCount}개`;
    money -= coffeePrice;
    change.innerHTML = `잔액 : ${money}원`;

  } else if (pay === "cash" && money <= coffeePrice) {

    alert("잔액 부족! 현금을 더 투입하세요.");

  } else if (pay === "card" && cardMoney >= coffeePrice) {

    alert("card 커피~");
    coffeeCount += 1;
    buyListEl.querySelector("ul>li:last-child>span").innerHTML = `${coffeeCount}개`;
    cardMoney -= coffeePrice;
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;

  } else if (pay === "card" && cardMoney <= coffeePrice) {

    alert ("잔액이 부족합니다.")

  } else {

    alert("결제수단을 먼저 선택해주세요.");

  }
})

buyListEl.querySelector("#changeBtn").addEventListener("click", () => {
  if(pay === "cash" && money===0){
    alert("반환할 잔돈이 없습니다!")
  } else if(pay === "cash" && money!==0) {
    alert(`잔돈 반환 : ${money}원`);
    money = 0;
    change.innerHTML = `잔액 :  ${money}원`;
  } else if (pay === "card") {
    alert("맛있게 드세요~~~:)");
    cardMoney = 0;
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;
  }
  
})

const PrintInput = () => {
  money += parseInt(cashInput.value);

  if(money % 100 <= 99 && money % 100 >= 1){
    alert("10원 단위는 받지 못합니다...");
    let payBack = money % 100;
    money = money - payBack;
    alert(`돌려드린 금액 : ${payBack}원 / 넣으신 금액 : ${money}원`);
    cashInput.value="";
  } else {
    alert("넣으신 금액 : " + money);
    cashInput.value="";
  }
  change.innerHTML = `잔액 : ${money}원`;
  sectionSelectDrink.style.display ="block";
}


