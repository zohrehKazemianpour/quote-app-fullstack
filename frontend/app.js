
const quotesP = document.getElementById("quote");
const authorP = document.getElementById("author");
const initialView = document.getElementById("initial-view");
const quoteView = document.getElementById("quote-view");
const startBtn = document.getElementById("start-btn");
const newQuoteBtn = document.getElementById("new-quote");

function switchToQuoteView() {
  initialView.style.display = "none";
  quoteView.style.display = "block";
}
function showFirstQuote() {
  switchToQuoteView();
  getQuotes()
}




startBtn.addEventListener("click", showFirstQuote);
newQuoteBtn.addEventListener("click", getQuotes);

async function getQuotes () {
    quotesP.innerText = "Loading inspiration...";
    authorP.innerText = "";
    try {
      const res = await fetch("http://127.0.0.1:3000/");
      const data = await res.json();
      quotesP.innerText = data.quote;
      authorP.innerText = `- ${data.author}`;
    } catch (error) {
      
      quotesP.innerText = "Ouch! Something went wrong.";
      console.error("Fetch error:", error);
    }

  


}


