import React from "react";

const woning = {
  titel: "Lendeleedsestraat 58, 8870 Izegem",
  prijs: "Vraagprijs: € 300 000 k.k.",
  type: "Halfopen bebouwing",
  bouwjaar: "1962",
  perceel: "462 m²",
  woonoppervlakte: "200 m²",
  kamers: "2",
  energie: "TBD",
  beschrijving: `
Charmante halfopen, recent gerenoveerde \u00E9\u00E9ngezinswoning met ruime oprit en garage.
Op het gelijksvloers vinden we ruime woongedeeltes met een grote keuken, eetplaats en salon,
een in het huis ge\u00EFntegreerde veranda als extra ruimte en een toilet.
De keuken kijkt uit op een gezellige groene tuin met omheining langs de ene kant en een hoge struik langs de andere kant.
Boven vinden we 1 master bedroom en 1 ruime kamer, plus een moderne badkamer en apart toilet.
Vanaf het eerste verdiep kan je via een vaste trap richting de ruime zolder,
waar er mogelijkheid is om 1 of meerdere extra kamers of andere ruimtes te maken.
De ligging net buiten het centrum zorgt voor een rustige omgeving die toch een vlotte verbinding biedt
richting centrum, rijksweg en autostrade, Ingelmunster, Lendelede, ... .
`.trim(),
  kenmerken: [
    "Zuidwest gerichte en makkelijk onderhoudbare tuin met groot terras",
    "Recent gerenoveerd en instapklaar",
    "Rustige ligging nabij scholen, winkels, centrum en autostrade",
    "Garage + oprit",
    "Apart toilet boven en beneden",
  ],
  contactNaam: "Wouter Vercruysse",
  contactTelefoon: "0497 28 32 79",
  contactEmail: "swouterke@proton.me",
  adresKaartLink:
    "https://www.google.com/maps/place/Lendeleedsestraat+58,+8870+Izegem/@50.9138966,3.2248422,584m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c337629a5bea61:0x20a9d607e9bb1285!8m2!3d50.9138966!4d3.2274171!16s%2Fg%2F11v3pzq6qm?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
};

const galerij = [
  {
    src: "https://picsum.photos/id/1048/1200/800",
    alt: "Vooraanzicht van de woning",
  },
  {
    src: "https://picsum.photos/id/1067/1200/800",
    alt: "Leefruimte met veel lichtinval",
  },
  {
    src: "https://picsum.photos/id/1073/1200/800",
    alt: "Moderne keuken",
  },
  {
    src: "https://picsum.photos/id/1084/1200/800",
    alt: "Tuin en terras",
  },
  {
    src: "https://picsum.photos/id/1068/1200/800",
    alt: "Slaapkamer",
  },
  {
    src: "https://picsum.photos/id/1025/1200/800",
    alt: "Badkamer",
  },
];

function InfoCard({ label, waarde }) {
  return (
    <article className="info-card">
      <p className="info-label">{label}</p>
      <p className="info-waarde">{waarde}</p>
    </article>
  );
}

export default function App() {
  return (
    <div className="pagina">
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="badge">Woning Te Koop</p>
          <h1>{woning.titel}</h1>
          <p className="prijs">{woning.prijs}</p>
          <p className="intro">{woning.beschrijving}</p>
          <a className="cta-knop" href="#contact">
            Plan een bezoek op de kijkdag &lt;TBD&gt;
          </a>
        </div>
      </header>

      <main className="container">
        <section className="sectie" aria-labelledby="details-titel">
          <h2 id="details-titel">Belangrijkste Gegevens</h2>
          <div className="info-grid">
            <InfoCard label="Type" waarde={woning.type} />
            <InfoCard label="Bouwjaar" waarde={woning.bouwjaar} />
            <InfoCard label="Perceel" waarde={woning.perceel} />
            <InfoCard label="Woonoppervlakte" waarde={woning.woonoppervlakte} />
            <InfoCard label="Kamers" waarde={woning.kamers} />
            <InfoCard label="Energie" waarde={woning.energie} />
          </div>
        </section>

        <section className="sectie" aria-labelledby="troeven-titel">
          <h2 id="troeven-titel">Troeven Van Deze Woning</h2>
          <ul className="troeven-lijst">
            {woning.kenmerken.map((kenmerk) => (
              <li key={kenmerk}>{kenmerk}</li>
            ))}
          </ul>
        </section>

        <section className="sectie" aria-labelledby="galerij-titel">
          <div className="sectie-kop">
            <h2 id="galerij-titel">Fotogalerij</h2>
            <p>
              Plaatshouders zijn actief. Vervang deze URL&apos;s door je eigen
              foto&apos;s (bijvoorbeeld in de map <strong>public/images</strong>
              ).
            </p>
          </div>
          <div className="galerij-grid">
            {galerij.map((foto) => (
              <figure className="galerij-item" key={foto.src}>
                <img src={foto.src} alt={foto.alt} loading="lazy" />
                <figcaption>{foto.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-titel"
        >
          <h2 id="contact-titel">Interesse?</h2>
          <p>
            Contacteer <strong>{woning.contactNaam}</strong> via{" "}
            <a href={`tel:${woning.contactTelefoon}`}>
              {woning.contactTelefoon}
            </a>{" "}
            of{" "}
            <a href={`mailto:${woning.contactEmail}`}>{woning.contactEmail}</a>.
          </p>
          <p>
            Adres: <strong>{woning.titel}</strong>
          </p>
          <a
            className="secundaire-link"
            href={woning.adresKaartLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Bekijk Op Kaart
          </a>
        </section>
      </main>
    </div>
  );
}
