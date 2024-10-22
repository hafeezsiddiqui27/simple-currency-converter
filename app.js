const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromcurr = document.querySelector(".From select");
const tocurr = document.querySelector(".To select")
const msg = document.querySelector(".msg")



for(let select of dropdowns){
    for (let currCode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currCode
        newoption.value = currCode
        if (select.name === "from" && currCode === "USD") {
            newoption.selected="selected"
        }
        else if(select.name === "To" && currCode === "PKR") {
            newoption.selected = "selected";
        }
        select.append(newoption)
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
    })
}

const updateflag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img")
    img.src = newsrc
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate()
})
   
 const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value
    console.log(amtval);
    
    if (amtval === "" || amtval < 1) {
        amtval = 1
        amount.value = "1"
    }
   
    console.log(fromcurr.value, tocurr.value);
    
    // const URL = `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
    const URL = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL)
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate);

    let finalRate = amtval * rate
    msg.innerText = ` ${amtval} ${fromcurr.value} IS EQUAL TO ${finalRate} ${tocurr.value} `

}


window.addEventListener("load" ,() => {
    updateExchangeRate()
})