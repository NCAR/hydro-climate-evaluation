// pages/reports.js
export default function Reports() {
  return (
      <div
      style={{
              fontFamily: "system-ui, Arial, sans-serif",
        padding: 24,
        background: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: 8,
          color: "#111",
        }}
      >
        Dataset Reports
      </h1>

      {/* Subtext */}
      <p
        style={{
          textAlign: "center",
          marginBottom: 32,
          fontSize: 16,
          color: "#444",
        }}
      >
        Click the buttons for status reports of the datasets for the website{" "}
        <a
          href="https://hydro.rap.ucar.edu/hydro-climate-eval/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          https://hydro.rap.ucar.edu/hydro-climate-eval/
        </a>
      </p>

      {/* Button container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column", // stack vertically
          alignItems: "center",
          gap: 16,
          maxWidth: 400,
          margin: "0 auto",
          padding: "20px 24px",
          borderRadius: 12,
          background: "#111",
          border: "1px solid #333",
        }}
      >
        {/* Maps Button */}
        <a
          href="https://hydro.rap.ucar.edu/hydro-climate-eval/maps"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "12px 24px",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            textDecoration: "none",
            background: "#22c55e",
            color: "#fff",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#16a34a")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#22c55e")}
        >
          Maps
        </a>

        {/* Metrics Button */}
        <a
          href="https://hydro.rap.ucar.edu/hydro-climate-eval/metrics"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "12px 24px",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            textDecoration: "none",
            background: "#3b82f6",
            color: "#fff",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#3b82f6")}
        >
          Metrics
        </a>
      </div>
    </div>
  );
}
