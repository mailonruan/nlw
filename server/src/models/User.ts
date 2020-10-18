import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinColumn } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Orphanage from './Orphanage';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @ManyToMany(type => Orphanage, orphanage => orphanage.sponsors)
  orphanages: Orphanage[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if(this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async compareHash(hash: string) {
    return await bcrypt.compare(hash, this.password);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, `${process.env.API_SECRET}`, {
      expiresIn: 86400
    });
  } 

}