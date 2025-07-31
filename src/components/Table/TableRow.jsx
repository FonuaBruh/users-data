import React from "react";

export const TableRow = ({ user, columns, onRowClick, columnWidths }) => {
	return (
		<tr onClick={() => onRowClick(user)} style={{ cursor: "pointer" }}>
			{columns.map((column) => {
				const value = column.key.includes(".")
					? column.key
							.split(".")
							.reduce((obj, key) => obj?.[key], user)
					: user[column.key];

				return (
					<td
						key={`${user.id}-${column.key}`}
						style={{ width: `${columnWidths[column.key]}px` }}
						title={String(value)}
					>
						{value}
					</td>
				);
			})}
		</tr>
	);
};
