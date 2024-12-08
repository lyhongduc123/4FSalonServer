import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { registerAs } from "@nestjs/config";
import { config } from 'dotenv';

config();

export default registerAs('database', (): TypeOrmModuleOptions => ({
    host: process.env.MYSQL_SERVICE_HOST || process.env.DB_HOST,
    port: parseInt(process.env.MYSQL_SERVICE_PORT) || parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
    type: process.env.DB_DIALECT as 'mysql',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}));