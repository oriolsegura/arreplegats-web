import React from "react";

function Eines() {
	return (<>
		<section>
			<h1 className="page-title">Eines per als membres</h1>
			<p>Fer castells també vol dir organitzar-nos. Aquí trobaràs l'eina que ens ajuda a coordinar el dia a dia de la colla.</p>
		</section>
		<section className="member-tool" aria-labelledby="aleta-title">
			<h2 id="aleta-title">Aleta, l'app de la colla</h2>
			<p>Als Arreplegats fem servir l'Aleta per coordinar els assajos i les diades. Ens permet compartir la informació entre castellers, junta i tècnica i preparar-nos per fer pinya.</p>
			<ul className="member-tool__features">
				<li>
					<h3>Assistència</h3>
					<p>Confirma si vindràs als assajos i les diades perquè la tècnica pugui comptar amb tu.</p>
				</li>
				<li>
					<h3>Pinyes</h3>
					<p>Consulta la teva posició a les pinyes i ajuda'ns a preparar cada castell.</p>
				</li>
				<li>
					<h3>Quotes i pagaments</h3>
					<p>Consulta els teus pagaments i tingues la informació de tresoreria a mà.</p>
				</li>
			</ul>
			<div className="read-more member-tool__action">
				<a href="https://aleta.castellera.cat/">Descobreix l'Aleta</a>
			</div>
			<p className="member-tool__case">
				Vols saber com ens ajuda a organitzar-nos? <a href="https://aleta.castellera.cat/casos/arreplegats">Llegeix el cas d'ús dels Arreplegats a l'Aleta</a>.
			</p>
		</section>
	</>);
}

export default Eines;
