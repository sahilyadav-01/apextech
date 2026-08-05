import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100 // limit 100 requests per minute
});
app.use('/api/', limiter);

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('⚡ Socket client connected:', socket.id);
  socket.on('join_event_room', (bookingId) => {
    socket.join(bookingId);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// API Routes (V1 RESTful Architecture)
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', version: '3.0.0', service: 'Apex Events API Engine' });
});

// Auth endpoints
app.post('/api/v1/auth/login', (req, res) => {
  res.json({ token: 'mock-jwt-token-v3', refreshToken: 'mock-refresh-token-v3', user: { name: 'Victoria Vance', role: 'super_admin' } });
});

// Bookings endpoints
app.get('/api/v1/bookings', (req, res) => {
  res.json({ success: true, count: 3, message: 'Fetched V3 enterprise bookings' });
});

app.post('/api/v1/bookings', (req, res) => {
  const newBooking = req.body;
  io.emit('notification', { title: 'New Booking', message: `Booking created for ${newBooking.customerName}` });
  res.status(201).json({ success: true, booking: newBooking });
});

// Services & Packages
app.get('/api/v1/services', (req, res) => res.json({ success: true, services: [] }));
app.get('/api/v1/packages', (req, res) => res.json({ success: true, packages: [] }));

// Payments
app.post('/api/v1/payments/razorpay/create-order', (req, res) => {
  res.json({ id: 'order_RZP_9918230', currency: 'USD', amount: req.body.amount });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Apex Events V3 Backend running on port ${PORT}`);
});
