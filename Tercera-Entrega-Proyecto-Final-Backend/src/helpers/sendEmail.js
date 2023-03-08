import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const emailCompany = "cursobackend@registros.com";

const sendEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { username, email, age, address, phone } = data;

  await transport.sendMail({
    from: "CursoBackendCoderHouse@prueba.com",
    to: emailCompany,
    subject: "Nuevo Registro",
    text: `Se ha registrado un nuevo usuario USUARIO: ${username} EMAIL:${email} EDAD: ${age} DIRECCION: ${address} TELEFONO: ${phone} `,
  });
};

export default sendEmail;
