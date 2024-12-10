import React from "react";
import "./TempData.css";

const TempData = (props) => {
	return (
		<>
			<div className="weather-data">
				<div className="info">
					<span>{props.infoTitle1}</span>
					<p>{props.infoDetail1} %</p>
				</div>
				<div className="info">
					<span>{props.infoTitle2}</span>
					<p>{props.infoDetail2} km/h</p>
				</div>
			</div>
		</>
	);
};

export default TempData;
