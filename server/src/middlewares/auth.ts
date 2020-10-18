import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import User from "../models/User";

interface Decode {
  id: number;
}

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = <string>request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "No token provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = <Decode>await jwt.verify(token, `${process.env.API_SECRET}`);

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOneOrFail(decoded.id);
    
    request.user = user;
    return next();
  } catch (err) {
    return response.status(401).send({ error: "Token invalid" });
  }
}