require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

// API Routes

// Get all site data
app.get('/api/site-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT section, data FROM site_data ORDER BY section');
    const siteData = {};
    result.rows.forEach(row => {
      siteData[row.section] = row.data;
    });
    res.json(siteData);
  } catch (error) {
    console.error('Error fetching site data:', error);
    res.status(500).json({ error: 'Failed to fetch site data' });
  }
});

// Get specific section
app.get('/api/site-data/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const result = await pool.query(
      'SELECT data FROM site_data WHERE section = $1',
      [section]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(result.rows[0].data);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Update specific section
app.put('/api/site-data/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    const result = await pool.query(
      `INSERT INTO site_data (section, data)
       VALUES ($1, $2)
       ON CONFLICT (section)
       DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING data`,
      [section, data]
    );

    res.json(result.rows[0].data);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
