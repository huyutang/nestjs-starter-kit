import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany, JoinTable
} from "typeorm";
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User,
      user => user.posts)
  user: User;

  @ManyToMany(type => User)
  @JoinTable()
  voted: User[];

  @ManyToOne(type => Category,
    category => category.posts)
  category: Category;
}
