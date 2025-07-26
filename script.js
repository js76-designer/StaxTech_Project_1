const apiKey = "07e8126bfe-b0701a46a1-szyupe";

const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const convertBtn = document.getElementById("convert");

async function loadCurrencies() {
  try {
    const response = await fetch(`https://api.fastforex.io/currencies?api_key=${apiKey}`);
    const data = await response.json();

    if (!data || !data.currencies) throw new Error("Currency data not available.");

    const currencies = data.currencies;
    for (let code in currencies) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.textContent = `${code} - ${currencies[code]}`;
      option2.textContent = `${code} - ${currencies[code]}`;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    console.error("❌ Failed to load currencies:", error);
    resultDiv.textContent = "❌ Unable to load currencies.";
  }
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (!from || !to || isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    const url = `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.result || data.result[to] === undefined) throw new Error("Conversion failed.");

    const converted = data.result[to];
    resultDiv.textContent = `💵 ${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    console.error("❌ Conversion error:", error);
    resultDiv.textContent = "❌ Failed to convert currency.";
  }
}

convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("DOMContentLoaded", loadCurrencies);