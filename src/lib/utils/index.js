export function getProvinceId(data, province_name) {
  const provinceObject = data.find(
    (item) => item.PROVINCE === decodeURIComponent(province_name)
  );
  return provinceObject ? provinceObject.PROVINCE_ID : null;
}
