// pages/estcp-data/index.js
export default function EstcpDataIndex() {
  const base = "https://hydro.rap.ucar.edu/hydro-climate-eval/estcp-data";

  const pages = [
    { slug: "grf-boxplot", label: "GRF boxplot" },
    { slug: "olm-boxplot", label: "OLM boxplot" },
    { slug: "sea-boxplot", label: "SEA boxplot" },
    { slug: "tcm-boxplot", label: "TCM boxplot" },
    { slug: "tiw-boxplot", label: "TIW boxplot" },
  ];

  return (
      <div
    style={{
      fontFamily: "system-ui, sans-serif",
      minHeight: "100vh",
      padding: 28,
      background: "#f7fafc",
      color: "#0f172a",
    }}
      >
      <div
    style={{
      maxWidth: 760,
      margin: "0 auto",
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
    }}
      >
      <h1 style={{ margin: "0 0 10px 0", fontSize: 22, fontWeight: 700 }}>
      ESTCP data plots
    </h1>

      <p style={{ margin: "0 0 18px 0", color: "#475569" }}>
      Links to Plotly boxplots or <a
    href="https://hydro.rap.ucar.edu/hydro-climate-eval/estcp-data/all-boxplots"
    style={{ color: "#64748b", textDecoration: "underline" }}
      >
      view all at the same time
    </a>.

    </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
      {pages.map((p) => (
          <li key={p.slug}>
          <a
        href={`${base}/${p.slug}`}
        style={{
          display: "block",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          textDecoration: "none",
          color: "#0f172a",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f1f5f9";
          e.currentTarget.style.borderColor = "#cbd5e1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }}
          >
          <span style={{ fontWeight: 600 }}>{p.label}</span>
          <span style={{ marginLeft: 10, color: "#64748b", fontSize: 13 }}>
          </span>
          </a>
          </li>
      ))}
    </ul>

      <div style={{ marginTop: 16, fontSize: 12, color: "#64748b" }}>
      <a
    href="https://hydro.rap.ucar.edu/hydro-climate-eval/estcp"
    style={{ color: "#64748b", textDecoration: "underline" }}
      >
      hydro.rap.ucar.edu/hydro-climate-eval/estcp
    </a>
      </div>
      </div>
    </div>
  );
}
