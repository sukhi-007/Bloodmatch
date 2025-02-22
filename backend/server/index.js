import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import geoLib from 'geolib';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



app.post('/signup', async (req, res) => {
    try {
        const { email, passkey, city, state, country, phononum } = req.body;
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email=$1',
            [email]
        );
        if (existingUser.rows.length > 0) {
            return res.json({ message: "User already exists" });
        }
        const newUser = await pool.query(
            'INSERT INTO users (email, passkey,city,state,country,phononum) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
            [email, passkey, city, state, country, phononum]
        );

        res.json(newUser.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, passkey } = req.body;
        const user = await pool.query(
            'SELECT * FROM users WHERE email=$1',
            [email]
        )
        if (user.rows.length == 0) {
            res.json({ message: "User not found" });
        }
        else if (user.rows[0].passkey == passkey) {
            res.json({ message: "Login successful" });
        }
        else {
            res.json({ message: "Incorrect password" });
        }
    }
    catch (err) {
        console.error(err.message);
    }
});

app.post('/submitDonorLocation', async (req, res) => {
    console.log(req.body);
    const { bloodtype, latitude, longitude } = req.body;
    try {
        const newLoc = await pool.query('UPDATE users SET bloodtype = $1, latitude = $2, longitude = $3 WHERE user_id = (SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1) RETURNING *', [bloodtype, latitude, longitude]);
        res.status(200).json(newLoc.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.post('/searchDonor', async (req, res) => {
    console.log(req.body);
    const { bloodtype, latitude, longitude } = req.body;
    try {
        const allLat = await pool.query('SELECT latitude, longitude FROM users WHERE bloodtype=$1', [bloodtype]);
        if (allLat.rows.length == 0) {
            res.json({ message: "No donors found" });
        }

        const donorLocations = allLat.rows.map(donor => ({
            latitude: parseFloat(donor.latitude),
            longitude: parseFloat(donor.longitude)
        }));

        const nearest = geoLib.findNearest({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }, donorLocations);
        console.log(nearest);
        res.json(nearest);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});