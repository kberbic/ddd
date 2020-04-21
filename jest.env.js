const NodeEnvironment = require('jest-environment-node');
const path = require('path');
const fs = require("fs");
const {Seeder} = require('mongo-seeding/dist');

const _pid = "./jest.share";
const _maxCheck = 3;
class TestEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        this.global.DATABASE_URI = await this.getDatabaseURI();
        await super.setup();
    }

    async getDatabaseURI() {
        return new Promise(resolve => this.loadDatabaseURI(resolve, 0));
    }

    loadDatabaseURI(callback, count) {
        if (count >= _maxCheck)
            throw new Error("MongoDB InMemory service is not started!!!");

        count++;
        const exist = fs.existsSync(_pid);
        if (!exist)
            setTimeout(() => this.getDatabaseUri(callback, count), 1000);

        const output = fs.readFileSync(_pid, {encoding: "utf8"});
        callback(output);
    }

    async seed(){
        const seeder = new Seeder({
            database: this.global.DATABASE_URI,
            dropDatabase: true,
        });
        const collections = seeder.readCollectionsFromPath(path.resolve('./src/tests/database'));
        await seeder.import(collections);
    }
}

module.exports = TestEnvironment;