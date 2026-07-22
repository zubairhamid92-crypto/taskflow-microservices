import dotenv from "dotenv";

dotenv.config();

export const rabbitConfig = {
    url: process.env.RABBITMQ_URL!,
};