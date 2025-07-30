import React from "react";

export const TableRow = ({ user, columns }) => {
	return (
		<tr>
			{columns.map((column) => (
				<td key={`${user.id}-${column.key}`}>
					{column.key.includes(".")
						? column.key
								.split(".")
								.reduce((obj, key) => obj?.[key], user)
						: user[column.key]}
				</td>
			))}
		</tr>
	);
};
