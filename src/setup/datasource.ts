/** @format */

import { DataSource } from "typeorm";
import { FeedbackEntity, ProductEntity, UserEntity, } from "@/entities";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: "neondb",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  logging: false,
  synchronize: true,
  entities: [UserEntity, FeedbackEntity, ProductEntity],
  entitySkipConstructor: true,
  ssl: {
    rejectUnauthorized: false,
  }
});
