import React from "react";
import { Lista } from "./Lista";

//create your first component
export function Home() {
	let canciones = [
		{
			id: 1,
			category: "game",
			name: "Mario Castle",
			url: "files/mario/songs/castle.mp3"
		},
		{
			id: 2,
			category: "game",
			name: "Mario Star",
			url: "files/mario/songs/hurry-starman.mp3"
		},
		{
			id: 3,
			category: "game",
			name: "Mario Overworld",
			url: "files/mario/songs/overworld.mp3"
		}
	];
	return (
		<div className="container-fluid">
			<Lista listacanciones={canciones}></Lista>
			<div className="bg-success d-flex justify-content-center">
				<a>
					<i class="far fa-hand-point-left"></i>
				</a>
				<a>
					<i class="far fa-play-circle"></i>
				</a>
				<a>
					<i class="far fa-hand-point-right"></i>
				</a>
			</div>
		</div>
	);
}
