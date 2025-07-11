const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(data) {
	try {
		const folder = await prisma.folder.create({
			data,
		});

		return folder;
	} catch (error) {
		console.error("Failed to create the folder. ", error);
		throw error;
	}
}

async function findManyByOptions(options) {
	try {
		const folders = await prisma.folder.findMany({
			where: options,
			omit: {
				ownerId: true,
			},
			include: {
				owner: true,
				files: true,
				usersWithAccess: {
					include: {
						user: true,
					},
				},
			},
		});

		return folders;
	} catch (error) {
		console.error("Failed to retrieve the folders. ", error);
		throw error;
	}
}

module.exports = {
	create,
	findManyByOptions,
};
