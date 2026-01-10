
const quotesP = document.getElementById("quote");
const authorP = document.getElementById("author");
const initialView = document.getElementById("initial-view");
const quoteView = document.getElementById("quote-view");
const startBtn = document.getElementById("start-btn");
const newQuoteBtn = document.getElementById("new-quote");
const userInputText = document.getElementById("new-quote-text");
const userInputAuthor = document.getElementById("new-quote-author");
const quoteForm = document.getElementById("quote-form"); 
const submissionStatus = document.getElementById("submit-status");



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
      const res = await fetch(
        "https://zohreh-quote-generator-backend.hosting.codeyourfuture.io"
      );
      const data = await res.json();
      quotesP.innerText = data.quote;
      authorP.innerText = `- ${data.author}`;
    } catch (error) {
      
      quotesP.innerText = "Ouch! Something went wrong.";
      console.error("Fetch error:", error);
    }

}

quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userQuote = userInputText.value.trim();
  const userAuthor = userInputAuthor.value.trim();

  if (!userQuote || !userAuthor) {
    submissionStatus.textContent = "Both fields are required.";
    return;
  }

  const res = await fetch(
    "https://zohreh-quote-generator-backend.hosting.codeyourfuture.io",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quote: userQuote, author: userAuthor }),
    }
  );

  if (res.ok) {
    submissionStatus.textContent = "Your quote is now in the collection.!";
    userInputText.value = "";
    userInputAuthor.value = "";
  } else {
    submissionStatus.textContent = "Something went wrong.";
  }
});
