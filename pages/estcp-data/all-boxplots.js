import { TcmBoxPlot } from "./tcm-boxplot";
import { GrfBoxPlot } from "./grf-boxplot";
import { OlmBoxPlot } from "./olm-boxplot";
import { SeaBoxPlot } from "./sea-boxplot";
import { TiwBoxPlot } from "./tiw-boxplot";

export default function Foo() {
  return (
    <div style={{ padding: 24, background: "#f7fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 40 }}>
        <TcmBoxPlot />
        <GrfBoxPlot />
        <OlmBoxPlot />
        <SeaBoxPlot />
        <TiwBoxPlot />
      </div>
    </div>
  );
}
