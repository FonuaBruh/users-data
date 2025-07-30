export const sortData = (data, { key, direction }) => {
	if (direction === "none" || !key) return [...data];

	return [...data].sort((a, b) => {
		if (typeof a[key] === "string") {
			const valueA = a[key].toLowerCase();
			const valueB = b[key].toLowerCase();

			return direction === "ascending"
				? valueA.localeCompare(valueB)
				: valueB.localeCompare(valueA);
		}

		if (a[key] < b[key]) {
			return direction === "ascending" ? -1 : 1;
		}
		if (a[key] > b[key]) {
			return direction === "ascending" ? 1 : -1;
		}

		return 0;
	});
};

export const getSortIndicator = (currentKey, sortConfig) => {
	if (sortConfig.key !== currentKey) return "↕";

	switch (sortConfig.direction) {

		case "ascending":
			return "↑";

		case "descending":
			return "↓";

		default:
			return "↕";
	}
};
