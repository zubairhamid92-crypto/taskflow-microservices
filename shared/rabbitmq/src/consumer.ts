import { connectRabbit } from "./connection";

export async function consume(
    queue: string,
    callback: (msg: any) => Promise<void>
) {

    const channel = await connectRabbit();

    await channel.assertQueue(queue);

    channel.consume(queue, async (message) => {

        if (!message) return;

        const data = JSON.parse(message.content.toString());

        await callback(data);

        channel.ack(message);

    });

}