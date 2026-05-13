import React, { Component } from "react";
import castellsMap from "../data/castells-top.json";

function getPhotoItems() {
	const photos = [];
	const seen = new Set();

	Object.values(castellsMap).forEach((castell) => {
		const candidates = castell.gallery || [{
			link: castell.link,
			caption: castell.name,
		}];

		candidates.forEach((photo) => {
			if (!photo.link || seen.has(photo.link)) {
				return;
			}

			seen.add(photo.link);
			photos.push({
				src: photo.link,
				alt: photo.caption || castell.name,
				caption: photo.caption || castell.name,
			});
		});
	});

	return photos;
}

class Fotografies extends Component {
	render() {
		const photos = getPhotoItems();

		return (<>
			<section>
				<h2>Fotografies</h2>

				<p>
					Recull d'imatges destacades dels castells dels Arreplegats de la Zona Universitària, amb fotografies de diades, aniversaris i fites històriques de la colla.
				</p>

				<div className="azu-photo-gallery">
					{
						photos.map((photo, i) => (
							<figure className="azu-photo-gallery__item" key={photo.src}>
								<img
									className="azu-photo-gallery__image"
									src={photo.src}
									alt={photo.alt}
									loading={i < 2 ? "eager" : "lazy"}
									decoding="async"
								/>
								<figcaption>{photo.caption}</figcaption>
							</figure>
						))
					}
				</div>
			</section>
		</>);
	}
}

export default Fotografies;
