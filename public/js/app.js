const goBtn = document.querySelector("form");

goBtn.addEventListener("submit", e => {
  e.preventDefault();
  let name=document.querySelector("#name")
  name.innerText = "Loading";

  const coin = document.querySelector("#coin").value;
  const currency = document.querySelector("#currency").value;

  const url = `/price?coin=${coin}&currency=${currency}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        return (name.innerText = "Failed");
        }
      const price ="Price : " +data.Price.toFixed(currency === "btc" ? 8 : 2) +" " +currency.toUpperCase();
      const volume24 ="24H Volume : " +(data.Volume_24h / 1000000000).toFixed(currency === "btc" ? 8 : 2) +` B ${currency.toUpperCase()}`;

      name.innerText = data.Name;
      document.querySelector("#label").innerText = "Label : " + data.Label;
      document.querySelector("#price").innerText = price;
      document.querySelector("#volume24").innerText = volume24;
    })
    .catch(err => {
      name.innerText = "Failed";
    });
});
