// export function getProvinceId(data, province_name) {
//   const provinceObject = data.find(
//     (item) => item.PROVINCE === decodeURIComponent(province_name)
//   );
//   return provinceObject ? provinceObject.PROVINCE_ID : null;
// }

import { cache } from "react";

// ** check : can we cache this type of function? does it mean if its called with the same argurments it just returns what it has in cache?... should I rather use memo?

export const getProvinceId = cache((data, province_name) => {
  const provinceObject = data.find(
    (item) => item.PROVINCE === decodeURIComponent(province_name)
  );
  return provinceObject ? provinceObject.PROVINCE_ID : null;
});
