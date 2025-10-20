import ButtonMarker from '../components/ButtonMarker';

export default function MarkSites(){

  const sites = Object.freeze({
    fortLiberty: { lon: -78.9991667, lat: 35.1391667 },
    jblm:  { lon: -122.564444, lat: 47.105833 },
    jbphh: { lon: -157.943889, lat: 21.349167 },
    fort_wainwright: { lon: -147.642778, lat: 64.827778},
  });

  const SiteBox = ({site}) => {
    const lng = sites[site].lon;

    return( null);
  };

  return(
    <>
    <ButtonMarker
      lng={sites.fortLiberty.lon}
      lat={sites.fortLiberty.lat}
      site={'Fort Liberty, NC'}
    />

    <ButtonMarker
      lng={sites.jbphh.lon}
      lat={sites.jbphh.lat}
      site={'Joint Base Pearl Harbor-Hickham, HI'}
    />

    <ButtonMarker
      lng={sites.jblm.lon}
      lat={sites.jblm.lat}
      site={'Joint Base Lewis–McChord, WA'}
    />

    <ButtonMarker
      lng={sites.fort_wainwright.lon}
      lat={sites.fort_wainwright.lat}
      site={'Fort Wainwright, AK'}
    />
    </>
  );
}
