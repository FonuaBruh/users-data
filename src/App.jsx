import { useState, useEffect } from "react";
import { fetchUsers } from "./api/usersApi";
import { useSort } from "./hooks/useSort";
import { sortData, filterData } from "./utils/sortUtils";
import { Table } from "./components/Table";
import "./App.css";

const columns = [
	{ key: "lastName", label: "Фамилия", filterable: true },
	{ key: "firstName", label: "Имя", filterable: true },
	{ key: "maidenName", label: "Отчество", filterable: true },
	{ key: "age", label: "Возраст", filterable: true },
	{ key: "gender", label: "Пол", filterable: true },
	{ key: "phone", label: "Телефон", filterable: true },
	{ key: "email", label: "Email", filterable: true },
	{ key: "address.country", label: "Страна", filterable: true },
	{ key: "address.city", label: "Город", filterable: true },
];

const sortableColumns = [
	"lastName",
	"firstName",
	"maidenName",
	"age",
	"gender",
	"phone",
];

function App() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { sortConfig, requestSort } = useSort();
	const [filters, setFilters] = useState({});

	useEffect(() => {
		const loadUsers = async () => {
			try {
				const data = await fetchUsers();
				setUsers(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadUsers();
	}, []);

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const filteredUsers = filterData(users, filters);
	const sortedUsers = sortData(filteredUsers, sortConfig);

	if (loading) return <div className="loading">Загрузка данных...</div>;
	if (error)
		return <div className="error">Ошибка загрузки данных: {error}</div>;

	return (
		<div className="app">
			<h1>Таблица пользователей</h1>
			<div className="table-container">
				<Table
					data={sortedUsers}
					columns={columns}
					sortConfig={sortConfig}
					requestSort={requestSort}
					sortableColumns={sortableColumns}
					filters={filters}
					onFilterChange={handleFilterChange}
				/>
			</div>
		</div>
	);
}

export default App;
