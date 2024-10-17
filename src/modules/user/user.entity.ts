import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { Post } from "../posts/post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {unique: true })
  name: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string) {
    console.log(this.password, password);
    return await bcrypt.compare(password, this.password);
  }

  @OneToMany(type => Post,
    post => post.user)
  posts: Post[]

  @ManyToMany(type => Post)
  @JoinTable()
  voted: Post[];
}
