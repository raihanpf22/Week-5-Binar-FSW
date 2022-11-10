const User = require("./user");
const data = require("./users.json");

function handleCreateUser(req, res) {
  const user = User.create(req.body);

  res.status(201).json(user);
}

function handleListUsers(req, res) {
  const name = req.query.name;
  const is_active = req.query.is_active;

  const filter = data.filter((data) => {
    if (name !== undefined && is_active !== undefined) {
      if (is_active === "false") {
        return res.json("User is not found.");
      } else {
        return name === data.name && is_active === data.is_active;
      }
    } else if (name !== undefined) {
      return name === data.name;
    } else if (is_active !== undefined) {
      return is_active === data.is_active;
    } else {
      return data;
    }
  });
  res.json(filter);
}

function handleGetByIdUser(req, res) {
  const user = User.find(req.params.id);

  if (user !== undefined) {
    res.status(200).json(user);
  } else {
    res.status(404).send("cant get user ");
  }
}

function handleUpdateByIdUser(req, res) {
  const user = User.update(req.params.id, req.body);

  if (user !== undefined) {
    res.status(200).json(user);
  } else {
    res.status(400).send("Can't Updated");
  }
}

function handleDeleteUser(req,res){
  const user = User.delete(req.params.id);

  if(user !== undefined){
    res.status(200).json(user)
  }else {
    res.status(404).send("can't delete");
  }
}

module.exports = {
  handleListUsers,
  handleCreateUser,
  handleGetByIdUser,
  handleUpdateByIdUser,
  handleDeleteUser,
};
