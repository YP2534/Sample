// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and allow frontend communication
app.use(express.json());
app.use(cors());

// Mock Database (In reality, you'd use MongoDB or PostgreSQL here)
const bookings = [];

// API Route: Receive booking data from book.html
app.post('/api/bookings', (req, res) => {
    const { name, checkIn, checkOut, total } = req.body;

    // Validate incoming data
    if (!name || !checkIn || !checkOut) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a mock booking record
    const newBooking = {
        id: 'ASC-' + Math.floor(Math.random() * 10000), // Generate ID like ASC-4892
        name,
        checkIn,
        checkOut,
        total,
        status: 'Confirmed'
    };

    // Save to database
    bookings.push(newBooking);
    console.log('New Booking Received:', newBooking);

    // Send success response back to the website
    res.status(200).json({ 
        message: `Success! Booking Confirmed for ${name}. Reservation ID: ${newBooking.id}. Total: ${total}`,
        bookingDetails: newBooking
    });
});

// API Route: View all current bookings (for hotel admin)
app.get('/api/admin/bookings', (req, res) => {
    res.json(bookings);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🏨 Hotel A S Club Backend running on http://localhost:${PORT}`);
});
