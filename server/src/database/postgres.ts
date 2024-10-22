import pg, {
    PoolConfig
} from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const config: PoolConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
}

const pool = new pg.Pool(config);

export default pool;