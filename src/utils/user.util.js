import * as redis from 'redis';
import logger from '../config/logger';

const client = redis.createClient();

client.on('error', (err) => {
    logger.error('Redis error:', err);
});

client.on('connect', () => {
    logger.info('Connected to Redis');
});

const clientRedis = async () => {
    if (!client.isOpen) {
        try {
            await client.connect();
            logger.info('Connected to the Redis database.');
        } catch (error) {
            logger.error('Could not connect to the Redis database.', error);
            throw error;
        }
    }
    return client;
};

export default clientRedis;



