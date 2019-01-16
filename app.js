const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const ancalagons = {
  next_id: 13,
  data: [
    {
      id: 1,
      name: "Arsyad",
      gander: "Male"
    },
    {
      id: 2,
      name: " Gatot",
      gander: "Male"
    },
    {
      id: 3,
      name: "Lion",
      gander: "Male"
    },
    {
      id: 4,
      name: " Manda",
      gander: "Female"
    },
    {
      id: 5,
      name: "Dheta",
      gander: "Female"
    },
    {
      id: 6,
      name: " Furqan",
      gander: "Male"
    },
    {
      id: 7,
      name: "Ipul",
      gander: "Male"
    },
    {
      id: 8,
      name: "Iwin",
      gander: "Male"
    },
    {
      id: 9,
      name: "Adi",
      gander: "Male"
    },
    {
      id: 10,
      name: "Panji",
      gander: "Male"
    },
    {
      id: 11,
      name: "Rina",
      gander: "Female"
    },
    {
      id: 12,
      name: "Yusuf",
      gander: "Male"
    }
  ]
};

app.get("/", (req, res) => {
  res.send({
    massage: "Hallo Ancalagon"
  });
});

app.get("/ancalagons", (req, res) => {
  res.send({
    count: ancalagons.length,
    data: ancalagons
  });
});

app.get("/ancalagons/:id", (req, res) => {
  const ancalagon = ancalagons.data.find(ancalagon => {
    return ancalagon.id === Number(req.params.id);
  });

  res.send({
    data: ancalagon
  });
});

app.post("/ancalagons", (req, res) => {
  const newAncalagon = {
    id: ancalagons.next_id,
    name: req.body.name,
    gender: req.body.gender
  };

  ancalagons.data.push(newAncalagon);
  ancalagons.next_id += 1;

  res.send({
    newData: newAncalagon,
    data: ancalagons
  });
});

app.listen(port, err => {
  console.log(`Server running at http://localhost:${port}`);
});
