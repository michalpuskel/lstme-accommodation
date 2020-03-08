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
    case "auth/email-already-in-use":
      return "Užívateľ so zadaným emailom už je zaregistrovaný v systéme. Na tento email už nie je možné vytvoriť novú registráciu.";
    case "auth/weak-password":
      return "Slabé heslo. Vaše heslo musí obsahovať aspoň 6 znakov";
    default:
      return "Neznáma chyba, kontaktuje administrátora";
  }
};
