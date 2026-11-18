import { ALL_DISTRICTS } from "../lib/districts";
import { useLang } from "../i18n/useLang";

const STATES = [...new Set(ALL_DISTRICTS.map((d) => d.state))];

/** A district drop-down grouped by state. Shows Telugu names when Telugu is selected. */
export default function DistrictSelect({ value, onChange, id, label, placeholder }) {
  const { dn, sn } = useLang();
  return (
    <label className="fx-field">
      {label && <span>{label}</span>}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {STATES.map((s) => (
          <optgroup key={s} label={sn(s)}>
            {ALL_DISTRICTS.filter((d) => d.state === s).map((d) => (
              <option key={d.slug} value={d.district}>{dn(d.state, d.district)}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
