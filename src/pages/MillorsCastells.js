import React, { Component } from "react";
import CastellCard from "../components/CastellCard";
import castells_map from "../data/castells-top.json";

class MillorsCastells extends Component {
	render() {
		return (<>
			<section>
				<h2>Millors Castells</h2>

				<p>
					Aquesta selecció recull els castells més destacats dels Arreplegats, fites universitàries que expliquen el nivell assolit per la colla.
				</p>

				<div className="top-gallery">
					{
						Object.values(castells_map).map((e, i) => {
							return <CastellCard
								name={e.name}
								link={e.link}
								notation={e.notation}
								key={i}
							/>
						})
					}
				</div>
			</section>
		</>);
	}
}

export default MillorsCastells;
