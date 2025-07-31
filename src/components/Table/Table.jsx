import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { useState } from "react";

export const Table = ({
	data,
	columns,
	sortConfig,
	requestSort,
	sortableColumns,
	filters,
	onFilterChange,
	onRowClick,
}) => {
	const [columnWidths, setColumnWidths] = useState(
		columns.reduce((acc, column) => {
			acc[column.key] = column.initialWidth || 150;
			return acc;
		}, {})
	);

	const handleColumnResize = (columnKey, newWidth) => {
		setColumnWidths((prev) => ({
			...prev,
			[columnKey]: newWidth,
		}));
	};

	return (
		<table
			style={{
				tableLayout: "fixed",
				width: "100%",
				borderCollapse: "collapse",
			}}
		>
			<TableHeader
				columns={columns}
				sortConfig={sortConfig}
				requestSort={requestSort}
				sortableColumns={sortableColumns}
				filters={filters}
				onFilterChange={onFilterChange}
				columnWidths={columnWidths}
				onColumnResize={handleColumnResize}
			/>
			<tbody>
				{data.map((user) => (
					<TableRow
						key={user.id}
						user={user}
						columns={columns}
						onRowClick={onRowClick}
						columnWidths={columnWidths}
					/>
				))}
			</tbody>
		</table>
	);
};
