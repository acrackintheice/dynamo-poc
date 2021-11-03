const cpf = {
  countryCode: "BR",
  documentMask: "BR_MASK",
  documentName: "CPF",
};
const rg = {
  countryCode: "BR",
  documentMask: "BR_MASK",
  documentName: "RG",
};

const brazil = {
  countryName: "BRAZIL",
  countryCode: "BR",
  currencySymbol: "R$",
  timeZone: "BRT",
  language: "PT_BR",
  currency: "Real",
  countryId: 1,
  documents: [rg, cpf],
};

const dni_pe = {
  countryCode: "PE",
  documentMask: "PE_MASK",
  documentName: "DNI",
};

const peru = {
  countryName: "PERU",
  countryCode: "PE",
  currencySymbol: "P$",
  timeZone: "PRT",
  language: "ES_PE",
  currency: "Peso",
  countryId: 18,
  documents: [dni_pe],
}

const dni_ar = {
  countryCode: "AR",
  documentMask: "AR_MASK",
  documentName: "DNI",
};

const argentina = {
  countryName: "ARGENTINA",
  countryCode: "AR",
  currencySymbol: "P$",
  timeZone: "ART",
  language: "ES_AR",
  currency: "Peso",
  countryId: 2,
  documents: [dni_ar],
}

export const countries_seed = {
  'BR': brazil,
  'PE': peru,
  'AR': argentina,
}