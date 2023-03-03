import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

export const Reserve = ({ setOpen, hotelId }) => {
	const [selectedRooms, setSelectedRooms] = useState([]);
	const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
	const { dates } = useContext(SearchContext);
	const handleSelect = (e) => {
		const checked = e.target.checked;
		const value = e.target.value;
		setSelectedRooms((prev) => {
			return checked ? [...prev, value] : prev.filter((item) => item !== value);
		});
	};
	const getDate = (startDate, endDate) => {
		const date = new Date(startDate);
		let list = [];
		while (date <= endDate) {
			list.push(new Date(date).getTime());
			date.setDate(date.getDate + 1);
		}
		return list;
	};

	const allDates = getDate(dates[0].startDate, dates[0].endDate);

	const isAvailable = (roomNumber) => {
		const isFound = roomNumber.unavailableDates.some((unavailableDate) =>
			allDates.includes(new Date(unavailableDate).getTime())
		);
		return !isFound;
	};

	const navigate = useNavigate();

	const handleClick = async () => {
		try {
			await Promise.all(
				selectedRooms.map((roomNoId) => {
					const res = axios.put(`/rooms/availability/${roomNoId}`, {
						dates: allDates,
					});
					return res.data;
				})
			);
			setOpen(false);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="reserve">
			<div className="rContainer">
				<FontAwesomeIcon
					icon={faCircleXmark}
					className="rClose"
					onClick={() => setOpen(false)}
				/>
				<span>Select your room</span>
				{data.map((item, i) => (
					<div className="rItem" key={i}>
						<div className="rItemInfo">
							<div className="rTitle">{item.title}</div>
							<div className="rDesc">{item.desc}</div>
							<div className="rMax">
								Max people: <b>{item.maxPeople}</b>
							</div>
							<div className="rPrice">THB {item.price}</div>
						</div>
						<div className="rSelectRooms">
							{item.roomNumbers.map((roomNumber) => (
								<div className="room">
									<label>{roomNumber.number}</label>
									<input
										type="checkbox"
										value={roomNumber._id}
										onChange={handleSelect}
										disabled={!isAvailable(roomNumber)}
									/>
								</div>
							))}
						</div>
					</div>
				))}
				<button onClick={handleClick} className="rButton">
					Reserve Now!
				</button>
			</div>
		</div>
	);
};
