import { startServer } from './server';

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error);
  process.exit(1);
});