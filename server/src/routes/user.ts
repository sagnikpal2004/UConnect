import express from 'express';
import { getUserProfile, postUserProfile } from '../controllers/user';

const router = express.Router();

router.get('/profile', getUserProfile);
router.post('/profile', postUserProfile);

export default router;