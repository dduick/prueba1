const divmonedas = document.querySelector(".monedas");
const btnUSD = document.querySelector("#btnUSD");
const btnGBP = document.querySelector("#btnGBP");
const btnEUR = document.querySelector("#btnEUR");
const btnMostrarTodos = document.querySelector("#btnMostrarTodos");
const apiURL ="https://api.coindesk.com/v1/bpi/currentprice.json";

async function getMonedas() {
    const res = await fetch(apiURL);
    const data = await res.json();
    return data.bpi;
}

async function renderMoneda(moneda) {
    const monedas = await getMonedas();
    let template = "";
    template += `
    <div class="moneda">
         <h3>${moneda}</h3>
         <p>${monedas[moneda].rate}</p>
         <p>${monedas[moneda].description}</p>
    </div>
    `;

    divmonedas.innerHTML = template;
}

async function renderMonedas() {
    const monedas = await getMonedas();
    let  template = "";
    for (const moneda in monedas) {
        template += `
        <div class="moneda">
            <h3>${moneda}</h3>
            <p>${monedas[moneda].rate}</p>
            <p>${monedas[moneda].description}</p>
        </div>
        `;
    }
    divmonedas.innerHTML = template;

    btnUSD.addEventListener("click", () => renderMoneda("USD"));
    btnGBP.addEventListener("click", () => renderMoneda("GBP"));
    btnEUR.addEventListener("click", () => renderMoneda("EUR"));
    btnMostrarTodos.addEventListener("click", renderMonedas);
}
renderMonedas();