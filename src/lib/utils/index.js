import { cache } from "react";

// ??
export const getProvinceId = cache((data, province_name) => {
  const provinceObject = data.find(
    (item) => item.PROVINCE === decodeURIComponent(province_name)
  );
  return provinceObject ? provinceObject.PROVINCE_ID : null;
});
//
// ??
export const getDistrictId = cache((data, district_name) => {
  const districtObject = data.find(
    (feature) => feature.DISTRICT === decodeURIComponent(district_name)
  );
  return districtObject ? districtObject.DISTRICT_ID : null;
});

// USED
export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
