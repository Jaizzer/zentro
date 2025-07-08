const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(data) {
	try {
		const localAccount = await prisma.localAccount.create({
			data,
		});

		return localAccount;
	} catch (error) {
		console.error("Failed to create the local account. ", error);
		throw error;
	}
}

async function findByOptions(options) {
	try {
		const localAccount = await prisma.localAccount.findFirst({
			where: options,
		});

		return localAccount;
	} catch (error) {
		console.error("Failed to retrieve the local account. ", error);
		throw error;
	}
}

async function findManyByOptions(options) {
	try {
		const localAccounts = await prisma.localAccount.findMany({
			where: options,
		});

		return localAccounts;
	} catch (error) {
		console.error("Failed to retrieve the local accounts. ", error);
		throw error;
	}
}

async function updateById({ id, data }) {
	try {
		const updatedLocalAccount = await prisma.localAccount.update({
			where: {
				id,
			},
			data: data,
		});

		return updatedLocalAccount;
	} catch (error) {
		console.error("Failed to update the local account. ", error);
		throw error;
	}
}

async function deleteById(id) {
	try {
		const deletedLocalAccount = await prisma.localAccount.delete({
			where: {
				id,
			},
		});

		return deletedLocalAccount;
	} catch (error) {
		console.error("Failed to delete the local account. ", error);
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
