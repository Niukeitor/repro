import React, { useState, useEffect } from "react";
import { Lista } from "./Lista";

//create your first component
export function Home() {
	useEffect(() => {
		listacanciones();
	}, []);
	//fetch
	let [listaFetch, setListaFetch] = useState([]);
	const listacanciones = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setListaFetch(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-fluid">
			<audio src="https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"></audio>
			<Lista listacanciones={listaFetch}></Lista>
			<div className="bg-success d-flex justify-content-center">
				<a>
					<i className="far fa-hand-point-left fa-2x"></i>
				</a>

				<a>
					<i className="far fa-play-circle fa-2x"></i>
				</a>

				<a>
					<i className="far fa-hand-point-right fa-2x"></i>
				</a>
			</div>
		</div>
	);
}
