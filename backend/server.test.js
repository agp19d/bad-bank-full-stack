const request = require('supertest');
const app = require('./server');  // Ensure you're exporting your express app in server.js
const { find, create } = require('./dal');

jest.mock('./dal');  // This tells Jest to use our mocked version of dal

describe('API Routes', () => {

    // Reset mock behavior and implementation before each test
    beforeEach(() => {
        find.mockClear();
        create.mockClear();
    });

    describe('POST /api/register', () => {
        it('should return 400 if user already exists', async () => {
            find.mockResolvedValue([{}]);  // This user already exists

            const response = await request(app)
                .post('/api/register')
                .send({ name: 'Alice', email: 'alice@example.com', password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.text).toBe('User already exists');
        });

        it('should create a new user and return 201 if successful', async () => {
            find.mockResolvedValue(null);
            create.mockResolvedValue({
                name: 'Alice',
                email: 'alice@example.com',
                password: 'password123',
                balance: 1000  // Or whatever default balance is
            });

            const response = await request(app)
                .post('/api/register')
                .send({ name: 'Alice', email: 'alice@example.com', password: 'password123' });

            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Alice');
            expect(response.body.email).toBe('alice@example.com');
        });

    });

    describe('POST /api/login', () => {
        it('should return 401 if username is invalid', async () => {
            find.mockResolvedValue(null);  // No user found

            const response = await request(app)
                .post('/api/login')
                .send({ name: 'Bob', password: 'password123' });

            expect(response.status).toBe(401);
            expect(response.text).toBe('Invalid username or password');
        });

        it('should return 401 if password is incorrect', async () => {
            find.mockResolvedValue({
                name: 'Alice',
                password: 'differentPassword', // Stored password is different
                balance: 1000
            });

            const response = await request(app)
                .post('/api/login')
                .send({ name: 'Alice', password: 'password123' });

            expect(response.status).toBe(401);
            expect(response.text).toBe('Invalid username or password');
        });

        // ... Add a successful login scenario and other scenarios as needed
    });

    // ... Continue testing other routes ...

});

