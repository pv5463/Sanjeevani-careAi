import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase(uri: string): Promise<void> {
  if (isConnected) return;
  
  await mongoose.connect(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  
  isConnected = true;
  console.log('Connected to MongoDB');
}

export function getConnectionState(): boolean {
  return mongoose.connection.readyState === 1;
}
