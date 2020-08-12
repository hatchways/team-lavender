const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

const database = "calendly";
const collections = "test";

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) throw err;
  console.log("Connected to Atlas MongoDB");
  const collection = client.db(database).collection(collections);
  // perform actions on the collection object
  client.close();
});
