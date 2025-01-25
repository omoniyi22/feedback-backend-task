import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class FeedbackEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ name: "customer_name", default: "Anonymous", nullable: true })
    customerName: string;

    @Column({ name: "customer_feedback", type: "text" })
    customerFeedback: string;

    @Column()
    sentiment: string;

    @ManyToOne(() => UserEntity, (user) => user.feedbacks)
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.feedbacks, { onDelete: "CASCADE" })
    product: ProductEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}