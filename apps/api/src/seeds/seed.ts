import mongoose from 'mongoose';
import * as argon2 from 'argon2';
import * as dotenv from 'dotenv';
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Connected for seeding...');

  try {
    const adminHash = await argon2.hash(process.env.DEMO_ADMIN_PASSWORD || 'admin1234');
    console.log('Created admin hash');
    
    const doctorHash = await argon2.hash(process.env.DEMO_DOCTOR_PASSWORD || 'demo1234');
    console.log('Created doctor hash');
    
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding data', error);
  } finally {
    await mongoose.disconnect();
  }
}
seed().catch(console.error);
