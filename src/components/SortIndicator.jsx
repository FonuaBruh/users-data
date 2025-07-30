import React from "react";
import { getSortIndicator } from "../utils/sortUtils";

export const SortIndicator = ({ currentKey, sortConfig }) => {
	const indicator = getSortIndicator(currentKey, sortConfig);

	return <span className="sort-indicator">{indicator}</span>;
};
