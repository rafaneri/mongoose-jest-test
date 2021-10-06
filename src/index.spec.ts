import { isConnected } from './db'

describe('GenericRepository', () => {
	beforeEach(async () => {
		await isConnected
	})
})