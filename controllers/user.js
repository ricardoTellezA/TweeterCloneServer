const User = require("../models/User");
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

  if (!userFound)
    throw new Error("La contraseña o el password son incorrectos");

  const passwordSuccess = await brcryptjs.compare(password, userFound.password);

  if (!passwordSuccess)
    throw new Error("La contraseña o el password son incorrectos");


  return {
    token: createToken(userFound, process.env.SECRET_KEY),
  };
}

module.exports = {
  registerUser,
  login,
};
