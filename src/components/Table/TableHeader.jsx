import { SortIndicator } from "../SortIndicator";

export const TableHeader = ({
	columns,
	sortConfig,
	requestSort,
	sortableColumns = [],
}) => {
	return (
		<thead>
			<tr>
				{columns.map((column) => {
					const isSortable = sortableColumns.includes(column.key);

					return (
						<th
							key={column.key}
							onClick={
								isSortable
									? () => requestSort(column.key)
									: undefined
							}
							className={`
								${sortConfig.key === column.key ? "active" : ""}
								${isSortable ? "sortable" : "non-sortable"}
							`}
						>
							{column.label}
							{isSortable && (
								<SortIndicator
									currentKey={column.key}
									sortConfig={sortConfig}
								/>
							)}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
