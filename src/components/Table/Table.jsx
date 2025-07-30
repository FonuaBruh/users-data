import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export const Table = ({
	data,
	columns,
	sortConfig,
	requestSort,
	sortableColumns,
}) => {
	return (
		<table>
			<TableHeader
				columns={columns}
				sortConfig={sortConfig}
				requestSort={requestSort}
				sortableColumns={sortableColumns}
			/>
			<tbody>
				{data.map((user) => (
					<TableRow key={user.id} user={user} columns={columns} />
				))}
			</tbody>
		</table>
	);
};
