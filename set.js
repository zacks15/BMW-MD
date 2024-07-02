const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0FvSTJXZ3dpbGhVY245ckIvL3pEdkRMcEFaZ2d0b0JRVHdWcVpoTHZrVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzJlQ1R0TXVMa0FuRW9vR25zWTd6WDRpczVSV21Jb0Uwb0dtdzI2QzBCTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzUHMxaktzWmM2RVRabHlaUlFvY1F1RXJ1ZmQ0V1JCaXFpU2Y2MHdIa2xVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4U0pTNDUyWkNQMTNkcHNHWTl3MTJLalRhdmRNU1poUWNZaE1YR3YrSkZ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJKWlM5NHlLQW94R2hwQzJtcHpOUnV1eVh4ejlIYWF2M25KNFAzeFQrMWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxNN0JBWi9sSm1IcjR5T3RQeGVlWFBkNUp6M3NhMHJibGM4aEZxd3lIeTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOElMN1dQTTBzVjRkL1djSUtyOERZUVYzY2JQbDZEL3cvNUlWYUduVmEyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0YzaC94SjJTdlVORXF0bUk3YWZNVUFyaHRtcFZLREVlcm9iajh2d0tXVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImgyRzRqUm5uYlVia0RJTVB3TkRPK2MzNEJkQTRITUFkU1pXRDNKN0ZDOENRbUFJeTBkM1E0TkxLQUhyaDdiVkhRZURYVTQ1ZnRVMlh0c3U2OHBCYWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI3LCJhZHZTZWNyZXRLZXkiOiIzN3IyWmhSdEJxR1p5S2hwQ0RHVW1mSzlwd3BEMk0wNzFOM1JkcnBPNjNrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2NWV6QUZiZFJCNm9XVkFfOUZaX0dBIiwicGhvbmVJZCI6ImI4MGEzNzM0LWI2Y2YtNDYwOS04OWFjLTMwZTg5MWJiYmZiMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVeFNOUEthbGdXY3UwcWxHcWpuZmpzdnhKNEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2JoMTU3aW5QRnpsUjNQZ0VIbWxHUVIxREFZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZLNkFTM0w3IiwibWUiOnsiaWQiOiIyNjA5NzE4MTY5NTY6NTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTWFrbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2lwbHNrRUVOM2prTFFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOXd0Z0F5aEV2N2xFZEFBSmwxQU5kTzZLNDN5U08zelAzRGdKY0tTT2ltdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY0pZenp6UUlaZjNUcEppeERJOWVjRWt0aDQycVIxcG53M09WQ1AzYnp2dTAxUm5LOFg3VXpLUVRiQjhPa2FGNW9FMmxYRm15VEJINTZ5VEdWemczREE9PSIsImRldmljZVNpZ25hdHVyZSI6IjVBUkw4MkJGVnRLVUpWakh1Q243SEgyM1Jsdk5oOWtPWWRCejJaRTMrOG1JaUQzT3FNSVl3Zks3TFQxbnFGaHJDRU96bmZTU1doTThlWWQ1cEdySGh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYwOTcxODE2OTU2OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZjTFlBTW9STCs1UkhRQUNaZFFEWFR1aXVOOGtqdDh6OXc0Q1hDa2pvcHMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTk5Mzk1NjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQlpPIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KING👑MAKO",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "KING👑MAKO",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'MAKO❤️',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
