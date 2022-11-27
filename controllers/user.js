const User = require("../models/User");
const Tweet = require("../models/Tweets");
const brcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, SECRET_KEY, expiredIn) {
  const { id, name, username, email } = user;

  payload = {
    id,
    name,
    username,
    email,
  };

  return jwt.sign(payload, SECRET_KEY);
}

async function getUsuer(username) {
  const { username: usernameUser } = username;

  const user = await User.findOne({ username: usernameUser.toLowerCase() });
  const tweets = await Tweet.find({ userId: user._id }).sort({ createdAt: -1 });

  if (!tweets) throw new Error("No se encontraron tweets");

  user.tweets = tweets;

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return user;
}

async function registerUser(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { username, email, password } = newUser;

  // REVISAR SI EL USUARIO EXISTE CON EL EMAIL
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("El correo ya existe");
  }

  const userNameExist = await User.findOne({ username });

  if (userNameExist) {
    throw new Error("El nombre de usuario ya existe");
  }

  //   ENCRIPTAR EL PASSWORD
  const salt = await brcryptjs.genSalt(10);
  newUser.password = await brcryptjs.hash(password, salt);

  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(input) {
  const { email, password } = input;

  const userFound = await User.findOne({ email: email.toLowerCase() });

  if (!userFound) throw new Error("La contraseña o el correo son incorrectos");

  const passwordSuccess = await brcryptjs.compare(password, userFound.password);

  if (!passwordSuccess)
    throw new Error("La contraseña o el correo son incorrectos");

  return {
    token: createToken(userFound, process.env.SECRET_KEY),
  };
}

async function uploadAvatar(file, username, isAvatar) {
  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user) {
    throw new Error("El usuario no existe");
  }

  try {
    if (isAvatar) {
      user.avatar = file;
    } else {
      user.portada = file;
    }
    user.save();
    return true;
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function editUser(input) {
  const { username, name, description, avatar, portada } = input;

  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user) throw new Error("El usuario no existe");

  try {
    user.name = name;
    user.description = description;
    user.avatar = avatar;
    user.portada = portada;

    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function searchUser(name) {
  const { name: nameUser } = name;
  const user = await User.find({ name: { $regex: nameUser, $options: "i" } });
  return user;
}

module.exports = {
  registerUser,
  login,
  getUsuer,
  uploadAvatar,
  editUser,
  searchUser,
};
