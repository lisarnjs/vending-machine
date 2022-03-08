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
  if (pay==="card" && cardMoney !== 0) {
    alert("구매 종료 후 진행해주세요");
  } else {
    pay = "cash";
    sectionCash.style.display = "block";
    sectionCard.style.display = "none";
  }
})
card.addEventListener("click", ()=>{
  if(pay === "cash" && money !== 0){
    alert("구매 종료 후 진행해주세요");
  } else {
    pay = "card";
    sectionSelectDrink.style.display ="none";
    sectionCash.style.display = "none";
    sectionCard.style.display = "block";
    cardMoney = prompt("고객님의 카드 잔액은?");
    while(isNaN(cardMoney)){
      cardMoney = prompt("다시 입력해주세요! 고객님의 카드 잔액은?");
    }
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;
  }
})

cashInputBtn.addEventListener("click", () => {
  PrintInput();
})

cokeEl.addEventListener("click", ()=>{
  cokeCount = SelectDrink("coke", cokePrice, cokeCount, "first-child");
})

waterEl.addEventListener("click", ()=>{
  waterCount = SelectDrink("water", waterPrice, waterCount, "nth-child(2)");
})

coffeeEl.addEventListener("click", ()=>{
  coffeeCount = SelectDrink("coffee", coffeePrice, coffeeCount, "last-child");
})

buyListEl.querySelector("#changeBtn").addEventListener("click", () => {
  BuyingDone();
})

function SelectDrink(drink, price,count,child) {
  if(pay === "cash" && money >= price) {
    alert(`${drink} 나왔습니다!`);
    count += 1;
    buyListEl.querySelector(`ul>li:${child}>span`).innerHTML = `${count}개`;
    money -= price;
    change.innerHTML = `잔액 : ${money}원`;
    
  } 
  else if (pay === "cash" && money <= price) {
    alert("잔액 부족! 현금을 더 투입하세요.");
    
  } 
  else if (pay === "card" && cardMoney >= price) {
    alert(`${drink} 나왔습니다!`);
    count += 1;
    buyListEl.querySelector(`ul>li:${child}>span`).innerHTML = `${count}개`;
    cardMoney -= price;
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;
    
  } 
  else if (pay === "card" && cardMoney <= price) {
    alert ("잔액이 부족합니다.")
  } 
  else {
    alert("결제수단을 먼저 선택해주세요.");
  }
  return count;
}


const BuyingDone = () => {
  alert(`구입 내역 : 콜라 ${cokeCount}개 / 물 ${waterCount}개 / 커피 ${coffeeCount}개`);

  cokeCount = 0;
  waterCount = 0;
  coffeeCount = 0;
  buyListEl.querySelectorAll("span").forEach((current) => {
    current.innerHTML = "0개";
  })

  if(pay === "cash" && money===0){
    alert("반환할 잔돈이 없습니다!")
  } else if(pay === "cash" && money!==0) {
    alert(`잔돈 반환 : ${money}원`);
    money = 0;
    change.innerHTML = `잔액 :  ${money}원`;
  } else if (pay === "card") {
    alert("맛있게 드세요~~~ :)");
    cardMoney = 0;
    sectionCard.querySelector("p").innerHTML = `카드 잔액 : ${cardMoney}원`;
  }
  pay=null;
}


const PrintInput = () => {
  if (isNaN( parseInt(cashInput.value) )) {
    alert("다시 입력해주세요!");
    cashInput.value="";
  } else {
    money += parseInt(cashInput.value);

    if(money % 100 <= 99 && money % 100 >= 1){
      alert("1원, 10원 단위는 받지 못합니다...");
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

  
}


