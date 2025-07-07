const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("../generated/prisma");

const SessionStore = new PrismaSessionStore(new PrismaClient(), {
	checkPeriod: 2 * 60 * 1000, // 2 minutes
	dbRecordIdIsSessionId: true,
	dbRecordIdFunction: undefined,
});

module.exports = SessionStore;
