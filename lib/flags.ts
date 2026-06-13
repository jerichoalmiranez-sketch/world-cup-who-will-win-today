export function getFlagUrl(country: string) {
  const map: Record<string, string> = {
    Brazil: "br",
    Morocco: "ma",
    Switzerland: "ch",
    Qatar: "qa",
    Haiti: "ht",
    Scotland: "gb-sct",
  };

  const code = map[country];

  if (!code) return "";

  return `https://flagcdn.com/w320/${code}.png`;
}
