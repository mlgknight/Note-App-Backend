import { Router } from 'express';
import { Request, Response } from 'express';
import Contact from '../../models/Contact'

const infoRouter = Router();

const now = new Date();

const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
const monthName = now.toLocaleDateString('en-US', { month: 'long' });
const date = now.getDate();
const year = now.getFullYear();
const hour24 = now.getHours();
const minute = now.getMinutes();
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const hour12 = hour24 % 12 || 12;
const ampm = hour24 >= 12 ? 'PM' : 'AM';

const currentTime = `${dayName}  ${monthName}  ${date}  ${year}  ${hour12}:${minute.toString().padStart(2, '0')} ${ampm}  (${timeZone})`;

infoRouter.get('/', (req: Request, res: Response) => {
	res.send(`<p>Phonebook has info for ${Contact.length} people</p>
        <p>${currentTime}</p>
        `);
});

export default infoRouter;
