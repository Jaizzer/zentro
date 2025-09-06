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

async function findInFolder({ userId, folderId, fileName }) {
	try {
		// Split the file name into the name and extension
		const [name, extension] = fileName.split(".");

		// Generate String pattern
		const pattern = `${name}( - \d)?.${extension}%`;

		// Retrieve the files using raw SQL query
		const files = await prisma.$queryRaw`
            SELECT name
            FROM files
            LEFT JOIN user_file_permissions
                ON files.id = user_file_permissions.file_id
            WHERE folder_id = ${folderId}
                AND (owner_id = ${userId} OR user_id = ${userId})
                AND name SIMILAR TO ${pattern}`;

		return files;
	} catch (error) {
		console.error("Failed to retrieve the files. ", error);
		throw error;
	}
}

async function findAccessible({ userId, cursor }) {
	try {
		const files = await prisma.file.findMany({
			take: 5,
			skip: cursor ? 1 : 0,
			cursor: cursor && { id: cursor },
			where: {
				OR: [
					{
						ownerId: userId,
					},
					{
						usersWithAccess: {
							some: {
								userId: userId,
							},
						},
					},
				],
			},
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
				favoritedBy: {
					select: {
						userId: true,
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
	findAccessible,
	findInFolder,
};
