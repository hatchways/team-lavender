const MongoClient = require("mongodb").MongoClient;

const database = "calendly";
const collections = "test";

const uri =
  "mongodb+srv://team-lavender:lavender-team@cluster0.kenuz.mongodb.net/calendly?retryWrites=true&w=majority";
// put the URI in process.env.ATLAS_URI, but not working for some reason
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
