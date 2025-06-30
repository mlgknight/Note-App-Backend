import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.ts';
import User from '../src/models/User.ts';

const api = supertest(app);

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await User.find({});

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await User.find({});
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		assert(usernames.includes(newUser.username));
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await User.find({});

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		console.log('Test result body:', result.body);

		assert(result.body.error.includes('Username already exists'));
	});
});
