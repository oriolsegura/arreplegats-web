import React, { Component } from "react";
import sponsors from "../data/sponsors.json"

class Patrocinadors extends Component {
	render() {
		return (<>
			<section>
				<h2>Patrocinadors i col·laboradors</h2>
				{
					Object.entries(sponsors).map(([title, entities], i) => {
						return <div key={`sponsors-${i}`}>
							<h4 className="sponsors-title">{title}</h4>
							<div className="sponsors-wrap">
								{
									entities.map((e, j) => {
										return <figure className="sponsor" key={`sponsors-${i}-${j}`}>
											<img
												className="sponsor__image"
												src={`/sponsors/${e.image}`}
												alt={e.name}
												loading="lazy"
												decoding="async"
											/>
											<figcaption className="sponsor__name">{e.name}</figcaption>
										</figure>;
									})
								}
							</div>
						</div>;
					})
				}
			</section>
		</>);
	}
}

export default Patrocinadors;
