import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const sendMessage = (data) => {
  const client = twilio(process.env.PHONE_SID, process.env.PHONE_TOKEN);

  const { phoneSms, phoneWpp, messageWpp } = data;

  client.messages.create({
    body: "Tu pedido en CoderHouse Backend ha sido recibido y se encuentra en proceso! Muchisimas gracias!",
    from: "+15074104347",
    to: phoneSms,
  });
  client.messages.create({
    body: messageWpp,
    from: "whatsapp:+14155238886",
    to: `whatsapp:${phoneWpp}`,
  });
};

export default sendMessage;
