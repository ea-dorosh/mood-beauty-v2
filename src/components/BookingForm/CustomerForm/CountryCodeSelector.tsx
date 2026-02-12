import type { CountryData } from "@/types/booking";

const POPULAR_COUNTRIES: CountryData[] = [
  { code: `DE`, dialCode: `+49`, name: `Deutschland`, flag: `\uD83C\uDDE9\uD83C\uDDEA` },
  { code: `FR`, dialCode: `+33`, name: `Frankreich`, flag: `\uD83C\uDDEB\uD83C\uDDF7` },
  { code: `UA`, dialCode: `+380`, name: `Ukraine`, flag: `\uD83C\uDDFA\uD83C\uDDE6` },
  { code: `AT`, dialCode: `+43`, name: `\u00D6sterreich`, flag: `\uD83C\uDDE6\uD83C\uDDF9` },
  { code: `CH`, dialCode: `+41`, name: `Schweiz`, flag: `\uD83C\uDDE8\uD83C\uDDED` },
  { code: `IT`, dialCode: `+39`, name: `Italien`, flag: `\uD83C\uDDEE\uD83C\uDDF9` },
];

const OTHER_COUNTRIES: CountryData[] = [
  { code: `GB`, dialCode: `+44`, name: `Vereinigtes K\u00F6nigreich`, flag: `\uD83C\uDDEC\uD83C\uDDE7` },
  { code: `ES`, dialCode: `+34`, name: `Spanien`, flag: `\uD83C\uDDEA\uD83C\uDDF8` },
  { code: `NL`, dialCode: `+31`, name: `Niederlande`, flag: `\uD83C\uDDF3\uD83C\uDDF1` },
  { code: `BE`, dialCode: `+32`, name: `Belgien`, flag: `\uD83C\uDDE7\uD83C\uDDEA` },
  { code: `PL`, dialCode: `+48`, name: `Polen`, flag: `\uD83C\uDDF5\uD83C\uDDF1` },
  { code: `CZ`, dialCode: `+420`, name: `Tschechien`, flag: `\uD83C\uDDE8\uD83C\uDDFF` },
  { code: `RU`, dialCode: `+7`, name: `Russland`, flag: `\uD83C\uDDF7\uD83C\uDDFA` },
  { code: `TR`, dialCode: `+90`, name: `T\u00FCrkei`, flag: `\uD83C\uDDF9\uD83C\uDDF7` },
  { code: `US`, dialCode: `+1`, name: `USA`, flag: `\uD83C\uDDFA\uD83C\uDDF8` },
  { code: `CA`, dialCode: `+1`, name: `Kanada`, flag: `\uD83C\uDDE8\uD83C\uDDE6` },
  { code: `GR`, dialCode: `+30`, name: `Griechenland`, flag: `\uD83C\uDDEC\uD83C\uDDF7` },
  { code: `PT`, dialCode: `+351`, name: `Portugal`, flag: `\uD83C\uDDF5\uD83C\uDDF9` },
  { code: `SE`, dialCode: `+46`, name: `Schweden`, flag: `\uD83C\uDDF8\uD83C\uDDEA` },
  { code: `NO`, dialCode: `+47`, name: `Norwegen`, flag: `\uD83C\uDDF3\uD83C\uDDF4` },
  { code: `DK`, dialCode: `+45`, name: `D\u00E4nemark`, flag: `\uD83C\uDDE9\uD83C\uDDF0` },
  { code: `FI`, dialCode: `+358`, name: `Finnland`, flag: `\uD83C\uDDEB\uD83C\uDDEE` },
  { code: `RO`, dialCode: `+40`, name: `Rum\u00E4nien`, flag: `\uD83C\uDDF7\uD83C\uDDF4` },
  { code: `BG`, dialCode: `+359`, name: `Bulgarien`, flag: `\uD83C\uDDE7\uD83C\uDDEC` },
  { code: `HR`, dialCode: `+385`, name: `Kroatien`, flag: `\uD83C\uDDED\uD83C\uDDF7` },
  { code: `SI`, dialCode: `+386`, name: `Slowenien`, flag: `\uD83C\uDDF8\uD83C\uDDEE` },
  { code: `SK`, dialCode: `+421`, name: `Slowakei`, flag: `\uD83C\uDDF8\uD83C\uDDF0` },
  { code: `HU`, dialCode: `+36`, name: `Ungarn`, flag: `\uD83C\uDDED\uD83C\uDDFA` },
  { code: `LU`, dialCode: `+352`, name: `Luxemburg`, flag: `\uD83C\uDDF1\uD83C\uDDFA` },
  { code: `IE`, dialCode: `+353`, name: `Irland`, flag: `\uD83C\uDDEE\uD83C\uDDEA` },
  { code: `AL`, dialCode: `+355`, name: `Albanien`, flag: `\uD83C\uDDE6\uD83C\uDDF1` },
  { code: `BA`, dialCode: `+387`, name: `Bosnien und Herzegowina`, flag: `\uD83C\uDDE7\uD83C\uDDE6` },
  { code: `RS`, dialCode: `+381`, name: `Serbien`, flag: `\uD83C\uDDF7\uD83C\uDDF8` },
  { code: `ME`, dialCode: `+382`, name: `Montenegro`, flag: `\uD83C\uDDF2\uD83C\uDDEA` },
  { code: `MK`, dialCode: `+389`, name: `Nordmazedonien`, flag: `\uD83C\uDDF2\uD83C\uDDF0` },
  { code: `MD`, dialCode: `+373`, name: `Moldawien`, flag: `\uD83C\uDDF2\uD83C\uDDE9` },
  { code: `BY`, dialCode: `+375`, name: `Belarus`, flag: `\uD83C\uDDE7\uD83C\uDDFE` },
  { code: `LT`, dialCode: `+370`, name: `Litauen`, flag: `\uD83C\uDDF1\uD83C\uDDF9` },
  { code: `LV`, dialCode: `+371`, name: `Lettland`, flag: `\uD83C\uDDF1\uD83C\uDDFB` },
  { code: `EE`, dialCode: `+372`, name: `Estland`, flag: `\uD83C\uDDEA\uD83C\uDDEA` },
  { code: `IS`, dialCode: `+354`, name: `Island`, flag: `\uD83C\uDDEE\uD83C\uDDF8` },
];

const ALL_COUNTRIES = [...POPULAR_COUNTRIES, ...OTHER_COUNTRIES];

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export default function CountryCodeSelector({
  value,
  onChange,
  error,
}: CountryCodeSelectorProps) {
  const selectedCountry = ALL_COUNTRIES.find(country => country.dialCode === value);

  return (
    <div className="relative min-w-[100px] max-w-[120px]">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`
          input w-full appearance-none pr-8 cursor-pointer
          ${error ? `border-[var(--color-crimson)]` : ``}
        `}
      >
        <optgroup label="Beliebte Länder">
          {POPULAR_COUNTRIES.map((country) => (
            <option key={country.code} value={country.dialCode}>
              {country.flag} {country.dialCode} {country.name}
            </option>
          ))}
        </optgroup>

        <optgroup label="Weitere Länder">
          {OTHER_COUNTRIES.map((country) => (
            <option key={country.code} value={country.dialCode}>
              {country.flag} {country.dialCode} {country.name}
            </option>
          ))}
        </optgroup>
      </select>

      {/* Custom display overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center gap-1 px-3 bg-[var(--color-light-gray)] rounded-[var(--radius-default)]">
        <span className="text-[1.2rem] leading-none">{selectedCountry?.flag}</span>
        <span className="font-medium text-[0.95rem]">{value}</span>
      </div>
    </div>
  );
}

export { ALL_COUNTRIES, POPULAR_COUNTRIES };
