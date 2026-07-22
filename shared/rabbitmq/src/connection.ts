import dotenv from "dotenv";
dotenv.config();
import amqp, { Channel, Connection } from "amqplib";

let connection: Connection | null = null;
let channel: Channel | null = null;

export async function connectRabbitMQ(): Promise<Channel> {

    // If a channel already exists, reuse it
    if (channel) {
        return channel;
    }
console.log("process.env.RABBITMQ_URL",process.env.RABBITMQ_URL);

    // Create TCP connection
    connection = await amqp.connect(
        process.env.RABBITMQ_URL!
    );

    console.log("✅ RabbitMQ Connected");

    // Create communication channel
    channel = await connection.createChannel();

    console.log("✅ RabbitMQ Channel Created");

    return channel;

}