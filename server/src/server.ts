import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "54cb1c9a68a94d",
      pass: "61a4a7015afa65"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Rafael Barros <rafa_barros92@hotmail.com>',
        subject: 'Novo Feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p> Tipo do feedback: ${type}</p>`, 
            `<p> Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback})
})

app.listen(3333, () => {
    console.log('Server rodando!!')
})