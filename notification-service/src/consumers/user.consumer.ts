import { connectRabbitMQ } from "../../../shared/rabbitmq/src/connection";

export async function startUserConsumer() {

    const channel = await connectRabbitMQ();

    const exchange = "user.exchange";

    const queue = "user.notification.queue";

    const routingKey = "user.registered";

    // Create exchange
    await channel.assertExchange(
        exchange,
        "topic",
        {
            durable: true
        }
    );

    // Create queue
    await channel.assertQueue(
        queue,
        {
            durable: true
        }
    );

    // Connect queue to exchange
    await channel.bindQueue(
        queue,
        exchange,
        routingKey
    );

    console.log(
        "📨 Notification Service is waiting for user.registered events..."
    );

    // Start consuming
    await channel.consume(
        queue,

        async (message) => {

            if (!message) {
                return;
            }

            try {

                const data = JSON.parse(
                    message.content.toString()
                );

                console.log(
                    "Received user.registered event:",
                    data
                );

                // Send email
                console.log(
                    `Sending welcome email to ${data.email}`
                );

                // Acknowledge message
                channel.ack(message);

            } catch (error) {

                console.error(
                    "Notification processing failed:",
                    error
                );

                // Requeue message
                channel.nack(
                    message,
                    false,
                    true
                );
            }
        }
    );
}