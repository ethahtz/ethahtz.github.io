# Project page — Source-Modality Monitoring in Vision-Language Models

Static page, no build step. Open `index.html` locally, or serve it with:

```bash
python -m http.server 8000
```

## Deploying

Copy `index.html` and `static/` into the repository that serves the site (for
example a `source-modality-monitoring.github.io` repo, matching the pattern of
the earlier project pages) and push. GitHub Pages will serve `index.html` from
the repository root.

```
index.html
static/
└── images/
```

## Contents

- `index.html` — the whole page: markup, CSS and the tab script are inline, so
  there are no external dependencies and nothing to install.
- `static/images/` — figures taken from the paper source. The PNGs are copied
  verbatim; `Data_example`, `train_vec_exp` and `freeze_remove_exp` were
  converted from PDF at 150 dpi. (`additional_baselines_exploit.png` is also
  staged but unused — it is the Appendix L.2 position-baseline results, left off
  the page to keep it short.)
- `paper_src/` — the unpacked LaTeX source the figures came from. Kept for
  reference; **not needed by the page** and safe to leave out when deploying.

## Notes for editing

- Two figure groups use model tabs (the micro-modality results and the learned
  intervention sweeps) so the per-model appendix figures are reachable without
  making the page longer. Each tab's `aria-controls` must match the `id` of its
  `<figure class="panel">`.
- Every results and setup figure is rendered at a uniform `width:1100px` so
  their edges line up down the page; only the task-example illustration is
  deliberately narrower (500px). Keep new figures at 1100px. Every figure links
  to its full-resolution file.
- The styling is the Isola/Zhang academic project template (the same one used by
  the earlier project pages), copied verbatim. The only additions are the tab
  styles, the click-to-enlarge rule, and a `max-width: 1140px` media query so the
  otherwise fixed 1100px layout stays readable on phones.
- The page has no external requests — no fonts, no CDN, no analytics.
