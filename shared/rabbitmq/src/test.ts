import dotenv from "dotenv";
dotenv.config();

import { connectRabbitMQ } from "./connection";

(async () => {
    await connectRabbitMQ();
})();