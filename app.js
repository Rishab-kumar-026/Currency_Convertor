// Base URL of API that has all curenncy values
const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const drop_down = document.querySelectorAll(".drop_down select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const message = document.querySelector(".msg");


for (let select of drop_down) {
    for (let currCode in countryList) {
        let new_option = document.createElement("option");
        new_option.innerText = currCode;
        new_option.value = currCode;
        if (select.id === "from" && currCode === "USD") {
            new_option.selected = "selected";
        }
        else if (select.id === "to" && currCode === "INR") {
            new_option.selected = "selected";
        }
        select.append(new_option);

        select.addEventListener("change", (event) => {
            update_flag_img(event.target);
        })

    }

}

const update_exchange_rate = async () => {
    let amount = document.querySelector(" form input");
    let amount_value = amount.value;
    if (amount === "" || amount < 1) {
        amount = 1;
        amount_value = "1";
    }

    const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let exchange_rate = data[toCurr.value.toLowerCase()];

    let final_value = amount_value * exchange_rate;
    console.log(final_value);
    message.innerText = `${amount_value} ${fromCurr.value} = ${final_value} ${toCurr.value}`;
};

const update_flag_img = (result) => {
    let currCode = result.value;
    let countryName = countryList[currCode];
    let new_img_src = `https://flagsapi.com/${countryName}/flat/64.png`;
    let img = result.parentElement.querySelector("img");
    img.src = img;

}

window.addEventListener("load", () => {
    update_exchange_rate();
});
button.addEventListener("click", (event) => {
    event.preventDefault();
    update_exchange_rate();
});
