import { Users } from "../../models/Users";
import { connectToDatabase } from "../../util/app";
export default async function handler(req, res) {
  // Process a POST request
  try {
    connectToDatabase();
    if (req.method === "POST") {
      const newContact = new Users(req.body);
      const save = await newContact.save();
      res.send(save);
    } else if (req.method === "GET") {
      Users.find({}, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
      //   res.send("hello but");
    } else {
      // Handle any other HTTP method
      res.status(405).json({ messagge: "Method not allowed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
