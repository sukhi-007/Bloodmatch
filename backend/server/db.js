import PG from 'pg';
const { Pool } = PG;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bloodmatch',
    password: 'Sukhi123',
    port: 5432
});

