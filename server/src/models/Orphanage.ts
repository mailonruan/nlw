import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import Image from './Image';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @ManyToMany(type => User, user => user.orphanages)
  @JoinTable({
    name: "orphanages_sponsors_users",
    joinColumn: {
        name: "orphanage_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
    }
  })
  sponsors: User[]

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}