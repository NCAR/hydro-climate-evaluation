// import ButtonMarker from '../components/ButtonMarker.test';
import ButtonMarker from '../components/ButtonMarker.station';
import { settings } from "../initialConditions/estcp-test";

import tasminPoints from "../data_json/tasminAvg_seas_points.json";

export default function MarkSites(){
  const jsonBySite = {
      fortLiberty: [],
      jblm: tasminPoints,
      jbphh: [],
      fort_wainwright: [],
      // fortLiberty: tasminPoints,
      // jblm: tasminPoints,
      // jbphh: tasminPoints,
      // fort_wainwright: tasminPoints,
  }


  const sites = Object.entries(settings.siteData.sites).map(([key, site]) => (
    <ButtonMarker
      key={key}
      lng={site.lon}
      lat={site.lat}
      json_data={jsonBySite[key]}
      site={site.name ?? key}
    />
  ));

  return(
    <>
      {sites}
    </>
  );
}
