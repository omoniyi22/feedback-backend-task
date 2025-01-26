"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./../entities");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "neondb",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
    synchronize: true,
    entities: [entities_1.UserEntity, entities_1.FeedbackEntity, entities_1.ProductEntity],
    entitySkipConstructor: true,
    ssl: {
        rejectUnauthorized: false,
    }
});
//# sourceMappingURL=datasource.js.map