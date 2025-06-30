import { test, after } from 'node:test';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../src/app.ts';

const api = supertest(app);

test('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('a valid note can be added', async () => {
	const newNote = {
		content: 'A note created by a test',
		important: true,
	};

	await api
		.post('/api/notes')
		.send(newNote)
		.expect(201)
		.expect('Content-Type', /application\/json/);
});

test('note without content is not added', async () => {
	const newNote = { important: true };

	await api
		.post('/api/notes')
		.send(newNote)
		.expect(400)
		.expect('Content-Type', /application\/json/);
});

test('a note can be deleted', async () => {
	// First, add a note to delete
	const newNote = {
		content: 'Delete this note',
		important: false,
	};
	const postResponse = await api.post('/api/notes').send(newNote).expect(201);
	const noteId = postResponse.body.id;

	await api.delete(`/api/notes/${noteId}`).expect(204);
});

test('a note can be updated', async () => {
	// First, add a note to update
	const newNote = {
		content: 'Update this note',
		important: false,
	};
	const postResponse = await api.post('/api/notes').send(newNote).expect(201);
	const noteId = postResponse.body.id;

	const updatedNote = {
		content: 'This note has been updated',
		important: true,
	};

	const putResponse = await api
		.put(`/api/notes/${noteId}`)
		.send(updatedNote)
		.expect(200);

	if (
		putResponse.body.content !== updatedNote.content ||
		putResponse.body.important !== updatedNote.important
	) {
		throw new Error('Note was not updated correctly');
	}
});

test('notes have property named id, not _id', async () => {
	const response = await api.get('/api/notes');
	const notes = response.body;

	notes.forEach((note: any) => {
		if (!note.id) throw new Error('Note is missing id property');
		if (note._id) throw new Error('Note should not have _id property');
	});
});

after(async () => {
	await mongoose.connection.close();
});
