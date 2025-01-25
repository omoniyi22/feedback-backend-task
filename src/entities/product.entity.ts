import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column("decimal", { precision: 20, scale: 2 })
  cost: number;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.product)
  feedbacks: FeedbackEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}