import { sendEmail } from './lib/mailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  console.log("Testing email...");
  const res = await sendEmail('testinawo@gmail.com', 'Test Demande', '<h1>Test</h1>');
  console.log(res);
}
test();
