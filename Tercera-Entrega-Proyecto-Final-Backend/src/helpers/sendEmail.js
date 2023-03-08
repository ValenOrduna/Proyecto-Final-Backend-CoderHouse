import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const emailCompany = "cursobackend@registros.com";

const sendEmailRegister = async (data) => {
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

const sendEmailOrder = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { username, email, products } = data;

  let textProducts = "";
  let total = 0;

  products.map((product, i) => {
    textProducts += `Producto ${i}: ${product.title} Precio: $${product.price} Cantidad: ${product.quantity}\n `;
    total += Number(product.price) * Number(product.quantity);
  });

  textProducts += `TOTAL DEL PEDIDO: $${total}`;

  await transport.sendMail({
    from: "CursoBackendCoderHouse@prueba.com",
    to: emailCompany,
    subject: `Nuevo Pedido de ${username} ${email} `,
    text: `La lista de productos de ${username} con Email ${email} es la siguiente: \n ${textProducts}  `,
  });

  return `Muchisimas gracias por confiar en nosotros. Tu pedido esta en proceso! Te adjunto los datos del mismo \n ${textProducts} `;
};

export { sendEmailRegister, sendEmailOrder };
