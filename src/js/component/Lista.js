import React from "react";
import PropType from "prop-types";
export function Lista(props) {
	return (
		<div className="list-group">
			{props.listacanciones.map(cancion => {
				return (
					<a
						key={cancion.id}
						href="#"
						className="list-group-item list-group-item-action">
						{cancion.id + " " + cancion.name}
					</a>
				);
			})}
		</div>
	);
}
Lista.propTypes = {
	listacanciones: PropType.array
};
