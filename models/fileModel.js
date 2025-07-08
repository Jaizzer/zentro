const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(data) {
	try {
		const file = await prisma.file.create({
			data,
		});

		return file;
	} catch (error) {
		console.error("Failed to create the file. ", error);
		throw error;
	}
}

async function createMany(data) {
	try {
		const file = await prisma.file.createMany({
			data,
		});

		return file;
	} catch (error) {
		console.error("Failed to create the files. ", error);
		throw error;
	}
}

module.exports = {
	create,
	createMany,
};
