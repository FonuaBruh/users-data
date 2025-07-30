import { SortIndicator } from "../SortIndicator";

export const TableHeader = ({
	columns,
	sortConfig,
	requestSort,
	sortableColumns = [],
	filters = {},
	onFilterChange,
}) => {
	return (
		<thead>
			<tr>
				{columns.map((column) => {
					const isSortable = sortableColumns.includes(column.key);
					const isFilterable = column.filterable;

					return (
						<th
							key={column.key}
							className={`
								${sortConfig.key === column.key ? "active" : ""}
								${isSortable ? "sortable" : "non-sortable"}
							`}
						>
							<div className="header-content">
								<span
									onClick={
										isSortable
											? () => requestSort(column.key)
											: undefined
									}
									style={{
										cursor: isSortable
											? "pointer"
											: "default",
									}}
								>
									{column.label}
									{isSortable && (
										<SortIndicator
											currentKey={column.key}
											sortConfig={sortConfig}
										/>
									)}
								</span>
							</div>
							{isFilterable && (
								<input
									type="text"
									value={filters[column.key] || ""}
									onChange={(e) =>
										onFilterChange(
											column.key,
											e.target.value
										)
									}
									placeholder={`Фильтр...`}
									className="filter-input"
								/>
							)}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
