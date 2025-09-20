// pages/test.js (or any client component)
import { useEffect, useState } from "react";
import { settings } from '../initialConditions/conus';

export default function Test() {
  const [rows, setRows] = useState([]);

  // your inputs
  // const data = ["hist.1981_2004", "rcp45.2076_2099", "rcp85.2076_2099", "foobar"];
  const data = ["hist.1981_2004", "rcp45.2076_2099", "rcp85.2076_2099"];
  const bucket = "https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/map/";
  const bucket_ndp = bucket;// + "maca/mri_cgcm3/"; // ensure trailing slash

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

  // load exactly once when component opens
  // useEffect(() => {
  //   (async () => {
  //     const checks = await Promise.all(
  //       data.map(async (p, i) => {
  //         const url = bucket_ndp + "/" + String(p);
  //         const r = await headOrGetOK(url);
  //         return { index: i, path: p, url, ...r };
  //       })
  //     );
  //     setRows(checks);
  //   })();
  // }, []); // <-- empty deps: run once

useEffect(() => {
  const trimSlashes = (s) => String(s).replace(/^\/+|\/+$/g, "");

  // Build all (model, method, data) combinations
  const combos = [];
  for (const [method, models] of Object.entries(settings.model || {})) {
    for (const [modelKey, modelLabel] of Object.entries(models || {})) {
      for (const p of data) {
        const url = [
          bucket_ndp,      // base
          method,          // <method>
          modelKey,        // <model>
          p,               // <data>
        ].map(trimSlashes).join("/");

        const entry = {
          model: modelKey,
          method,
          // label: modelLabel,
          path: p,
          url,
        }

        // console.log("e =", entry);
        combos.push(entry);
      }
    }
  }

  (async () => {
    const checks = await Promise.all(
      combos.map(async (c, i) => {
        const r = await headOrGetOK(c.url); // your HEAD/GET probe
        return { index: i, ...c, ...r };
      })
    );
    setRows(checks);
  })();
}, []);



  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", padding: 24 }}>
      <h1>URL Status</h1>
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
