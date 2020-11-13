const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Person = new schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteFoods: { type: [String] },
});

module.exports =  mongoose.model("Person", Person);