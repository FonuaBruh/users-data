import { useState, useEffect } from "react";
import { fetchUsers } from "./api/usersApi";
import { useSort } from "./hooks/useSort";
import { sortData } from "./utils/sortUtils";
import { Table } from "./components/Table";
import "./App.css";

const columns = [
	{ key: "lastName", label: "Фамилия" },
	{ key: "firstName", label: "Имя" },
	{ key: "maidenName", label: "Отчество" },
	{ key: "age", label: "Возраст" },
	{ key: "gender", label: "Пол" },
	{ key: "phone", label: "Телефон" },
	{ key: "email", label: "Email" },
	{ key: "address.country", label: "Страна" },
	{ key: "address.city", label: "Город" },
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

	const sortedUsers = sortData(users, sortConfig);

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
				/>
			</div>
		</div>
	);
}

export default App;
