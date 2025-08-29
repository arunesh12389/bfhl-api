const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const FULL_NAME = "Arunesh Bhatt";
const DOB = "27052003"; 
const EMAIL = "a@gmail.com";
const ROLL_NUMBER = "22BCE7905";

function isNumber(str) {
  return !isNaN(str);
}

function alterCapsReverse(str) {
  let reversed = str.split("").reverse().join("");
  return reversed
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}


app.get("/", (req, res) => {
  res.send("Hello, your server is running!");
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
    message: "BFHL API is live. Use POST /bfhl to process data."
  });
});


app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let concatString = "";

    data.forEach((item) => {
      if (isNumber(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatString += item;
      } else {
        special_characters.push(item);
      }
    });

    let response = {
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alterCapsReverse(concatString)
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
