import React, { useRef, useEffect, useState } from "react";
import { Cancion } from "./Cancion";

export function Home() {
	/* Categoria no te sirve para nada porque no lo vas a usar. */
	const [songList, setSongList] = useState([""]);

	const fetchT = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => {
				return response.json();
			})
			.then(response => {
				setSongList(response);
			});
	};

	/* cancion por defecto */
	const [cancionRepo, setCancionRepo] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	);

	const [cambioIPlay, setCambioIPlay] = useState("d-none");
	const [cambioIPause, setCambioIPause] = useState("d-block");

	let audio = useRef();
	/* Quitar o poner pause */
	const pauseYplay = () => {
		/* si el video se encuentra pausado */
		if (audio.current.paused) {
			/* entonces dale play */
			setCambioIPlay("d-none");
			setCambioIPause("d-block");
			audio.current.play();
			/* si el video no esta en pausa */
		} else if (!audio.current.paused) {
			/* entonces dale a pausa */
			setCambioIPlay("d-block");
			setCambioIPause("d-none");

			audio.current.pause();
		}
	};

	/* Repetir cancion o no loop y check */
	const [ActivadoONO, setActivadoONO] = useState(false);
	const cambiarEstado = () => {
		let check = document.querySelector("#cbox1").checked;
		setActivadoONO(check);
	};

	/* Al hacer click */
	const cambiarCancion = cancionUrl => {
		let prefijo = "https://assets.breatheco.de/apis/sound/" + cancionUrl;
		setCancionRepo(prefijo);
	};

	/* Escuchando por defecto posicion */
	const [idescuchando, setIdescuchando] = useState(0);
	const [aleatorioCan, setAleatorioCan] = useState(false);

	/* siguienteCancion */
	const siguienteCancion = () => {
		let cancionsiguiento = "https://assets.breatheco.de/apis/sound/";
		if (idescuchando >= 0) {
			cancionsiguiento += songList[idescuchando + 1].url;
			setCancionRepo(cancionsiguiento);
			setIdescuchando(idescuchando + 1);
		} else if (idescuchando === 22) {
			console.log(idescuchando + "ALTO SOY YO");
		}
		cancionsiguiento = "";
	};

	const antesCancion = () => {
		let cancionsiguiento = "https://assets.breatheco.de/apis/sound/";
		if (idescuchando - 1 == -1) {
		} else if (idescuchando == 0) {
			cancionsiguiento += songList[0].url;
		} else {
			cancionsiguiento += songList[idescuchando - 1].url;
			setIdescuchando(idescuchando - 1);
		}
		setCancionRepo(cancionsiguiento);
		cancionsiguiento = "";
	};

	/* volumen */
	const sumarVol = () => {
		let volumenOriginal = document.querySelector("#audio");
		volumenOriginal.volume += 0.2;
	};
	const restarVol = () => {
		let volumenOriginal = document.querySelector("#audio");
		volumenOriginal.volume -= 0.2;
	};

	/* duracion del audio */
	const [duracionA, setDuracionA] = useState(0);

	const maxDuracionInSeg = () => {
		let tiempoinSeg = document.querySelector("#audio").duration;
		setDuracionA(tiempoinSeg);
	};

	const [duracionDelAudio, setDuracionDelAudio] = useState(0);
	/* pintamos la duracion de cada video */
	const verDuracion = () => {
		var duracion = document.querySelector("#audio");
		duracion.onloadeddata = function() {
			let minute = Math.floor(duracion.duration / 60);
			minute = minute < 10 ? "0" + minute : minute;
			var second = duracion.duration % 60;
			second = second < 10 ? "0" + second : second;
			setDuracionDelAudio(
				" " + Math.floor(minute) + ":" + Math.floor(second)
			);
		};
	};

	useEffect(() => {
		fetchT();
	}, []);

	useEffect(() => {
		verDuracion();
		maxDuracionInSeg();
	});

	/* tiempo transcurdio */

	const [tiempoTranscurrdioSlider, setTiempoTranscurrdioSlider] = useState(0);
	const [tiempoTranscurrdio, setTiempoTranscurrdio] = useState(0);
	const transcurrir = () => {
		let transsC = audio.current;
		/* si llegan a ser mas de 60 seg empieza a transformarlo */
		let minute = Math.floor(transsC.currentTime / 60);
		minute = minute < 10 ? "0" + minute : minute;
		let second = transsC.currentTime % 60;
		let second2 = transsC.currentTime;
		setTiempoTranscurrdioSlider(second2);
		second = second < 10 ? "0" + second : second;
		setTiempoTranscurrdio(Math.floor(minute) + ":" + Math.floor(second));
	};

	/* para que vaya contando los segundos */
	setInterval(() => {
		transcurrir();
	}, 1000);

	return (
		<div className="container mt-3">
			<div className="row justify-content-center">
				<div className="col-9 border border-secondary">
					<header className="border-bottom border-secondary px-2">
						<img
							width="150px"
							src="https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg"
						/>
					</header>
					<div className="scrollMusic">
						{/* Canciones */}
						{songList.map((element, i) => {
							return (
								<Cancion
									key={i}
									id={element.id}
									name={element.name}
									url={element.url}
									cambiarCancion={cambiarCancion}
									setIdescuchando={setIdescuchando}
									setCambioIPlay={setCambioIPlay}
									setCambioIPause={setCambioIPause}
								/>
							);
						})}
					</div>

					<div className="row justify-content-center text-center controlesbtns border border-secondary">
						<div className="col-12 mt-3">
							<div className="row justify-content-center">
								<div className="col-8">
									<audio
										id="audio"
										ref={audio}
										src={cancionRepo}
										autoPlay
										loop={ActivadoONO}
										/* Antes verificamos con una condicional si
                                 el chek esta desconectado sino volvemos a repro */
										onEnded={siguienteCancion}
									/>
									{/* <input
								type="range"
								max={duracionA}
								value={tiempoTranscurrdioSlider}
							/> */}
									<div className="progress mt-2">
										<div
											className="progress-bar bg-success"
											role="progressbar"
											style={{
												width:
													Math.floor(
														tiempoTranscurrdioSlider *
															100
													) /
														duracionA +
													"%"
											}}
											aria-valuenow={
												tiempoTranscurrdioSlider + "%"
											}
											aria-valuemin="0"
											aria-valuemax={
												(duracionA * 100) / duracionA
											}></div>
									</div>
								</div>
								<div className="col-2">
									<p className="text-success h4">
										{tiempoTranscurrdio} -{" "}
										{duracionDelAudio}
									</p>
								</div>
							</div>
						</div>
						<div className="col-12">
							<p className="h4 text-white">
								{idescuchando + 1} -
								{" " + songList[idescuchando].name}
							</p>
						</div>

						{/* Aleatorio */}
						<div className="col-3"></div>
						{/* botones atras play siguiente */}

						<div className="col-6 mb-3">
							<button
								onClick={antesCancion}
								className="rounded-circle px-2 py-1 bg-dark text-white">
								<i className="fas fa-backward"></i>
							</button>
							<button
								onClick={pauseYplay}
								className="rounded-circle px-2 py-1  mx-3">
								<i className={"fas fa-play " + cambioIPlay}></i>
								<i
									className={
										"fas fa-pause " + cambioIPause
									}></i>
							</button>
							<button
								onClick={siguienteCancion}
								className="rounded-circle px-2 py-1 bg-dark text-white ">
								<i className="fas fa-forward"></i>
							</button>
						</div>
						<div className="col-3 text-center">
							<input
								type="checkbox"
								id="cbox1"
								value="first_checkbox"
								onClick={cambiarEstado}
							/>{" "}
							Repetir
							<button
								onClick={sumarVol}
								className="rounded-circle px-2 py-1 bg-dark text-white ml-4 mr-2 ">
								<i className="fas fa-volume-up"></i>
							</button>
							<button
								onClick={restarVol}
								className="rounded-circle px-2 py-1 bg-dark text-white ">
								<i className="fas fa-volume-down"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
