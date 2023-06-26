const { sum, retrieveBooks, getUser, getFakeUser } = require("./index");

// Unit Test Example
// Jest is an unit test library for node/javascript

// Install with npm i jest --save-dev so it'll be removed from build
// Installthe @types/jest for the autocomplete
// Add jest --watchAll -verbose (optional) --coverage to task runner for live test

describe("Summation", () => {
  // Lifecycle Hooks
  let books;
  beforeAll(async () => {
    // Do something once before starting the test
    books = await retrieveBooks();
    console.log("Before all: Initialize Once");
  });

  beforeEach(() => {
    // Do something once on every test
    console.log("Before each: Initialize Everytime");
  });

  // Test function scope one task
  test("Add two numbers", () => {
    // Basic expectation & received: it's called 'Matchers'
    expect(sum(1, 3)).toBe(4);
  });

  // 'it' function works exactly the same, it's just the semantics and thet test text start with should
  it("should able to negate", () => {
    expect(sum(1, -3)).not.toBe(-10);
  });

  // Add .skip to skip the test if you don't want to test it everytime
  test.skip("Fetch Book", () => {
    expect(typeof books).toBe(typeof []);
  });

  // Other types of matchers (There's quite a lot of it)
  test("Book is no more than 10 Books", () => {
    expect(books.length).toBeLessThanOrEqual(10);
  });

  // Strict Equality Matchers: Array and objects is a reference type so you can't compare with .toBe
  test("Fake user is the same", () => {
    // expect(getFakeUser()).toBe({
    //   id: 1,
    //   name: "placeholder",
    //   email: "typi@gmail.com",
    // }); <--------------------------------- Won't work with since it compare values not reference
    expect(getFakeUser()).toEqual({
      id: 1,
      name: "placeholder",
      email: "typi@gmail.com",
    }); // Use the .toEqual to match the value itself
  });

  // Working with promises non async way
  test("Fetching user", () => {
    // When doing an async operation make sure to add:
    expect.assertions(1); // The number of assertions that should be run before proceeding
    return getUser(1).then((res) => {
      expect(res.data).toHaveProperty("name");
    });
  });

  // Working with promises with async
  test("Fetching user with async", async () => {
    expect.assertions(1);
    let { data: mainUser } = await getUser(1);
    expect(mainUser).toBeDefined();
  });

  // Add .todo to add a passing with no implementation yet
  test.todo("Remove user");

  // Custom Matchers
  expect.extend({
    toBeFunnyNumber(received) {
      if (received === 420 || received === 69) {
        return {
          pass: true,
        };
      } else {
        return {
          pass: false,
          message: `Expected ${received} to be a funny number`,
        };
      }
    },
  });

  // Test the custom matchers
  test("Sum total is a funny number", () => {
    expect(sum(400, 20)).toBeFunnyNumber();
  });
});
