import dotenv from "dotenv";

dotenv.config();

import { startUserConsumer } from "./consumers/user.consumer";

async function start() {

    try {

        await startUserConsumer();

        console.log(
            "🚀 Notification Service started"
        );

    } catch (error) {

        console.error(
            "Notification Service failed:",
            error
        );

        process.exit(1);
    }
}

start();