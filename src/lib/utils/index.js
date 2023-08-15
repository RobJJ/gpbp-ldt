// export function getProvinceId(data, province_name) {
//   const provinceObject = data.find(
//     (item) => item.PROVINCE === decodeURIComponent(province_name)
//   );
//   return provinceObject ? provinceObject.PROVINCE_ID : null;
// }

import { cache } from "react";

// ** check : can we cache this type of function? does it mean if its called with the same argurments it just returns what it has in cache?... should I rather use memo?

// data = province data
export const getProvinceId = cache((data, province_name) => {
  const provinceObject = data.find(
    (item) => item.PROVINCE === decodeURIComponent(province_name)
  );
  return provinceObject ? provinceObject.PROVINCE_ID : null;
});

// data = district data
export const getDistrictId = cache((data, district_name) => {
  const districtObject = data.find(
    (item) => item.DISTRICT === decodeURIComponent(district_name)
  );
  return districtObject ? districtObject.DISTRICT_ID : null;
});

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
