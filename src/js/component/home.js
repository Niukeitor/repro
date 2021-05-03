import React from "react";
import { Lista } from "./Lista";

//create your first component
export function Home() {
	[
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
		<div className="d-flex justify-content-center align-items-center vh-100">
			<Lista></Lista>
		</div>
	);
}
