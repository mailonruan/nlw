import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import usersView from '../views/users_view';
import User from "../models/User";

export default {
/*   async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(User);
  
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });
  
    return response.json(orphanagesView.renderMany(orphanages));
  }, */

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);
  
    return response.json(usersView.render(user));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password
    } = request.body;

    const usersRepository = getRepository(User);

    const data = {
      name,
      email,
      password
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).max(12)
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);
  
    await usersRepository.save(user);
  
    return response.status(201)
      .json(usersView.render(user));
  },

  async profile(request: Request, response: Response) {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOneOrFail(request.user.id);

    return response.json(usersView.render(user));
  }

  
}