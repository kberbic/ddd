module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: './jest.env.js',
    testSequencer: "./jest.sequencer.js",
    testRegex: './src/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};