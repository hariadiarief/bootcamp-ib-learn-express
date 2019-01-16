const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

let ancalagons = {
  next_id: 13,
  data: [
    {
      id: 1,
      name: "Arsyad",
      gender: "Male"
    },
    {
      id: 2,
      name: " Gatot",
      gender: "Male"
    },
    {
      id: 3,
      name: "Lion",
      gender: "Male"
    },
    {
      id: 4,
      name: " Manda",
      gender: "Female"
    },
    {
      id: 5,
      name: "Dheta",
      gender: "Female"
    },
    {
      id: 6,
      name: " Furqan",
      gender: "Male"
    },
    {
      id: 7,
      name: "Ipul",
      gender: "Male"
    },
    {
      id: 8,
      name: "Iwin",
      gender: "Male"
    },
    {
      id: 9,
      name: "Adi",
      gender: "Male"
    },
    {
      id: 10,
      name: "Panji",
      gender: "Male"
    },
    {
      id: 11,
      name: "Rina",
      gender: "Female"
    },
    {
      id: 12,
      name: "Yusuf",
      gender: "Male"
    }
  ]
};

//get hello world
app.get("/", (req, res) => {
  res.send({
    massage: "Hallo Ancalagon"
  });
});

//get all ancalagons items
app.get("/ancalagons", (req, res) => {
  res.send({
    count: ancalagons.length,
    data: ancalagons
  });
});

//get ancalagon by ID
app.get("/ancalagons/:id", (req, res) => {
  const ancalagon = ancalagons.data.find(ancalagon => {
    return ancalagon.id === Number(req.params.id);
  });

  res.send({
    data: ancalagon
  });
});
//seacrh ancalagon by name
app.get("/ancalagons/search", (req, res) => {
  const queryName = req.query.name.toLowerCase();

  const foundAncalagon = ancalagons.data.filter(ancalagon => {
    return ancalagon.name.toLowerCase().includes(queryName);
  });

  res.send({
    query: req.query,
    data: foundAncalagon
  });
});

//seacrh ancalagon by name and gender
app.get("/ancalagons/search", (req, res) => {
  const queryName = req.query.name.toLowercase();
  const gender = req.query.gender.toLowerCase();

  const foundAncalagon = ancalagons.data.filter(ancalagon => {
    return (
      ancalagon.name
        .toLocaleLowerCase()
        .includes(queryName.toLocaleLowerCase()) &&
      ancalagon.gender.toLocaleLowerCase().includes()(
        queryName.toLocaleLowerCase()
      )
    );
  });
  res.send({
    data: foundAncalagon
  });
});

//Add new member of ancalagons
app.post("/ancalagons", (req, res) => {
  const newAncalagon = {
    id: ancalagons.next_id,
    name: req.body.name,
    gender: req.body.gender
  };

  const newAncalagons = {
    next_id: ancalagons.next_id + 1,
    data: ancalagons.data.concat(newAncalagon)
  };

  ancalagons = newAncalagons;

  res.send({
    newData: newAncalagon,
    data: ancalagons
  });
});

//Delete All Ancalagon
app.delete("/ancalagons", (req, res) => {
  ancalagons.data.splice(0, ancalagons.data.length);

  res.send({
    data: ancalagons.data
  });
});

//Delete Ancalagon by ID
app.delete("/ancalagons/:id", (req, res) => {
  const deleteAncalagon = ancalagons.data.filter(
    item => item.id != Number(req.params.id)
  );
  ancalagons.data = deleteAncalagon;

  res.send({
    data: ancalagons.data
  });
});

//Editing ancalagon by ID
app.put("/ancalagons/:id", (req, res) => {
  const editedAncalagon = ancalagons.data.filter(ancalagon => {
    if (ancalagon.id === Number(req.params.id)) {
      return Object.assign(ancalagon, req.body);
    } else {
      return ancalagon;
    }
  });

  ancalagons = { data: editedAncalagon };

  res.send({
    next_id: ancalagons.next_id,
    data: editedAncalagon
  });
});

app.listen(port, err => {
  console.log(`Server running at http://localhost:${port}`);
});
