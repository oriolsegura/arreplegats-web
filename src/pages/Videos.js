import React, { Component } from "react";

class Videos extends Component {
	state = {
		videos: [],
		isLoading: true,
		hasError: false,
	}

	componentDidMount() {
		const channelId = 'UC-RVCefwipBS8WutREwbTmw';
		const requestUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=";
		const feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(requestUrl) + channelId;

		fetch(feedUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error("No s'han pogut carregar els vídeos.");
				}

				return response.json();
			})
			.then((data) => {
				const videos = (data.items || []).slice(0, 10).map((item) => {
					const link = item.link;
					const id = link.substr(link.indexOf("=") + 1);

					return {
						title: item.title,
						id,
					};
				});

				this.setState({ videos, isLoading: false });
			})
			.catch(() => this.setState({ hasError: true, isLoading: false }));
	}

	render() {
		const { videos, isLoading, hasError } = this.state;

		return (<>
			<section>
                <h2>Vídeos</h2>

				<p>
					Els Arreplegats, des de fa temps, tenim un canal de <a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw/" target="_blank" rel="noreferrer">YouTube</a> en el que hi pugem contingut divers relacionat amb la colla. Hi pots trobar els vídeos dels castells de cada actuació, els vídeos promocionals de la colla o d'algun esdeveniment, cançons de la família verd quiròfan, i molt més!
				</p>
				<p>
					A continuació hi trobaràs els 10 últims vídeos perquè comencis a nodrir-te d'essència Arreplegada:
				</p>

				{isLoading && <div className="loading azu-videos-loading"></div>}
				{hasError && <p>No hem pogut carregar els últims vídeos. Pots veure'ls directament al <a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw/" target="_blank" rel="noreferrer">canal de YouTube dels Arreplegats</a>.</p>}
				<div className="azu-videos-grid">
					{
						videos.map((video, i) => (
							<iframe
								key={video.id}
								src={`https://www.youtube.com/embed/${video.id}?controls=0&showinfo=0&rel=0`}
								title={video.title}
								loading={i < 2 ? "eager" : "lazy"}
								referrerPolicy="strict-origin-when-cross-origin"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							></iframe>
						))
					}
				</div>
			</section>
		</>);
	}
}

export default Videos;
