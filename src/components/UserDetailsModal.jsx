import React from "react";

export const UserDetailsModal = ({ user, onClose }) => {
	if (!user) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					&times;
				</button>
				<div className="user-header">
					<img
						src={user.image}
						alt="Аватар"
						className="user-avatar"
					/>
					<h2>
						{user.lastName} {user.firstName} {user.maidenName}
					</h2>
				</div>
				<div className="user-details">
					<div className="detail-row">
						<span className="detail-label">Возраст:</span>
						<span>{user.age} лет</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Пол:</span>
						<span>
							{user.gender === "male" ? "Мужской" : "Женский"}
						</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Рост:</span>
						<span>{user.height} см</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Вес:</span>
						<span>{user.weight} кг</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Телефон:</span>
						<span>{user.phone}</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Email:</span>
						<span>{user.email}</span>
					</div>
					<div className="address-section">
						<h3>Адрес</h3>
						<div className="detail-row">
							<span className="detail-label">Страна:</span>
							<span>{user.address?.country}</span>
						</div>
						<div className="detail-row">
							<span className="detail-label">Город:</span>
							<span>{user.address?.city}</span>
						</div>
						<div className="detail-row">
							<span className="detail-label">Улица:</span>
							<span>{user.address?.address}</span>
						</div>
						<div className="detail-row">
							<span className="detail-label">Штат:</span>
							<span>{user.address?.state}</span>
						</div>
						<div className="detail-row">
							<span className="detail-label">Индекс:</span>
							<span>{user.address?.postalCode}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
