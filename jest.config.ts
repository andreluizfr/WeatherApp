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
							options: {
								metaObjectReplacement: {
									env: {
										VITE_OPEN_WEATHER_KEY: "fd02d68b5235d3fbdcd08c949ff2c127",
										VITE_CURRENT_WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5",
										VITE_HOURLY_WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5"
									}
								}
							}
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
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		"^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
		"^@data/(.*)$": "<rootDir>/src/data/$1",
		//"^@(.*)$": "<rootDir>/src$1" //se fosse pra todos, porém iria dar match com qualquer caminho até de bibliotecas
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	testMatch: [
		"<rootDir>/src/**/*.(spec|test).[jt]s?(x)"
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/pages/**/*.{ts,tsx}',
		'<rootDir>/src/components/**/*.{ts,tsx}',
		'<rootDir>/src/hooks/**/*.{ts,tsx}',
        '<rootDir>/src/utils/**/*.{ts,tsx}'
	],
	coverageThreshold: {
		global: {
		  branches: 80,
		  functions: 80,
		  lines: 80,
		  statements: 80,
		},
		'./src/components': {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 90,
		},
		'./src/utils': {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 90,
		}
	}
};