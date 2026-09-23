import User from "../models/user.js";

export const findAllUsers = () => User.find();

export const findUserById = (id) => User.findById(id);

export const findUserByName = (name) => User.find({ name });

export const findUserByJob = (job) => User.find({ job });

export const findUserByNameAndJob = (name, job) =>
  User.find({ name, job });

export const createUser = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

export const deleteUserById = (id) =>
  User.findByIdAndDelete(id);
