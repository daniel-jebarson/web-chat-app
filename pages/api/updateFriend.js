import { Users } from "../../models/Users";
import { connectToDatabase } from "../../util/app";
export default async function handler(req, res) {
  // Process a POST request
  try {
    connectToDatabase();
    if (req.method === "POST") {
      const { gmail, friend } = req.body;
      const sample = Users.updateOne(
        { gmail: gmail },
        { $addToSet: { friends: friend } },
        { new: true }
      ).exec();
      Users.findOne({ gmail: gmail }, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
      // console.log(sample);
    } else {
      // Handle any other HTTP method
      res.status(405).json({ messagge: "Method not allowed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
