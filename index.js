const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
let db = null;

const dbPath = path.join(__dirname, "goodreads.db");

const initializationDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Db Error:${e.message}`);
    process.exit(1);
  }
};
initializationDbAndServer();

app.get("/books/", async (request, response) => {
  const getBooksArray = `
    SELECT *
    FROM 
    book
    ORDER BY
    book_id;`;
  const booksArray = await db.all(getBooksArray);
  response.send(booksArray);
});
