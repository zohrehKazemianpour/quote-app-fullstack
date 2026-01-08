import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());

const port = 3000;

const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.use(cors());

app.get("/", (req, res) => {
  const quote = randomQuote();
  res.json(quote);
});

app.post("/", (req, res) => {
  const body = req.body;
  
    if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
      console.error(
        `Failed to extract quote and author from post body: ${body}`
      );
      res
        .status(400)
        .send(
          "Expected body to be a JSON object containing keys quote and author."
        );
      return;
    }
    quotes.push({
      quote: body.quote,
      author: body.author,
    });
    res.send("ok");
  });

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});
