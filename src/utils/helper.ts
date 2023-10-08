import { FormField, FormFields } from "@/types/global";

export const getFromLocalStorage = (name: string) => {
  if (ssrHandler()) {
    return JSON.parse(localStorage.getItem(name) as string);
  }
  return null;
};

export const setToLocalStorage = (name: string, value: any) => {
  if (ssrHandler()) {
    return localStorage.setItem(name, JSON.stringify(value));
  }
  return null;
};

export const ssrHandler = () => {
  return typeof window !== "undefined";
};

export function ColorLuminance(hex, lum) {
  //! hex — a hex color value such as “#abc” or “#123456” (the hash is optional)
  //! lum — the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;
  // convert to decimal and change luminosity
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

export const formFieldsGenerator = (fields: FormField[]) => {
  const formFields: FormFields = [];
  for (let item of fields) {
    formFields.push({
      name: item.name,
      id: `${item?.name}-field`,
      label: item.label,
      type: item?.type ? item?.type : "text",
      fieldType: item?.fieldType ? item?.fieldType : "textField",
      selectOptions: item?.selectOptions,
    });
  }
  return formFields;
};

export const handleShowItemBasedOnRoute = (
  pathname: string,
  pathnames: string[],
  showInThisRoute: boolean
) => {
  if (showInThisRoute) {
    return pathnames.includes(pathname);
  } else {
    return !pathnames.includes(pathname);
  }
};
