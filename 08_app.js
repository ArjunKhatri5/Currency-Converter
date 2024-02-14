const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector("#selectFrom");
let toCurr = document.querySelector("#selectTo");
let msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
})



for( let select of dropdown){
    for(let currencyCode in countryList){
        let option = document.createElement("option");
        option.value = currencyCode;
        option.appendChild(document.createTextNode(currencyCode));
        if(select.name  === "from" && currencyCode === "USD"){
            option.selected = "selected";
        } else if(select.name  === "to" && currencyCode === "INR"){
            option.selected = "selected";
        }
        select.appendChild(option);
    }  

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
};


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}




btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    }
);



const updateExchangeRate = async ()=>{
    let amount = document.querySelector("#inputAmount");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = 1;
    }

    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response =(await fetch(URL));
    let data = await response.json();


    let rate = data[toCurr.value.toLowerCase()];
    

    let exchangedvalue = amountValue * rate;

    msg.innerText = `${amountValue} ${fromCurr.value} = ${exchangedvalue} ${toCurr.value}`;
}