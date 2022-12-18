const Follow = require("../models/Follow");
const User = require("../models/User");

async function followUser(idUser, idFollow) {
  const user = await User.findOne({ _id: idUser });
  const follow = await User.findOne({ _id: idFollow });

  if (!user || !follow) throw new Error("El usuario no existe");

  try {
    const followUser = new Follow({
      idUser: user._id,
      follow: follow._id,
    });

    followUser.save();
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function isFollow(idUser, idFollow) {
  const user = await User.findOne({ _id: idUser });
  const follow = await User.findOne({ _id: idFollow });

  if (!user || !follow) throw new Error("El usuario no existe");

  const isFollow = await Follow.findOne({
    idUser: user._id,
    follow: follow._id,
  });

  if (!isFollow) return false;

  return true;
}

async function unFollowUser(idUser, idFollow) {
  await Follow.findOneAndDelete({
    idUser,
    follow: idFollow,
  });

  return true;
}

module.exports = {
  followUser,
  isFollow,
  unFollowUser,
};
