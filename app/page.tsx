"use client";

import { useMemo, useState } from "react";

type Ingredient = { amount: number | null; unit: string; name: string; note?: string };
type Recipe = {
  id: string; title: string; emoji: string; category: string; time: string;
  baseServings: number; servingLabel: string; intro: string; ingredients: Ingredient[];
  steps: string[]; tip: string;
};

const recipes: Recipe[] = [
  {
    id: "puree-maison", title: "Purée de pommes de terre", emoji: "🥔", category: "Accompagnement",
    time: "40 min", baseServings: 4, servingLabel: "personnes",
    intro: "Une purée maison simple, douce et onctueuse, avec seulement quelques ingrédients.",
    ingredients: [
      { amount: 1, unit: "kg", name: "pommes de terre", note: "à chair farineuse, type Bintje ou Agria" },
      { amount: 200, unit: "ml", name: "lait" },
      { amount: 50, unit: "g", name: "beurre" },
      { amount: null, unit: "", name: "sel", note: "à votre goût" },
      { amount: null, unit: "", name: "muscade", note: "facultatif" },
    ],
    steps: [
      "Épluchez les pommes de terre, rincez-les et coupez-les en morceaux de taille régulière.",
      "Placez-les dans une casserole d’eau froide salée. Portez à ébullition, puis faites cuire 20 à 25 minutes, jusqu’à ce qu’un couteau les traverse facilement.",
      "Pendant ce temps, faites tiédir le lait sans le faire bouillir.",
      "Égouttez bien les pommes de terre, puis remettez-les 1 minute dans la casserole chaude à feu doux pour retirer l’excès d’eau.",
      "Écrasez-les au presse-purée ou à la fourchette. Incorporez le beurre, puis ajoutez progressivement le lait chaud jusqu’à obtenir la texture souhaitée.",
      "Goûtez, rectifiez le sel et ajoutez un peu de muscade si vous le souhaitez. Servez immédiatement.",
    ],
    tip: "N’utilisez pas de mixeur : il rendrait la purée collante. Pour une purée plus légère, ajoutez un peu plus de lait chaud.",
  },
  {
    id: "gateau-skyr", title: "Gâteau moelleux au skyr", emoji: "🍰", category: "Dessert",
    time: "50 min", baseServings: 8, servingLabel: "personnes",
    intro: "Un gâteau simple, léger et très moelleux, parfait pour utiliser un pot de skyr.",
    ingredients: [
      { amount: 3, unit: "", name: "œufs" }, { amount: 300, unit: "g", name: "skyr" },
      { amount: 150, unit: "g", name: "sucre", note: "120 g pour une version moins sucrée" },
      { amount: 200, unit: "g", name: "farine" }, { amount: 1, unit: "sachet", name: "levure chimique", note: "10 à 11 g" },
      { amount: 1, unit: "sachet", name: "sucre vanillé", note: "facultatif" },
      { amount: 50, unit: "ml", name: "huile neutre", note: "ou 50 g de beurre fondu, facultatif" },
      { amount: null, unit: "", name: "sel", note: "1 pincée" },
    ],
    steps: [
      "Préchauffez le four à 180 °C.",
      "Fouettez les œufs avec le sucre jusqu’à obtenir un mélange légèrement mousseux.",
      "Ajoutez le skyr, puis l’huile ou le beurre fondu.",
      "Incorporez la farine, la levure et le sel. Mélangez juste assez pour homogénéiser.",
      "Versez dans un moule de 20 à 22 cm, beurré ou chemisé.",
      "Faites cuire 35 à 40 minutes. La lame d’un couteau doit ressortir sèche.",
    ],
    tip: "Conservation : 5 à 7 jours au frais. Pour deux semaines ou plus, congelez le gâteau refroidi en parts individuelles.",
  },
  {
    id: "madeleines", title: "Madeleines classiques", emoji: "🧈", category: "Goûter",
    time: "1 h 25", baseServings: 20, servingLabel: "madeleines",
    intro: "Des madeleines dorées à la mie tendre, avec le repos et le choc thermique qui font la fameuse bosse.",
    ingredients: [
      { amount: 2, unit: "", name: "œufs" }, { amount: 100, unit: "g", name: "sucre" },
      { amount: 1, unit: "sachet", name: "sucre vanillé", note: "ou extrait de vanille" },
      { amount: 120, unit: "g", name: "farine" }, { amount: 1, unit: "c. à café", name: "levure chimique" },
      { amount: 100, unit: "g", name: "beurre fondu" }, { amount: 0.5, unit: "", name: "zeste de citron", note: "facultatif" },
    ],
    steps: [
      "Fouettez les œufs avec le sucre et le sucre vanillé jusqu’à ce que le mélange blanchisse.",
      "Incorporez la farine et la levure tamisées.",
      "Ajoutez le beurre fondu tiédi, puis le zeste de citron.",
      "Couvrez et laissez reposer au moins 1 heure au réfrigérateur, idéalement toute une nuit.",
      "Préchauffez le four à 220 °C. Beurrez le moule et remplissez les alvéoles aux deux tiers.",
      "Enfournez 4 minutes à 220 °C, puis baissez à 180 °C et poursuivez 4 à 6 minutes.",
      "Démoulez dès la sortie du four et laissez refroidir sur une grille.",
    ],
    tip: "Pour une belle bosse, gardez la pâte très froide jusqu’au dernier moment et enfournez-la immédiatement dans le four bien chaud.",
  },
];

function formatAmount(value: number) {
  const rounded = Math.round(value * 100) / 100;
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(rounded);
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [servings, setServings] = useState<Record<string, number>>({});
  const selected = recipes.find((recipe) => recipe.id === selectedId);
  const filtered = useMemo(() => recipes.filter((recipe) =>
    `${recipe.title} ${recipe.category} ${recipe.ingredients.map((item) => item.name).join(" ")}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  if (selected) {
    const count = servings[selected.id] ?? selected.baseServings;
    const ratio = count / selected.baseServings;
    return (
      <main className="recipe-page">
        <header className="detail-header">
          <button className="back" onClick={() => setSelectedId(null)} aria-label="Retour aux recettes">←</button>
          <span className="brand-small">MIJOTÉ</span>
          <span className="header-spacer" />
        </header>
        <article className="detail-shell">
          <div className="recipe-hero">
            <span className="hero-emoji" aria-hidden>{selected.emoji}</span>
            <div><span className="eyebrow">{selected.category} · {selected.time}</span><h1>{selected.title}</h1><p>{selected.intro}</p></div>
          </div>

          <section className="serving-card" aria-label="Calculateur de quantités">
            <div><span className="section-kicker">QUANTITÉS POUR</span><strong>{count} {selected.servingLabel}</strong></div>
            <div className="stepper">
              <button onClick={() => setServings({ ...servings, [selected.id]: Math.max(1, count - 1) })} aria-label="Diminuer">−</button>
              <span>{count}</span>
              <button onClick={() => setServings({ ...servings, [selected.id]: count + 1 })} aria-label="Augmenter">+</button>
            </div>
          </section>

          <section className="content-section"><h2>Ingrédients</h2><ul className="ingredients">
            {selected.ingredients.map((item) => <li key={item.name}><span className="amount">{item.amount === null ? "—" : formatAmount(item.amount * ratio)} {item.unit}</span><span><b>{item.name}</b>{item.note && <small>{item.note}</small>}</span></li>)}
          </ul></section>

          <section className="content-section"><h2>Préparation</h2><ol className="steps">
            {selected.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
          </ol></section>
          <aside className="tip"><span>✦</span><div><b>Le bon geste</b><p>{selected.tip}</p></div></aside>
        </article>
      </main>
    );
  }

  return (
    <main>
      <header className="home-header"><div><span className="eyebrow">VOTRE CARNET DE CUISINE</span><h1>Mijoté<span>.</span></h1><p>Les recettes que vous aimez, toujours à portée de main.</p></div><div className="sun">☀</div></header>
      <div className="home-shell">
        <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Chercher une recette ou un ingrédient…" /></label>
        <div className="list-heading"><h2>Mes recettes</h2><span>{filtered.length} recettes</span></div>
        <section className="recipe-grid">
          {filtered.map((recipe) => <button className="recipe-card" key={recipe.id} onClick={() => setSelectedId(recipe.id)}>
            <span className="card-emoji" aria-hidden>{recipe.emoji}</span><span className="card-copy"><span className="eyebrow">{recipe.category}</span><strong>{recipe.title}</strong><span className="meta">◷ {recipe.time} · {recipe.baseServings} {recipe.servingLabel}</span></span><span className="arrow">→</span>
          </button>)}
        </section>
        {filtered.length === 0 && <p className="empty">Aucune recette ne correspond à votre recherche.</p>}
      </div>
    </main>
  );
}
