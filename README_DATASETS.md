# DV2 Australian Radio — starter datasets (10 October 2026)

Unzip the package into your DV2 project root. All CSV files are placed inside `data/`. The optional spreadsheet reference is in `reference/`; browser-based Vega-Lite specifications should use CSV/JSON, NOT XLSX.

## File list and dataset scope

- `data/australian_radio_combined_long.csv` — 477 rows, 14 columns. Source-tagged selection of official/industry observations with metric, year, unit, population base, notes and source_url; NOT a homogeneous measurement table. Filter on `source_id`, `metric`, `subgroup_type` and `year` BEFORE charting.
- `data/infinite_dial_national_2026.csv` — 151 observations selected from 2026 CRA/Edison presentation (Australia, generally age 10+, with some car questions using age 18+). Includes radio/streaming/podcast time trends and selected categories.
- `data/infinite_dial_regional_2026.csv` — 131 observations from REGIONAL CRA/Edison 2026 report. Represents regional Australia only. It is NOT the complement of the national data; do not label national results as 'metropolitan'.
- `data/acma_listening_2026.csv` — 122 observations from ACMA's March 2026 report based mainly on 2025 research (adults 18+). Includes radio ownership and listening subgroups.
- `data/gfk_metro_survey5_2026.csv` — 64 station-share observations for Sydney, Melbourne, Brisbane, Adelaide and Perth, SURVEY 5 ONLY. Since Survey 6 has now been published (8 October 2026), this file must be refreshed for the 'latest' station chart. It CANNOT by itself support a multi-survey bump chart.
- `data/abs_population_march2026.csv` — 9 population observations (8 states/territories plus Australia) from ABS, in THOUSANDS of people. Multiply by 1000 before using as a population denominator in individuals.
- `data/acma_dab_transmitters_july2026.csv` — 63 licensed DAB+ transmitter records with latitude, longitude and nominal power; DAB+ ONLY, no AM/FM. Some coordinates repeat because a site may have multiple licensed transmitters. A licence does not prove a transmitter is operating. Data subject to ACMA location/accuracy caveats.
- `data/c01_listening_trends.csv` — 20-row convenience slice (two series, 2017–2026); the same data are also in the national/combined files. The 2025 crossover (streaming audio 79%, total radio 78%) reflects overlapping listening behaviours, not a transfer of users.
- `reference/australian_radio_dv2_combined_dataset.xlsx` — original multi-sheet workbook previously compiled; intended for examination/traceability, not loaded by Vega Editor.

**About provenance**: These files (except the workbook) are machine-separated/copies from the previously prepared combined dataset, which itself transcribed *selected figures* from published reports. They are NOT the complete underlying survey microdata or full official raw releases. We confirmed the key C01 national time series against the official Infinite Dial 2026 slides (total radio: slide p.6; weekly streaming: slide p.27). Do not assume every one of the 477 records has been rechecked individually against the original reports.

## Official sources (read and cite in your final dashboard)

1. Edison Research & Commercial Radio & Audio, Infinite Dial Australia 2026 (national slides; see radio listening, streaming, podcasts): https://cra.au/hubfs/Infinite%20Dial%202026_v2.pdf
2. Infinite Dial Australia 2026 (regional slides): https://cra.au/hubfs/Infinite%20Dial%202026%20-%20REGIONAL%20Presentation_Final.pdf
3. CRA source page and methodology: https://cra.au/infinite-dial-2026
4. ACMA, Communications and media in Australia: How we watch and listen to content (2026 report plus ORIGINAL data-tables XLSX download): https://www.acma.gov.au/publications/2026-03/report/communications-and-media-australia-how-we-watch-and-listen-content
5. CRA/GfK metropolitan radio ratings; includes 2026 Survey 6: https://cra.au/metro-ratings
6. GfK radio measurement summary reports archive: https://www.gfk-media-measurement.com/global/en/news-center/2025/radio-audience-measurement-australia-reports-archive/
7. ABS, National, state and territory population, March 2026: https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/mar-2026
8. ACMA, List of licensed broadcast transmitters, including ORIGINAL full transmitter Excel ZIP (all bands): https://www.acma.gov.au/list-transmitters-licence-broadcast

## Data gaps to address before locking in the charts

1. C04 'latest stations' needs current GfK Survey 6 station figures; C05 bump needs multiple surveys and a consistent station key in each market.
2. Three meaningful map idioms need a separate Australian state/territory map shape (TopoJSON), plus AM/FM records from the ACMA official full transmitter ZIP if we want to compare bands. This starter contains ONLY DAB+ records.
3. A genuine age × listening-platform heatmap needs the specific published cross-tab; do not fabricate rows by combining unrelated marginal percentages.
4. For metro vs regional comparisons, the national survey is NOT a metro-only dataset. Find a directly comparable metro subset before using the 'Metro' label.
5. Source populations differ: ACMA generally adults 18+, Infinite Dial generally 10+, GfK station share uses its own survey basis. Never silently pool or compare percentages with different denominators.
6. Do not confuse station radio *share* with weekly listening *reach*; their denominators and interpretations differ.
7. Data reference periods differ from publication dates; cite correctly.

## Running the charts

- Vega Editor https://vega.github.io/editor/ cannot read `data/*.csv` on your computer by simply pasting the JSON. To test there, either: (a) host the CSV on a public GitHub repository and set `data.url` to its raw HTTPS link; OR (b) temporarily use Vega-Lite `data.values` with selected ACTUAL observations.
- Local HTML/JS project: refer to `data/filename.csv`, start VS Code Live Server from the DV2 root, and call vegaEmbed from `js/vega_lite_vis.js`.
- You do not need to download any datasets separately just to start. Source PDFs/Excel files are linked above for auditing/replenishment.
