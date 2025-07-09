function removeTime(dateTime) {
	const date = new Date(dateTime);
	return date.toDateString();
}

module.exports = {
	removeTime,
};
