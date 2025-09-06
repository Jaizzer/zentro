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

async function findAccessible({ userId, folderId, cursor, isPaginated }) {
	try {
		const folders = await prisma.folder.findMany({
			take: isPaginated ? 1 : undefined,
			skip: isPaginated && cursor ? 1 : 0,
			cursor: cursor && { id: cursor },
			where: {
				AND: [
					// Only filter the folders by id if the folder id was provided
					{ id: folderId || undefined },
					{
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
				],
			},
			omit: {
				ownerId: true,
			},
			include: {
				owner: true,
				files: {
					include: {
						owner: true,
						folder: true,
					},
				},
				childrenFolders: true,
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
		return folders;
	} catch (error) {
		console.error("Failed to retrieve the folders. ", error);
		throw error;
	}
}

module.exports = {
	create,
	findAccessible,
};
