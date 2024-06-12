import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const secretKey = "topsecretekey";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    res.status(200).json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
