import React, { useEffect, useState } from "react";

const COUNTER_NAMESPACE = "house-sale-lendeleedsestraat";
const UNIQUE_VISITOR_TOTAL_KEY = "unique-visitors-total";

const woning = {
  titel: "Lendeleedsestraat 58, 8870 Izegem",
  prijs: "Aanvangsprijs: € 310 000",
  type: "Halfopen bebouwing",
  bouwjaar: "1962",
  perceel: "462 m²",
  woonoppervlakte: "200 m²",
  kamers: "2",
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

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export default function App() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadUniqueVisitors() {
      try {
        const ipData = await fetchJson("https://api64.ipify.org?format=json");
        const rawIp = ipData?.ip;

        if (!rawIp) {
          throw new Error("No IP received");
        }

        const safeIpKey = `ip-${rawIp.replaceAll(":", "_").replaceAll(".", "_")}`;
        const ipHitUrl = `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${safeIpKey}`;
        const ipCounter = await fetchJson(ipHitUrl);

        let totalCounter;
        if (ipCounter.value === 1) {
          const totalHitUrl = `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${UNIQUE_VISITOR_TOTAL_KEY}`;
          totalCounter = await fetchJson(totalHitUrl);
        } else {
          const totalGetUrl = `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${UNIQUE_VISITOR_TOTAL_KEY}`;
          totalCounter = await fetchJson(totalGetUrl);
        }

        if (!cancelled) {
          setVisitorCount(totalCounter.value ?? 0);
        }
      } catch {
        if (!cancelled) {
          setVisitorCount(null);
        }
      }
    }

    loadUniqueVisitors();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: woning.titel,
      text: `Bekijk deze woning te koop: ${woning.titel}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Gedeeld");
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareStatus("Link gekopieerd");
    } catch {
      setShareStatus("Delen niet gelukt");
    }
  };

  return (
    <div className="pagina">
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-top-row" aria-live="polite">
            <p className="badge">Woning Te Koop</p>
            <div className="top-tools">
              <div className="counter-chip">
                <p className="bezoeker-teller">
                  Deze woning werd al{" "}
                  {visitorCount === null ? "..." : visitorCount} keer bekeken
                </p>
              </div>
              <button className="deel-knop" type="button" onClick={handleShare}>
                <svg
                  className="deel-icoon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M18 8a3 3 0 1 0-2.82-4H15a3 3 0 0 0 .18 1.02l-7.43 4.01a3 3 0 1 0 0 5.94l7.43 4.01A3 3 0 1 0 16 17.99l-7.43-4.01a3.02 3.02 0 0 0 0-3.96L16 6.01A3 3 0 0 0 18 8Z"
                    fill="currentColor"
                  />
                </svg>
                Deel
              </button>
              {shareStatus ? (
                <span className="deel-status">{shareStatus}</span>
              ) : null}
            </div>
          </div>
          <h1>{woning.titel}</h1>
          <p className="prijs">{woning.prijs}</p>
          <p className="intro">{woning.beschrijving}</p>
          <a className="cta-knop" href="#contact">
            Plan een bezoek op de kijkdag 12/07/2026
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
            <a href={`mailto:${woning.contactEmail}`}>{woning.contactEmail} </a>
            om een slot te boeken op 11/07/2026
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
            <svg
              className="kaart-icoon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M12 2a7 7 0 0 0-7 7c0 4.59 5.21 10.98 6.08 12a1.2 1.2 0 0 0 1.84 0C13.79 19.98 19 13.59 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
                fill="currentColor"
              />
            </svg>
            Bekijk Op Kaart
          </a>
        </section>
      </main>
    </div>
  );
}
