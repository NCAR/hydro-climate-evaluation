export default function WashingtonLinks() {
  const links = [
    {
      href: "https://hydro.rap.ucar.edu/hydro-climate-eval/estcp-data/fig2",
      linkName: "Fig. 2",
      description: "Daily minimum temperature maps",
    },
    {
      href: "https://hydro.rap.ucar.edu/hydro-climate-eval/estcp-data/fig3",
      linkName: "Fig. 3",
      description: "Ensemble mean daily minimum temperature maps",
    },
    {
      href: "https://hydro.rap.ucar.edu/hydro-climate-eval/estcp-data/fig4",
      linkName: "Fig. 4",
      description: "Annual frost days boxplots",
    },
    {
      href: "https://hydro.rap.ucar.edu/hydro-climate-eval/estcp-data/fig6",
      linkName: "Fig. 6",
      description: "Annual Frost Days at TCM, OLM, SEA stations",
    },
  ];

  return (
      <div style={{ padding: "8px 0", color: "#111" }}>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
      {links.map((link) => (
          <li key={link.href} style={{ marginBottom: 8 }}>
          <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#0645ad", fontWeight: 600, marginRight: 6 }}
          >
          {link.linkName}
        </a>
          : {link.description}
        </li>
      ))}
    </ul>
      </div>
  );
}
