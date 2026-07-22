import { connectRabbitMQ } from "./connection";

export async function publish(
    exchange: string,
    routingKey: string,
    message: unknown
) {
    const channel = await connectRabbitMQ();
    await channel.assertExchange(
        exchange,
        "topic",
        {
            durable: true,
        }
    );

    const messageBuffer = Buffer.from(
        JSON.stringify(message)
    );

    channel.publish(
        exchange,
        routingKey,
        messageBuffer,
        {
            persistent: true,
        }
    );

    console.log(
        `Message published to exchange: ${exchange}`
    );
}