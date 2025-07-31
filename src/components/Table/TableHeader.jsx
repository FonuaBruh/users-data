import { SortIndicator } from "../SortIndicator";
import { useState, useRef, useEffect } from "react";

export const TableHeader = ({
	columns,
	sortConfig,
	requestSort,
	sortableColumns = [],
	filters = {},
	onFilterChange,
	columnWidths,
	onColumnResize,
}) => {
	const [resizing, setResizing] = useState(null);
	const [startX, setStartX] = useState(0);
	const [startWidth, setStartWidth] = useState(0);
	const headerRefs = useRef({});

	const handleMouseDown = (e, columnKey) => {
		setResizing(columnKey);
		setStartX(e.clientX);
		setStartWidth(headerRefs.current[columnKey].offsetWidth);
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
	};

	const handleMouseMove = (e) => {
		if (resizing) {
			const newWidth = Math.max(50, startWidth + (e.clientX - startX));
			onColumnResize(resizing, newWidth);
		}
	};

	const handleMouseUp = () => {
		setResizing(null);
		document.body.style.cursor = "";
		document.body.style.userSelect = "";
	};

	useEffect(() => {
		if (resizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [resizing, startX, startWidth]);

	return (
		<thead>
			<tr>
				{columns.map((column) => {
					const isSortable = sortableColumns.includes(column.key);
					const isFilterable = column.filterable;
					const width = columnWidths[column.key] || "auto";

					return (
						<th
							key={column.key}
							ref={(el) => (headerRefs.current[column.key] = el)}
							className={`
								${sortConfig.key === column.key ? "active" : ""}
								${isSortable ? "sortable" : "non-sortable"}
							`}
							style={{
								width: `${width}px`,
								position: "relative",
								minWidth: "50px",
							}}
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
									placeholder="Фильтр..."
									className="filter-input"
								/>
							)}
							<div
								className="column-resizer"
								onMouseDown={(e) =>
									handleMouseDown(e, column.key)
								}
							/>
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
