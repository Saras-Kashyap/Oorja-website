/**
 * OORJA Cultural Club Backend Scaffold
 * Node.js + Express.js + Mongoose (scaffold)
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store fallback when MongoDB is not connected
const mockSubmissions = [];

// Optional MongoDB / Mongoose connection scaffold:
/*
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/oorja_club';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB (OORJA Database)'))
  .catch((err) => console.log('ℹ MongoDB not connected, running in mock memory mode:', err.message));

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const EventRegistrationSchema = new mongoose.Schema({
  eventId: String,
  fullName: String,
  email: String,
  phone: String,
  college: String,
  yearOfStudy: String,
  registeredAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);
const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema);
*/

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    club: 'OORJA — Scintillating the Aura',
    college: 'COER University, Roorkee',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/events - List all events
app.get('/api/events', (req, res) => {
  const events = [
    {
      id: "zion",
      title: "ZION",
      subtitle: "The Flagship Annual Cultural Fest",
      tagline: "An immersive celebration of music, energy and unforgettable moments.",
      date: "November 14-16, 2026 [Placeholder]",
      venue: "COER University Campus, Roorkee — exact venue TBA",
      badge: "Flagship Mega Fest",
      status: "Upcoming",
    },
    {
      id: "deep-sandhya",
      title: "DEEP SANDHYA",
      subtitle: "Festival of Lights, Heritage & Soul",
      tagline: "An evening where culture, lights and emotions come together.",
      date: "October 28, 2026 [Placeholder]",
      venue: "COER University Campus, Roorkee — exact venue TBA",
      badge: "Cultural Heritage Night",
      status: "Upcoming",
    },
    {
      id: "fresher-event",
      title: "FRESHER EVENT",
      subtitle: "Aarambh — Welcoming the Freshers of 2026",
      tagline: "A high-energy welcome experience designed to introduce the newest members of our campus community to OORJA.",
      date: "October 24, 2026 [Placeholder]",
      venue: "COER University Campus, Roorkee — exact venue TBA",
      badge: "Fresher Welcome Special",
      status: "Registration Open",
    },
  ];

  res.json({ success: true, count: events.length, data: events });
});

// POST /api/contact - Handle contact inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields (name, email, message) are required.",
    });
  }

  const newSubmission = {
    id: `msg_${Date.now()}`,
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };

  mockSubmissions.push(newSubmission);
  console.log(' New Contact Submission received for OORJA:', newSubmission);

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out to OORJA! Your message has been received.",
    data: newSubmission,
  });
});

// POST /api/events/register - Handle event registrations
app.post('/api/events/register', (req, res) => {
  const { eventId, fullName, email, phone, college, department } = req.body;

  if (!eventId || !fullName || !email) {
    return res.status(400).json({
      success: false,
      error: "Event ID, Full Name, and Email are required.",
    });
  }

  const registration = {
    registrationId: `OORJA-${Math.floor(100000 + Math.random() * 900000)}`,
    eventId,
    fullName,
    email,
    phone: phone || "N/A",
    college: college || "COER University",
    department: department || "General",
    registeredAt: new Date().toISOString(),
  };

  console.log(' New Event Registration for OORJA:', registration);

  res.status(201).json({
    success: true,
    message: `Successfully registered for ${eventId.toUpperCase()}! See you on campus.`,
    data: registration,
  });
});

app.listen(PORT, () => {
  console.log(` OORJA API Server listening on http://localhost:${PORT}`);
  console.log(` Endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/events`);
  console.log(`   - POST /api/contact`);
  console.log(`   - POST /api/events/register`);
});
