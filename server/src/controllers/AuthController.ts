import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import usersView from '../views/users_view';
import User from "../models/User";

export default {
  async login(request: Request, response: Response) {
    const {
      email,
      password
    } = request.body;

    const usersRepository = getRepository(User);

    const data = {
      email,
      password
    };

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).max(12)
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = await usersRepository.findOne({
      where: {
        email
      }
    });

    if(!user) return response.status(401).send({ error: "Email or Password invalid." });

    if (!(await user.compareHash(password))) {
      return response.status(401).json({ error: "Email or Password invalid." });
    }
  
    return response.status(200)
      .json(usersView.render(user));
  }
  
}