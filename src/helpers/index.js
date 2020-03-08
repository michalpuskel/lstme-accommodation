export const parseSearch = text =>
  text
    .replace(/\\/g, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const translateError = code => {
  switch (code) {
    case "auth/wrong-password":
      return "Zadali ste nesprávne heslo";
    case "auth/user-not-found":
      return "Zadali ste nesprávny email, užívateľ neexistuje";
    case "auth/too-many-req uests":
      return "Systém je preťažený, chvíľu počkajte a poskúste sa akciu zopakovať";
    default:
      return "Neznáma chyba, kontaktuje administrátora";
  }
};
