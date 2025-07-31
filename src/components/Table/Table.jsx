import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

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
	return (
		<table>
			<TableHeader
				columns={columns}
				sortConfig={sortConfig}
				requestSort={requestSort}
				sortableColumns={sortableColumns}
				filters={filters}
				onFilterChange={onFilterChange}
			/>
			<tbody>
				{data.map((user) => (
					<TableRow
						key={user.id}
						user={user}
						columns={columns}
						onRowClick={onRowClick}
					/>
				))}
			</tbody>
		</table>
	);
};
