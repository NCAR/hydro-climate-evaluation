// Scale Values
const precipDif = 1.0;
const tempDif = 0.1;
export const Scale_Values = Object.freeze({
  // diference colormap
  dif: 0.11,
  dift: tempDif,
  difp: precipDif,

  // temperature variables
  dif_tavg: tempDif,
  dif_n34t: tempDif,
  dif_ttrend: 0.1,
  dif_t90: tempDif,
  dif_t99: tempDif,
  dif_djf_t: tempDif,
  dif_mam_t: tempDif,
  dif_jja_t: tempDif,
  dif_son_t: tempDif,

  // precip variables
  dif_prec: precipDif,
  dif_n34pr: precipDif,
  dif_ptrend: 0.1,
  dif_pr90: 0.1,
  dif_pr99: 0.1,
  dif_djf_p: precipDif,
  dif_mam_p: precipDif,
  dif_jja_p: precipDif,
  dif_son_p: precipDif,
});
