const mockFind = jest.fn();
const mockCreate = jest.fn();
const mockConnectDb = jest.fn();


module.exports = {
    find: mockFind,
    create: mockCreate,
    connectDb: mockConnectDb
};
