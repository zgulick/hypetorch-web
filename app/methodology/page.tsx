"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import { Check } from "lucide-react";

// Every figure on this page is sourced from the scoring code, not from marketing
// copy. Base weights: config.py BASE_JORDN_WEIGHTS. Interaction multipliers:
// hype_calculator.py calculate_interaction_effects. Reach formula:
// social_reach_collector.py (the weighted one — reach_calculator.py holds an
// unweighted variant that is dead on the production path). Do not "round up"
// these numbers or restate them from memory; re-check the source if they change.

const pipelineSteps = [
  {
    title: "Ingest",
    body: "Episodes are pulled from public RSS feeds on a weekly cycle. The source panel is fixed per vertical and versioned; panel changes are recorded with the date they took effect."
  },
  {
    title: "Transcribe",
    body: "Audio is transcribed, then the audio file is deleted. No source recordings are retained."
  },
  {
    title: "Resolve entities",
    body: "Entity detection uses a curated alias and nickname dictionary with word-boundary matching, plus pronoun-based attribution for follow-on references."
  },
  {
    title: "Derive signals",
    body: "For each entity and episode: mention count, talk time, and context. Transcripts are retained in a private internal store used for deduplication and re-scoring; they are never published or redistributed."
  },
  {
    title: "Collect external signals",
    body: "Each entity is then looked up against public sources outside the podcast corpus: Wikipedia pageviews, Google Trends search interest, Reddit mention volume, and Google News mention counts. Lookups run one entity at a time and are deliberately paced to stay inside each source's rate limits, so this is the slowest stage of the run. Google News is collected for context but is not a JORDN component."
  },
  {
    title: "Score",
    body: "Signals are combined into JORDN, PIPN, and RODMN, then written to the database and exposed via API."
  }
];

const jordnWeights = [
  { component: "Talk time", weight: "30%" },
  { component: "Mentions", weight: "25%" },
  { component: "Google Trends", weight: "20%" },
  { component: "Reddit mentions", weight: "15%" },
  { component: "Wikipedia views", weight: "10%" }
];

const interactionRules = [
  "Talk time and mentions both more than one standard deviation above the mean → ×1.3",
  "Google Trends more than one standard deviation above the mean with below-average talk time → ×1.2",
  "Reddit mentions more than one standard deviation above the mean → ×1.15"
];

const reachComponents = [
  { platform: "Instagram", weight: "1.5 × log(followers + 1)" },
  { platform: "TikTok", weight: "1.0 × log(followers + 1)" },
  { platform: "Twitter / X", weight: "0.75 × log(followers + 1)" },
  { platform: "Combined total", weight: "0.3 × log(all followers + 1)" }
];

const rightsRows = [
  {
    label: "Access",
    body: "All feeds currently ingested are public podcast RSS feeds requiring no authentication. No paywalled sources."
  },
  {
    label: "Audio",
    body: "Transcribed then deleted. Never retained or redistributed."
  },
  {
    label: "Retention",
    body: "Derived data — entity, timestamp, talk time, context — is what powers the scores. Transcripts are retained in a private internal store used for deduplication and re-scoring, and are never published or redistributed."
  },
  {
    label: "Opt-out",
    body: "A publisher can request exclusion by contacting us; the feed is removed from the source panel."
  },
  {
    label: "Output",
    body: "Counts, durations, and scores. No source content republished."
  }
];

const limitations = [
  {
    title: "Panel-bounded",
    body: "An entity discussed only on shows outside the source panel won't register. Coverage is a function of the panel, not of the world."
  },
  {
    title: "Transcription error",
    body: "Names, nicknames, and non-English pronunciations are the most common failure mode."
  },
  {
    title: "English-language only",
    body: "Non-English sources are not ingested."
  },
  {
    title: "Attention, not sentiment",
    body: "JORDN counts discussion. It does not distinguish praise from criticism."
  },
  {
    title: "Relative, not absolute",
    body: "Scores are normalised within a population. Cross-population comparison requires care."
  },
  {
    title: "No causal claim",
    body: "The metrics describe what is being discussed. They do not establish why, or what follows."
  }
];

export default function MethodologyPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full px-6 pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 leading-tight mb-6"
          >
            Methodology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            An index is only useful if you can audit it. Everything below is the actual
            calculation — inputs, weights, and limits — so you can judge whether the numbers
            mean what you need them to mean.
          </motion.p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Pipeline
          </motion.h2>

          <div className="space-y-4">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-5 bg-gray-800/50 border border-gray-700 rounded-lg p-6"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JORDN */}
      <section id="jordn" className="relative w-full px-6 py-16 scroll-mt-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              JORDN — attention
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Measures who is being discussed right now. Combines podcast mentions, talk time,
              social signals, and search interest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden mb-8"
          >
            <table className="w-full text-left">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-white">Component</th>
                  <th className="px-6 py-3 text-sm font-semibold text-white text-right">Base weight</th>
                </tr>
              </thead>
              <tbody>
                {jordnWeights.map((row) => (
                  <tr key={row.component} className="border-t border-gray-700">
                    <td className="px-6 py-3 text-gray-300">{row.component}</td>
                    <td className="px-6 py-3 text-gray-300 text-right font-mono">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-300 leading-relaxed"
          >
            <p>
              <strong className="text-white">Weights apply to standardised inputs.</strong> Each
              component is z-score normalised against the population before weighting, so these
              percentages are weights on standardised deviations from the population mean — not
              shares of a raw total.
            </p>
            <p>
              <strong className="text-white">Scale.</strong> Scores are rescaled so the population
              mean is exactly 100. There is no fixed floor and no fixed ceiling. A score of 140
              means 40% above the population average for that period; it is not an absolute
              quantity and is only comparable within the same population and period.
            </p>
            <p>
              <strong className="text-white">Weighting adapts to data completeness.</strong> A
              component with sparse coverage in a given period is down-weighted, after which all
              weights are bounded and renormalised. Weighting responds to how much data exists,
              not to observed outcomes — nothing about the model is trained or self-adjusting.
            </p>
            <div>
              <p className="mb-3">
                <strong className="text-white">Interaction effects.</strong> The model detects
                combinations rather than treating components as independent. Three rules apply a
                multiplier to the weighted base score:
              </p>
              <ul className="space-y-2">
                {interactionRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <Check size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PIPN */}
      <section id="pipn" className="relative w-full px-6 py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              PIPN — attention efficiency
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Measures whether an entity receives more or less discussion than their social media
              reach would predict.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-6 mb-8"
          >
            <p className="font-mono text-center text-white text-lg">
              PIPN = JORDN percentile − Reach percentile
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-300 leading-relaxed"
          >
            <p>
              <strong className="text-white">Scale.</strong> −100 to +100. Zero means conversation
              volume is in line with reach. Positive means more discussed than reach predicts;
              negative means less.
            </p>
            <div>
              <p className="mb-4">
                <strong className="text-white">Reach baseline.</strong> Follower counts from
                Instagram, TikTok, and Twitter/X, combined on a log scale so that additional
                followers count for progressively less:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <tbody>
                    {reachComponents.map((row, i) => (
                      <tr key={row.platform} className={i > 0 ? "border-t border-gray-700" : ""}>
                        <td className="px-6 py-3 text-gray-300">{row.platform}</td>
                        <td className="px-6 py-3 text-gray-400 text-right font-mono text-sm">{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                The resulting reach score is percentile-ranked within the population, and refreshed
                weekly as part of each analysis run.
              </p>
            </div>
            <p>
              <strong className="text-white">Exclusions.</strong> PIPN is only produced for people.
              Entities with no social media data are excluded rather than scored as zero.
            </p>
            <p>
              <strong className="text-white">Read it as descriptive, not evaluative.</strong> A
              negative PIPN says an entity is discussed less than their following would suggest. It
              does not say they deserve less attention, and it is not a judgment about the entity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* RODMN */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              RODMN — divisiveness
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Measures how polarised discussion of an entity is, on a 0–10 scale. Independent of
              popularity — a little-known entity can score high.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              RODMN describes the <em>coverage</em>, not the entity. A high score means commentators
              disagree about someone; it is not an assessment of that person&apos;s conduct or
              character.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Full RODMN methodology is documented for clients on request.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Data sources and rights */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Data sources and rights
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg divide-y divide-gray-700"
          >
            {rightsRows.map((row) => (
              <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6 px-6 py-4">
                <div className="font-semibold text-white">{row.label}</div>
                <div className="text-gray-300 leading-relaxed">{row.body}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Known limitations */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Known limitations
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {limitations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Validation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Independent validation is in progress. We publish our full methodology so that scores
            can be assessed directly against your own outcome data.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            See it running
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/demo">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105">
                See the Live Demo
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-8 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors">
                Pricing
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-950 text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-sm">
            <p>© {new Date().getFullYear()} HypeTorch. Professional sports media analytics platform.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
