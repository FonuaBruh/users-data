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

export const filterData = (data, filters) => {
	if (!filters || Object.keys(filters).length === 0) return data;

	return data.filter((item) => {
		return Object.entries(filters).every(([key, value]) => {
			if (!value) return true;

			const itemValue = key.includes(".")
				? key.split(".").reduce((obj, k) => obj?.[k], item)
				: item[key];

			if (itemValue === undefined || itemValue === null) return false;

			return String(itemValue)
				.toLowerCase()
				.includes(String(value).toLowerCase());
		});
	});
};
