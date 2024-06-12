import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const secretKey = "topsecretekey";

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;


  if (username === "user" && password === "password") {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    return res.status(200).json({ token,username });
  }

  res.status(401).json({ error: "Invalid username or password" });
}