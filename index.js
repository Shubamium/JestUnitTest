const { default: axios } = require("axios");

function sum(a, b) {
  return a + b;
}

async function retrieveBooks() {
  await delay(1500);
  const book = await getBooks();
  return book;
}

async function getBooks() {
  await delay(400);
  let book = ["Book 1", "Book 2", "Book 3"];
  return book;
}

async function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}
const mainUser = new User("yanda", "abujubilw12 3");

async function getUser(id) {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
}

function getFakeUser() {
  return {
    id: 1,
    name: "placeholder",
    email: "typi@gmail.com",
  };
}

// const _sum = sum;
// export { _sum as sum };
module.exports.sum = sum;
module.exports.retrieveBooks = retrieveBooks;
module.exports.getUser = getUser;
module.exports.getFakeUser = getFakeUser;
