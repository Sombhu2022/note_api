import Agenda from "agenda";
import { sendEmail } from "../utils/sendMail.js";

const mongoConnectionString = process.env.AGENDA_DB_URL;
// const mongoConnectionString = "mongodb://127.0.0.1:27017/agenda";
console.log(mongoConnectionString);
export const agenda = new Agenda({
    db: { address: mongoConnectionString , collection: 'Jobs' },
    //   processEvery: '30 seconds',
      options: { useNewUrlParser: true }
});

export const agendaConnection =async()=>{
    
agenda.on('ready', async() => {
    console.log('Agenda started!');
    await agenda.start();
});

agenda.on('error', (error) => {
    console.error('Agenda connection error:', error);
});


agenda.define('send email', async (job) => {
    const { to, subject, body , sendAt } = job.attrs.data;
    sendEmail(to , subject , `${body}  ${sendAt} `)
    console.log('Mail send at time',sendAt);
  });

 console.log("url",process.env.DB_URL);
}


