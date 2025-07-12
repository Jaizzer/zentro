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
		const files = await prisma.file.createManyAndReturn({
			data,
		});

		return files;
	} catch (error) {
		console.error("Failed to create the files. ", error);
		throw error;
	}
}

async function findManyByOptions({ options, cursor }) {
	try {
		const files = await prisma.file.findMany({
			take: 5,
			skip: cursor ? 1 : 0,
			cursor: cursor && { id: cursor },
			where: options,
			omit: {
				ownerId: true,
				folderId: true,
			},
			include: {
				owner: true,
				folder: true,
				usersWithAccess: {
					include: {
						user: true,
					},
				},
			},
			orderBy: {
				id: "asc",
			},
		});

		return files;
	} catch (error) {
		console.error("Failed to retrieve the files. ", error);
		throw error;
	}
}

module.exports = {
	create,
	createMany,
	findManyByOptions,
};
