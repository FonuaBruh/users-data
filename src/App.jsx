import { useState, useEffect } from "react";
import { fetchUsers } from "./api/usersApi";
import { useSort } from "./hooks/useSort";
import { sortData, filterData } from "./utils/sortUtils";
import { Table } from "./components/Table";
import { UserDetailsModal } from "./components/UserDetailsModal";
import "./App.css";

const columns = [
	{ key: "lastName", label: "Фамилия", filterable: true, initialWidth: 100 },
	{ key: "firstName", label: "Имя", filterable: true, initialWidth: 100 },
	{ key: "maidenName", label: "Отчество", filterable: true, initialWidth: 90 },
	{ key: "gender", label: "Пол", filterable: true, initialWidth: 60 },
	{ key: "phone", label: "Телефон", filterable: true, initialWidth: 130 },
	{ key: "email", label: "Email", filterable: true, initialWidth: 200 },
	{ key: "address.country", label: "Страна", filterable: true, initialWidth: 120 },
	{ key: "address.city", label: "Город", filterable: true, initialWidth: 120 },
	{ key: "age", label: "Возраст", filterable: true, initialWidth: 80 },
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
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(10);
	const [selectedUser, setSelectedUser] = useState(null);

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
		setCurrentPage(1);
	};

	const filteredUsers = filterData(users, filters);
	const sortedUsers = sortData(filteredUsers, sortConfig);

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
	const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	if (loading) return <div className="loading">Загрузка данных...</div>;
	if (error)
		return <div className="error">Ошибка загрузки данных: {error}</div>;

	return (
		<div className="app">
			<h1>Таблица пользователей</h1>
			<div className="table-container">
				<Table
					data={currentUsers}
					columns={columns}
					sortConfig={sortConfig}
					requestSort={requestSort}
					sortableColumns={sortableColumns}
					filters={filters}
					onFilterChange={handleFilterChange}
					onRowClick={setSelectedUser}
				/>
			</div>
			<div className="pagination">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(
					(number) => (
						<button
							key={number}
							onClick={() => paginate(number)}
							className={currentPage === number ? "active" : ""}
						>
							{number}
						</button>
					)
				)}
			</div>
			{selectedUser && (
				<UserDetailsModal
					user={selectedUser}
					onClose={() => setSelectedUser(null)}
				/>
			)}
		</div>
	);
}

export default App;
