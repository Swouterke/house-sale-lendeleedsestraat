import React, { useEffect, useState } from "react";

const woning = {
  titel: "Lendeleedsestraat 58, 8870 Izegem",
  prijs: "Aanvangsprijs: € 300 000",
  type: "Halfopen bebouwing",
  bouwjaar: "1962",
  perceel: "462 m²",
  woonoppervlakte: "155 m²",
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
richting centrum, scholen, rijksweg en autostrade, Ingelmunster, Lendelede, ... .
`.trim(),
  kenmerken: [
    "Zuidwest gerichte en makkelijk onderhoudbare tuin met groot terras",
    "Recent gerenoveerd en instapklaar",
    "Rustige ligging nabij scholen, winkels, centrum en autostrade",
    "Garage & oprit",
    "Apart toilet boven en beneden",
  ],
  contactNaam: "Wouter Vercruysse",
  contactTelefoon: "0497 28 32 79",
  contactEmail: "lendeleedsestraat58@proton.me",
  adresKaartLink:
    "https://www.google.com/maps/place/Lendeleedsestraat+58,+8870+Izegem/@50.9138966,3.2248422,584m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c337629a5bea61:0x20a9d607e9bb1285!8m2!3d50.9138966!4d3.2274171!16s%2Fg%2F11v3pzq6qm?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
};

const galerijBestanden = import.meta.glob(
  "/public/pics/*.{jpg,jpeg,png,webp,avif,gif}",
  {
    eager: true,
    import: "default",
  },
);

const galerij = Object.entries(galerijBestanden)
  .map(([pad, src]) => {
    const bestandsNaam = pad.split("/").pop() ?? "Woningfoto";
    const naamZonderExtensie = bestandsNaam.replace(/\.[^.]+$/, "");
    const netteNaam = naamZonderExtensie
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      src,
      alt: netteNaam ? `Foto ${netteNaam}` : "Woningfoto",
    };
  })
  .sort((a, b) => a.src.localeCompare(b.src));

const documentBestanden = import.meta.glob("/public/files/*", {
  eager: true,
  import: "default",
});

const imageBestandRegex = /\.(jpg|jpeg|png|webp|avif|gif|bmp|svg)$/i;
const pdfBestandRegex = /\.pdf$/i;

const documenten = Object.entries(documentBestanden)
  .map(([pad, src]) => {
    const naam = decodeURIComponent(pad.split("/").pop() ?? "Bestand");
    const isAfbeelding = imageBestandRegex.test(naam);
    const isPdf = pdfBestandRegex.test(naam);

    return {
      naam,
      url: src,
      isAfbeelding,
      viewerUrl: isPdf ? `${src}#zoom=page-width` : src,
    };
  })
  .sort((a, b) => a.naam.localeCompare(b.naam, "nl"));

function InfoCard({ label, waarde }) {
  return (
    <article className="info-card">
      <p className="info-label">{label}</p>
      <p className="info-waarde">{waarde}</p>
    </article>
  );
}

export default function App() {
  const [shareStatus, setShareStatus] = useState("");
  const [activeFotoIndex, setActiveFotoIndex] = useState(null);
  const [jumpMenuOpen, setJumpMenuOpen] = useState(false);
  const [isPortraitInLightbox, setIsPortraitInLightbox] = useState(false);
  const [documentenPopupOpen, setDocumentenPopupOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);

  useEffect(() => {
    if (activeFotoIndex === null) {
      return undefined;
    }

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setActiveFotoIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveFotoIndex((huidigeIndex) =>
          huidigeIndex === null ? 0 : (huidigeIndex + 1) % galerij.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveFotoIndex((huidigeIndex) =>
          huidigeIndex === null
            ? 0
            : (huidigeIndex - 1 + galerij.length) % galerij.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeFotoIndex]);

  useEffect(() => {
    if (!documentenPopupOpen && activeDocument === null) {
      return undefined;
    }

    const handleKeydown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (activeDocument !== null) {
        setActiveDocument(null);
        return;
      }

      setDocumentenPopupOpen(false);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [documentenPopupOpen, activeDocument]);

  useEffect(() => {
    if (
      activeFotoIndex === null &&
      !documentenPopupOpen &&
      activeDocument === null
    ) {
      return undefined;
    }

    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = vorigeOverflow;
    };
  }, [activeFotoIndex, documentenPopupOpen, activeDocument]);

  useEffect(() => {
    if (!jumpMenuOpen) {
      return undefined;
    }

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setJumpMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [jumpMenuOpen]);

  const openFotoPopup = (index) => {
    setIsPortraitInLightbox(false);
    setActiveFotoIndex(index);
  };

  const closeFotoPopup = () => {
    setIsPortraitInLightbox(false);
    setActiveFotoIndex(null);
  };

  const toonVorigeFoto = () => {
    setIsPortraitInLightbox(false);
    setActiveFotoIndex((huidigeIndex) =>
      huidigeIndex === null
        ? 0
        : (huidigeIndex - 1 + galerij.length) % galerij.length,
    );
  };

  const toonVolgendeFoto = () => {
    setIsPortraitInLightbox(false);
    setActiveFotoIndex((huidigeIndex) =>
      huidigeIndex === null ? 0 : (huidigeIndex + 1) % galerij.length,
    );
  };

  const handleLightboxImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setIsPortraitInLightbox(naturalHeight > naturalWidth);
  };

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

  const openDocumentenPopup = () => {
    setDocumentenPopupOpen(true);
  };

  const closeDocumentenPopup = () => {
    setDocumentenPopupOpen(false);
  };

  const openDocumentViewer = (documentItem) => {
    setActiveDocument(documentItem);
    setDocumentenPopupOpen(false);
  };

  const closeDocumentViewer = () => {
    setActiveDocument(null);
  };

  return (
    <div className="pagina">
      <div className="jump-menu-wrapper">
        <button
          className="jump-toggle"
          type="button"
          aria-haspopup="true"
          aria-expanded={jumpMenuOpen}
          onClick={() => setJumpMenuOpen((huidig) => !huidig)}
        >
          <svg
            className="jump-icoon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm2.8 7.2-1.8 5.1a1 1 0 0 1-.62.62l-5.1 1.8a.4.4 0 0 1-.5-.5l1.8-5.1a1 1 0 0 1 .62-.62l5.1-1.8a.4.4 0 0 1 .5.5Z"
              fill="currentColor"
            />
          </svg>
          Spring naar ...
        </button>

        {jumpMenuOpen ? (
          <>
            <button
              className="jump-backdrop"
              type="button"
              aria-label="Sluit spring-menu"
              onClick={() => setJumpMenuOpen(false)}
            />
            <nav className="jump-menu" aria-label="Spring naar sectie">
              <a href="#details" onClick={() => setJumpMenuOpen(false)}>
                Gegevens
              </a>
              <a href="#troeven" onClick={() => setJumpMenuOpen(false)}>
                Troeven
              </a>
              <a href="#galerij" onClick={() => setJumpMenuOpen(false)}>
                Fotogalerij
              </a>
              <a href="#bod" onClick={() => setJumpMenuOpen(false)}>
                Bieding
              </a>
              <a href="#contact" onClick={() => setJumpMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </>
        ) : null}
      </div>

      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-top-row" aria-live="polite">
            <p className="badge">Woning Te Koop</p>
            <div className="top-tools">
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
          <div className="hero-cta-groep">
            <a className="cta-knop" href="#contact">
              Plan een bezoek op de kijkdag 12/07/2026
            </a>
            <button
              className="cta-knop cta-knop-secundair"
              type="button"
              onClick={openDocumentenPopup}
            >
              <svg
                className="document-icoon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 1.5L17.5 7H14ZM9 11h6v1.5H9Zm0 3.5h6V16H9Z"
                  fill="currentColor"
                />
              </svg>
              Bekijk documenten
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section
          className="sectie"
          id="details"
          aria-labelledby="details-titel"
        >
          <h2 id="details-titel">Belangrijkste Gegevens</h2>
          <div className="info-grid">
            <InfoCard label="Type" waarde={woning.type} />
            <InfoCard label="Bouwjaar" waarde={woning.bouwjaar} />
            <InfoCard label="Perceel" waarde={woning.perceel} />
            <InfoCard label="Woonoppervlakte" waarde={woning.woonoppervlakte} />
            <InfoCard label="Kamers" waarde={woning.kamers} />
          </div>
        </section>

        <section
          className="sectie"
          id="troeven"
          aria-labelledby="troeven-titel"
        >
          <h2 id="troeven-titel">Troeven Van Deze Woning</h2>
          <ul className="troeven-lijst">
            {woning.kenmerken.map((kenmerk) => (
              <li key={kenmerk}>{kenmerk}</li>
            ))}
          </ul>
        </section>

        <section
          className="sectie"
          id="galerij"
          aria-labelledby="galerij-titel"
        >
          <div className="sectie-kop">
            <h2 id="galerij-titel">Fotogalerij</h2>
          </div>
          <div className="galerij-grid">
            {galerij.map((foto, index) => (
              <button
                className="galerij-knop"
                type="button"
                key={foto.src}
                onClick={() => openFotoPopup(index)}
                aria-label={`Open foto: ${foto.alt}`}
              >
                <figure className="galerij-item">
                  <img src={foto.src} alt={foto.alt} loading="lazy" />
                  <span className="foto-teller">
                    {index + 1}/{galerij.length}
                  </span>
                </figure>
              </button>
            ))}
          </div>
        </section>

        <section className="sectie" id="bod" aria-labelledby="bod-titel">
          <h2 id="bod-titel">Bod</h2>
          <p>
            Om iedereen op dezelfde manier de kans te geven, werkt de verkoop
            met een eenmalige biedingsronde. Iedere geïnteresseerde kandidaat
            kan tot twee dagen na de kijkdag(en) precies één keer een finaal bod
            indienen.
          </p>
          <p>
            <strong>Kijkdag(en):</strong> zondag 12 juli
            <br />
            <strong>Uiterste biedmoment:</strong> dinsdag 14 juli om 12u00
          </p>
          <p></p>
          <p>
            Na de deadline beoordeelt de verkoper de ontvangen biedingen en kan
            het hoogste bod worden aanvaard, zonder bijkomende opbodfase.
          </p>
          <p>
            Elk bod moet een vast bedrag vermelden. Voorstellen met een formule
            zoals "X euro boven een ander bod" worden niet in behandeling
            genomen.
          </p>
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

      {documentenPopupOpen ? (
        <div
          className="documenten-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Documenten"
          onClick={closeDocumentenPopup}
        >
          <div
            className="documenten-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="lightbox-sluit"
              type="button"
              onClick={closeDocumentenPopup}
              aria-label="Sluit documentenpopup"
            >
              ×
            </button>
            <h3>Beschikbare bestanden</h3>
            {documenten.length > 0 ? (
              <ul className="document-lijst">
                {documenten.map((documentItem) => (
                  <li key={documentItem.url}>
                    <button
                      className="document-link"
                      type="button"
                      onClick={() => openDocumentViewer(documentItem)}
                    >
                      {documentItem.naam}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="document-leeg">
                Geen bestanden gevonden in de map public/files.
              </p>
            )}
          </div>
        </div>
      ) : null}

      {activeDocument !== null ? (
        <div
          className="document-viewer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Document bekijken: ${activeDocument.naam}`}
          onClick={closeDocumentViewer}
        >
          <div
            className="document-viewer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="document-viewer-kop">
              <p>{activeDocument.naam}</p>
              <button
                className="lightbox-sluit"
                type="button"
                onClick={closeDocumentViewer}
                aria-label="Sluit documentviewer"
              >
                ×
              </button>
            </div>
            {activeDocument.isAfbeelding ? (
              <div className="document-media-container">
                <img
                  className="document-afbeelding"
                  src={activeDocument.url}
                  alt={activeDocument.naam}
                />
              </div>
            ) : (
              <iframe
                className="document-iframe"
                src={activeDocument.viewerUrl}
                title={activeDocument.naam}
              />
            )}
          </div>
        </div>
      ) : null}

      {activeFotoIndex !== null ? (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Fotogalerij popup"
          onClick={closeFotoPopup}
        >
          <div
            className={`lightbox-content ${isPortraitInLightbox ? "lightbox-content-portrait" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-sluit"
              type="button"
              onClick={closeFotoPopup}
              aria-label="Sluit fotogalerij"
            >
              ×
            </button>

            <button
              className="lightbox-nav"
              type="button"
              onClick={toonVorigeFoto}
              aria-label="Vorige foto"
            >
              ‹
            </button>

            <figure className="lightbox-foto">
              <img
                src={galerij[activeFotoIndex].src}
                alt={galerij[activeFotoIndex].alt}
                onLoad={handleLightboxImageLoad}
              />
              <span className="foto-teller lightbox-teller">
                {activeFotoIndex + 1}/{galerij.length}
              </span>
            </figure>

            <button
              className="lightbox-nav"
              type="button"
              onClick={toonVolgendeFoto}
              aria-label="Volgende foto"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
