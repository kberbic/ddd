const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        const copyTests = Array.from(tests);
        return copyTests
            .sort((testA, testB) =>
                (Number(testA.path.split(".")[0]) > Number(testB.path.split(".")[0])
                    ? 1 : -1));
    }
}

module.exports = CustomSequencer;