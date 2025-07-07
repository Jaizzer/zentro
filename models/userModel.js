const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(data) {
	try {
		const user = await prisma.user.create({
			data,
		});

		return user;
	} catch (error) {
		console.error("Failed to create the user. ", error);
		throw error;
	}
}

async function findByOptions(options) {
	try {
		const user = await prisma.user.findUnique({
			where: options,
		});

		return user;
	} catch (error) {
		console.error("Failed to retrieve the user. ", error);
		throw error;
	}
}

async function findManyByOptions(options) {
	try {
		const users = await prisma.user.findMany({
			where: options,
		});

		return users;
	} catch (error) {
		console.error("Failed to retrieve the users. ", error);
		throw error;
	}
}

async function updateById({ id, data }) {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data: data,
		});

		return updatedUser;
	} catch (error) {
		console.error("Failed to update the user. ", error);
		throw error;
	}
}

async function deleteById(id) {
	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id,
			},
		});

		return deletedUser;
	} catch (error) {
		console.error("Failed to delete the user. ", error);
		throw error;
	}
}

module.exports = {
	create,
	findByOptions,
	findManyByOptions,
	updateById,
	deleteById,
};
