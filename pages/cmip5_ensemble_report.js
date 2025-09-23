// pages/test.js (or any client component)
import { useEffect, useState } from "react";
import { settings } from '../initialConditions/global';

export default function Test() {
  const [rows, setRows] = useState([]);

  // your inputs
  const time = ["hist.1850_2005"];
  const bucket = "https://hydro.rap.ucar.edu/hydro-climate-eval/data/global/";
  const base = bucket+"map/";// + "maca/mri_cgcm3/" ensure trailing slash

  // helper: fetch with timeout
  async function fetchWithTimeout(url, ms = 8000, init = {}) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), ms);
    try {
      const res = await fetch(url, { ...init, signal: ac.signal, redirect: "follow" });
      return res;
    } finally {
      clearTimeout(t);
    }
  }

  // try HEAD, fall back to GET (some servers disallow HEAD)
  async function headOrGetOK(url) {
    try {
      const h = await fetchWithTimeout(url, 8000, { method: "HEAD" });
      if (h.ok) return { ok: true, status: h.status, method: "HEAD" };
      const g = await fetchWithTimeout(url, 8000, { method: "GET" });
      return { ok: g.ok, status: g.status, method: "GET" };
    } catch (e) {
      // CORS or network error ends up here
      return { ok: false, status: 0, method: "ERR" };
    }
  }


useEffect(() => {
  const trimSlashes = (s) => String(s).replace(/^\/+|\/+$/g, "");

  // Build all (model, method, data) combinations
  const combos = [];

  // for (const [cmipKey, models] of Object.entries(settings.ensemble)) {
  const cmipKey = 'cmip5';
  const models = settings.ensemble.cmip5;
  console.log("MODELS =", models);
    // iterate models inside each cmip group
    for (const [model, ensembles] of Object.entries(models)) {
      // iterate ensemble members for that model
      for (const ens of ensembles) {
        // iterate times
        for (const t of time) {
          // const url = [base, method, model, ens, p]
          //   .map(trimSlashes)
          //   .join("/");

          const url = [
              base,   // base
              cmipKey,         // <method>
              model,           // <model>
              t,               // <time>
              ens,             // <ensemble>
          ].map(trimSlashes).join("/")
          const entry = {
              url
          }
          combos.push(entry);
        }
      }
    }
  // }


// helper: process items in batches with limited concurrency
async function processInBatches(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;

  async function worker() {
      while (i < items.length) {
            const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }

  // create `limit` workers
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

// usage
(async () => {
  const checks = await processInBatches(combos, 5, async (c, i) => {
    const r = await headOrGetOK(c.url);
    return { index: i, ...c, ...r };
  });
  setRows(checks);
})();

}, []);


  const okCount = rows.filter(r => r.ok).length;
  const total = rows.length;
  const pct = total ? Math.round((okCount / total) * 100) : 0;


  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", padding: 24 }}>

      {/* --- DASHBOARD --- */}
      <div
        style={{
                  display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
          padding: "10px 14px",
          borderRadius: 12,
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
          maxWidth: 1000,      // match table
        }}
      >
        <strong style={{ fontSize: 18 }}>Datasets Up:</strong>
        <span style={{ fontSize: 18 }}>{okCount} / {total}</span>
        <span
          style={{
            fontSize: 12,
            padding: "2px 8px",
            borderRadius: 999,
            background: okCount === total && total > 0 ? "#0f5132" : "#5a1a1a",
            color: "#fff",
            marginLeft: 6,
          }}
        >
          {pct}%
        </span>

        {/* simple progress bar */}
        <div style={{ flex: 1, height: 8, background: "#333", borderRadius: 999, marginLeft: 12 }}>
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "#22c55e",
              borderRadius: 999,
              transition: "width 200ms linear",
            }}
          />
        </div>
      </div>


      <h1>Metrics URL Status Report</h1>
      <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 1000 }}>
        <thead>
          <tr>
            <th style={{...th, color: "#000"}} >#</th>
            <th style={{...th, color: "#000"}}>Full URL</th>
            <th style={{...th, color: "#000"}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.url}>
              <td style={td}>{c.index + 1}</td>
              <td style={td}>
                <a href={c.url} target="_blank" rel="noreferrer" style={{ color: '#fff' }} >
                  {c.url}
                </a>
              </td>
              <td style={td}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: c.ok ? "#e6ffed" : "#ffebe9",
                    color: c.ok ? "#096a2e" : "#a40e26",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "currentColor",
                    }}
                  />
                  {c.ok ? "Exists" : "Missing"}
                </span>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td style={td} colSpan={3}>
                Checking…
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = { border: "1px solid #ddd", padding: 10, background: "#f7f7f7", textAlign: "left" };
const td = { border: "1px solid #ddd", padding: 10, textAlign: "left" };
