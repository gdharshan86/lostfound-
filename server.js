require('dotenv').config();
const { connectDB } = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB first, then start Express
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
      console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(async () => {
        const { closeDB } = require('./config/db');
        await closeDB();
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\nSIGINT received. Shutting down...');
      server.close(async () => {
        const { closeDB } = require('./config/db');
        await closeDB();
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
