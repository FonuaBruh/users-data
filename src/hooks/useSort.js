import React from "react";
import { useState } from "react";

export const useSort = () => {
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: "none",
	});

	const requestSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key) {
			if (sortConfig.direction === "ascending") {
				direction = "descending";
			} else if (sortConfig.direction === "descending") {
				direction = "none";
			}
		}

		setSortConfig({ key, direction });
	};

	return { sortConfig, requestSort };
};
