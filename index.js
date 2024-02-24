import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let  yn=false;

app.get("/", (req, res) => {
  yn=false;
  res.render("index.ejs",{yn:yn});
});

  app.post("/submit", (req, res) => {
    let URL = req.body["url"];

    if (URL !== "") {
      yn = true; 
      var qr_svg = qr.image(URL);
      qr_svg.pipe(fs.createWriteStream("public/qr_img.png"));
    }
  
    res.render("index.ejs", { yn: yn });
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
