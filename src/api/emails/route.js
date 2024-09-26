import {Resend} from "resend"
import welcome from "../../emails/welcome";


const resend = new Resend("re_3ttF7UeM_8NXCx1qctD99iZsgaxtqNMVo");

 
export async function sendEmail(email) {
  const templateParams = {
    from: 'onboarding@resend.dev',
    to: email,
    message: welcome(),
  };

  try {
        const response = await resend.emails.send(templateParams);
        console.log('Email sent successfully:', response);
        return 'Email sent successfully!';
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
}
