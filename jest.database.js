const fs = require("fs");
const path = require("path");
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Seeder } = require('mongo-seeding/dist');
const server = new MongoMemoryServer();
server.getConnectionString().then(async cn=> {
    const seeder = new Seeder({
        database: cn,
        dropDatabase: true,
    });
    const collections = seeder.readCollectionsFromPath(path.resolve('./src/tests/database'));
    await seeder.import(collections);
    fs.writeFileSync("./jest.share", cn, {encoding: "utf8"});
});