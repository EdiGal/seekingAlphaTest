const {NODE_END="dev", PORT=3000, DB_URI="localhost", DB_NAME="seeking_alpha", DB_USER="root", DB_PASSWORD} = process.env;

module.exports = {
    NODE_END,
    PORT,
    host: DB_URI,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
}