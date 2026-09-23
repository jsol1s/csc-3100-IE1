import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import {
  findAllUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  createUser,
  deleteUserById
} from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let usersPromise;

  if (name && job) {
    usersPromise = findUserByNameAndJob(name, job);
  } else if (name) {
    usersPromise = findUserByName(name);
  } else if (job) {
    usersPromise = findUserByJob(job);
  } else {
    usersPromise = findAllUsers();
  }

  usersPromise
    .then((users) => res.json(users))
    .catch((error) => res.status(500).send(error.message));
});

app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.json(user);
    })
    .catch((error) => res.status(500).send(error.message));
});

app.post("/users", (req, res) => {
  createUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => res.status(500).send(error.message));
});

app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.json(user);
    })
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
