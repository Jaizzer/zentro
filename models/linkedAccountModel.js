const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(data) {
	try {
		const linkedAccount = await prisma.linkedAccount.create({
			data,
		});

		return linkedAccount;
	} catch (error) {
		console.error("Failed to create the linked account. ", error);
		throw error;
	}
}

async function findByOptions(options) {
	try {
		const linkedAccount = await prisma.linkedAccount.findUnique({
			where: options,
		});

		return linkedAccount;
	} catch (error) {
		console.error("Failed to retrieve the linked account. ", error);
		throw error;
	}
}

async function updateById({ id, data }) {
	try {
		const updatedLocalAccount = await prisma.linkedAccount.update({
			where: {
				id,
			},
			data: data,
		});

		return updatedLocalAccount;
	} catch (error) {
		console.error("Failed to update the linked account. ", error);
		throw error;
	}
}

async function deleteById(id) {
	try {
		const deletedLocalAccount = await prisma.linkedAccount.delete({
			where: {
				id,
			},
		});

		return deletedLocalAccount;
	} catch (error) {
		console.error("Failed to delete the linked account. ", error);
		throw error;
	}
}

module.exports = {
	create,
	findByOptions,
	updateById,
	deleteById,
};
