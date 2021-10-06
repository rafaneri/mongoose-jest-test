import { connect, connection } from 'mongoose'

connect('mongodb://localhost:27017/mongoosetest', {
	autoIndex: true,
	autoCreate: true
})

const db = connection
db.on('error', console.error.bind(console, 'connection error:'))

export const isConnected = new Promise(resolve => db.once('open', resolve))
