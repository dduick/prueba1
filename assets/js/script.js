const monedasSection = document.querySelector(".monedas");
const btnUSD = document.getElementById("btnUSD");
const btnGBP = document.getElementById("btnGBP");
const btnEURO = document.getElementById("btnEURO");
const btnMostrarTodos = document.getElementById("btnMostrarTodos");
const apiURL = "https://api.coindesk.com/v1/bpi/currentprice.json";

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
    monedasSection.innerHTML = template;
}

async function renderMonedas() {
    const monedas = await getMonedas();
    let template = "";
    // Mostrar datos de todas las monedas al principio
    for (const moneda in monedas) {
        template += `
            <div class="moneda">
                <h3>${moneda}</h3>
                <p>${monedas[moneda].rate}</p>
                <p>${monedas[moneda].description}</p>
            </div>
        `;
    }
    monedasSection.innerHTML = template;

    // Agregar event listeners a los botones para filtrar por moneda
    btnUSD.addEventListener("click", () => renderMoneda("USD"));
    btnGBP.addEventListener("click", () => renderMoneda("GBP"));
    btnEURO.addEventListener("click", () => renderMoneda("EUR"));

    // Agregar event listener al botón de "Mostrar Todos"
    btnMostrarTodos.addEventListener("click", renderMonedas);
}

renderMonedas();