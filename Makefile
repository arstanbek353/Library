start:
	DEBUG=express-locallibrary-tutorial:* npm start
dev:
	DEBUG=express-locallibrary-tutorial:* npm run dev
db:
	mongod --dbpath=/Users/user/data/db
populatedb:
	node populatedb mongodb://localhost:27017/mozilla
populatedbRemote:
	node populatedb mongodb+srv://Arstanbek:akbosogo2022@cluster0.ntfdt.mongodb.net/mozilla?retryWrites=true&w=majority