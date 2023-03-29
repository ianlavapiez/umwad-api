import { MongoClient } from 'mongodb';

//TODO: check for the config loader for the loading of environment variables.
const {
  MONGO_URI = 'mongodb+srv://umwadportal:uEXVkCBk83aLIX3a@umwad.udkqljy.mongodb.net/umwad?retryWrites=true&w=majority',
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
