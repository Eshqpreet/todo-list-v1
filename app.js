import express from "express";
import bodyParser from "body-parser";
import date from "./date.js";
//const date = require(__dirname + "./date.js")

console.log(date());

const app = express();

let items = [];
let workItems = [];

//Sets to use ejs as its view enigne. after this we use res.render instead of res.sendFile which renders the view page using ejs;
app.set("view engine", "ejs");

// This is used to add bodyParser function;
app.use(bodyParser.urlencoded({ extended: true }));

//This is used to have static files from public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  let day = date();
  res.render("lists", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
  let item = req.body.newItem; //Takes the input that is requested by the user
  //   console.log(req.body);
  let x = req.body;
  if (x.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("lists", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about",(req,res)=>{
    res.render("about");
})

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
