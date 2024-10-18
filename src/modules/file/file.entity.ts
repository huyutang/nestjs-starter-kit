import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
}