const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

const data = [
  {
    id: 1,
    name: "Abdi",
    email: "abdi@email.com",
    password: "P@ssw0rd",
    is_active: "true",
  },
  {
    id: 2,
    name: "raihan",
    email: "raihan@email.com",
    password: "P@ssw0rd",
    is_active: "true",
  },
  {
    id: 3,
    name: "Udin",
    email: "udin@email.com",
    password: "salah",
    is_active: "false",
  },
];

// Function Get User By Name
const getUserFilterHandler = (req, res) => {
  const name = req.query.name;
  const is_active = req.query.is_active;

  const filterData = data.filter((user) => {
    if (name !== undefined && is_active !== undefined) {
      if (is_active === "false") {
        return res.json("User is not active");
      } else {
        return name === user.name && is_active === user.is_active;
      }
    } else if (name !== undefined) {
      return name === user.name;
    } else if (is_active !== undefined) {
      return is_active === user.is_active;
    } else {
      return user;
    }
  });
  res.json(filterData);
};

// Function Create Data User
const createUserHandler = (req, res) => {
  req.body.id = data.length + 1;
  const { name, email, password, is_active } = req.body;

  if (!name || !email || !password || !is_active) {
    res.status(400).send("Name and is_active can't be empty !");
    return;
  }

  data.push(req.body);
  res.status(201).send(data);
  return;
};

// Function Get data By id
const getUserByIdHandler = (req, res) => {
  const { id } = req.params;

  const filterUser = data.filter((datas) => datas.id === parseInt(id));

  if (filterUser == 0) {
    res.status(404).send("User Id Not Found !");
  } else {
    res.send(filterUser);
  }
  return;
};

// Function Update By id
const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, password, is_active } = req.body;

  const filterUser = data.filter((datas) => datas.id === parseInt(id));

  if (filterUser.length === 0) {
    res.status(404).send("User Not Found by id");
    return;
  }
  const updateUser = data.map((datas) => {
    if (datas.id === parseInt(id)) {
      datas.name = name;
      datas.email = email;
      datas.password = password;
      datas.is_active = is_active;
    }
    return datas;
  });
  res.json(updateUser);
  return;
};

// Function Delete By id
const deleteUserByidHandler = (req, res) => {
  const { id } = req.params;

  const filterUser = data.filter((datas) => datas.id !== parseInt(id));
  if (filterUser.length >= 0) {
    res.send(filterUser);
    return;
  } else {
    res.status(404).send("User Id Is Not FOund");
  }
  return;
};

app.get("/user", getUserFilterHandler);
app.post("/user", createUserHandler);
app.get("/user/:id", getUserByIdHandler);
app.put("/user/:id", updateUserById);
app.delete("/user/:id", deleteUserByidHandler);

app.listen(PORT, () => {
  console.log(`Express nyala di http://localhost:${PORT}`);
});
