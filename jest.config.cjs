module.exports = {
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.test.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.scss$': '<rootDir>/src/__tests__/styleMock.js',
	},
};
