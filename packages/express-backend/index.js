// index.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());


const users = {
  users_list: [

    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },

    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.patch("/users", (req, res) => {

	const name = req.query.name;
	const job = req.body.job;

	if (name === undefined || job === undefined){
		res.status(400).send("Name and job are required.");
		return;
	}

	const matchingUsers = users["users_list"].filter(
		(user) => user["name"] === name);

	if (matchingUsers.length === 0){
		res.status(404).send("No matching users found.");
		return;
	}

	matchingUsers.forEach((user) => {
		user["job"] = job;
	});

	res.send( { users_list: matchingUsers });
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/users", (req, res) => {
	const name = req.query.name;
	
	if (name !== undefined) {
		let result = findUserByName(name);
		result = {users_list: result };
		res.send(result);
		} else {
		  res.send(users);
		}
		});


const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
	const id = req.params["id"];
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found. ");
	} else {
		res.send(result);
	}
});

const addUser = (user) => {
	users["users_list"].push(user);
	return user;
};

app.post("/users", (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	res.send();
});

const deleteUserById = (id) => {
	const index = users["users_list"].findIndex(
	  (user) => user["id"] === id
	);

	if (index === -1){
		return undefined;
	}

	const deletedUser = users["users_list"][index];
	users["users_list"].splice(index,1);
	return deletedUser;
} 

app.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	const deletedUser = deleteUserById(id);
	
	if (deletedUser === undefined){
		res.status(404).send("Resource not found. ");
	} else {
		res.send(deletedUser);
	}
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
