import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};
