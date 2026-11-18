import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocationSelection } from "../../context/LocationContext";
import { mapsSearchUrl } from "../../utils/maps";
import DistrictSelect from "../components/DistrictSelect";
import { useLang } from "../i18n/useLang";
import { districtByName, guidePath } from "../lib/districts";
import { recommend } from "../lib/quiz";
import { usePageTitle } from "../lib/usePageTitle";

const QUESTIONS = [
  { id: "diet", title: "qDiet", options: [["veg", "veg"], ["nonveg", "nonveg"], ["either", "either"]] },
  { id: "spice", title: "qSpice", options: [["mild", "spiceMild"], ["medium", "spiceMedium"], ["hot", "spiceHot"]] },
  { id: "sweet", title: "qSweet", options: [["yes", "sweetYes"], ["some", "sweetSome"], ["no", "sweetNo"]] },
  { id: "mood", title: "qMood", options: [["comfort", "moodComfort"], ["adventure", "moodAdventure"], ["celebrate", "moodCelebrate"], ["quick", "moodQuick"]] },
];

export default function QuizPage() {
  const { t, dn } = useLang();
  usePageTitle(t("quizTitle"));
  const loc = useLocationSelection();
  const [district, setDistrict] = useState(loc?.district ?? "Hyderabad");
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];
  const result = done ? recommend(answers, district) : null;
  const info = districtByName(district);

  const choose = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setStep((s) => s + 1);
  };

  return (
    <div className="page fx-page narrow">
      <p className="kicker">{t("groupFun")}</p>
      <h1>🍛 {t("quizTitle")}</h1>
      <p className="lead">{t("quizLead")}</p>

      {step === 0 && <DistrictSelect id="quiz-district" label={t("district")} value={district} onChange={setDistrict} />}

      {!done ? (
        <section className="fx-card" aria-live="polite">
          <p className="muted small">{step + 1} / {QUESTIONS.length}</p>
          <progress className="fx-progress" max={QUESTIONS.length} value={step} aria-label="Quiz progress" />
          <h2 className="fx-h2">{t(q.title)}</h2>
          <div className="fx-options">
            {q.options.map(([value, key]) => <button key={value} type="button" className="fx-option" onClick={() => choose(q.id, value)}>{t(key)}</button>)}
          </div>
          {step > 0 && <button type="button" className="btn-ghost btn-sm" onClick={() => setStep(step - 1)}>← {t("back")}</button>}
        </section>
      ) : (
        <section aria-live="polite">
          <h2 className="fx-h2">🍴 {t("dishesFor")}{info ? ` · ${dn(info.state, district)}` : ""}</h2>
          {result.dishes.length === 0 ? <p className="muted">No dish matched everything. Try a different answer.</p> : (
            <ul className="fx-list">
              {result.dishes.map((d) => (
                <li key={d.id}><span aria-hidden="true">{d.emoji}</span><div><strong>{d.name}</strong><p className="muted small">{d.blurb}</p></div></li>
              ))}
            </ul>
          )}
          {result.dishes.length < 3 && result.elsewhere.length > 0 && (
            <>
              <h3 className="fx-h3">Also worth a trip elsewhere</h3>
              <ul className="fx-list">
                {result.elsewhere.map((d) => <li key={d.id}><span aria-hidden="true">{d.emoji}</span><div><strong>{d.name}</strong><p className="muted small">{d.blurb} Look for it in {d.where.join(", ") || "its home district"}.</p></div></li>)}
              </ul>
            </>
          )}

          <h2 className="fx-h2">🍽️ {t("restaurantsFor")}</h2>
          {result.restaurants.length === 0 ? <p className="muted">No restaurant matched in this district.</p> : (
            <ul className="fx-list">
              {result.restaurants.map((r) => (
                <li key={r.name}>
                  <span aria-hidden="true">🍽️</span>
                  <div>
                    <strong>{r.name}</strong> {typeof r.rating === "number" && <span className="tag">★ {r.rating}</span>}
                    <p className="muted small">{r.cuisine}. Try: {r.dish}</p>
                    {r.why.length > 0 && <p className="small">Matches: {r.why.join(", ")}</p>}
                    <a className="small" href={mapsSearchUrl(`${r.name}, ${r.area}`)} target="_blank" rel="noopener noreferrer">📍 {t("openInMaps")}</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="trail-actions">
            <button type="button" className="btn btn-sm" onClick={() => { setStep(0); setAnswers({}); }}>{t("startOver")}</button>
            {info && <Link className="btn-ghost btn-sm" to={guidePath(info)}>{t("viewGuide")}</Link>}
            <Link className="btn-ghost btn-sm" to="/passport">🛂 {t("passport")}</Link>
          </div>
          <p className="muted small">Suggestions come from simple rules on dish and cuisine text. Taste is personal, so treat them as ideas.</p>
        </section>
      )}
    </div>
  );
}
