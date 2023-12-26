export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
			  diagnostics: {
				ignoreCodes: [1343]
			  },
			  astTransformers: {
				before: [
				  {
					path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
					options: { metaObjectReplacement: { env: {
						DEV: false,
						VITE_OPEN_WEATHER_KEY: "fd02d68b5235d3fbdcd08c949ff2c127",
						VITE_CURRENT_WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5",
						VITE_HOURLY_WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5"
					} } }
				  }
				]
			  }
			}
		  ],
		".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": 'jest-transform-stub'
	},
	moduleNameMapper: { //pra conseguir achar os caminhos do tipo @
		"^@pages/(.*)$": "<rootDir>/src/pages/$1",
		"^@assets/(.*)$": "<rootDir>/src/assets/$1",
		"^@services/(.*)$": "<rootDir>/src/services/$1",
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	testMatch: [
		"<rootDir>/src/**/*.(spec|test).[jt]s?(x)"
	],
	collectCoverage: false,
	collectCoverageFrom: [
		'<rootDir>/src/pages/**/*.{ts,tsx}',
		'<rootDir>/src/services/**/*.{ts,tsx}',
        '<rootDir>/src/utils/**/*.{ts,tsx}'
	],
	coverageThreshold: {
		global: {
		  branches: 70,
		  functions: 70,
		  lines: 70,
		  statements: 70,
		},
		'./src/utils': {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 90,
		}
	}
};