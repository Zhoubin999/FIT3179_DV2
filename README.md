# FIT3179 DV2 — Post-Critique Draft v0.9

This is a self-contained local website draft. Place `index.html`, `css/`, `js/` and `data/` together in the repository root. The existing `chart01_...` through `chart12_...` filename convention and relative paths remain unchanged.

## Changes in v0.9

- Moved the Metro market selector beside the three charts that it controls, and moved the station-distribution chart into the same Local radio chapter as the leading-station map and station-rank bump chart.
- Added plain-language instructions, an author byline, links to source reports and the project's processed data, and definitions of DAB+, FM, and percentage points.
- Enlarged body text, chart axis/legend default fonts and card headings, and limited paragraph width.
- Removed duplicate internal Vega-Lite titles. Their population/timeframe subtitles now appear as a small context line below each HTML card description.
- C10: added city-name labels and replaced the repeated "Limit" tooltip with actual frequency blocks and the number of licensed entries associated with each exact named area in the supplied ACMA subset.
- C11: added graduated legend ticks (0–70) and directly labelled approximate state locations using percentages from the supplied C11 CSV. Label coordinates are cartographic positions, not geographic estimates or a new dataset.
- C12: changed the symbols from area-proportional circles to length-proportional horizontal ticks (size scale begins at zero) to improve distinctions between 12% and 17.6%. Retained direct percentage and city labels.

## Remaining editorial and data work

- The C10 chart remains a preliminary contextual map, **not** a map of broadcast reception; administrative licence-entry counts do not measure coverage. Consider replacing this idiom with verified coverage/service data if possible.
- The proposed change in listeners' *content preferences* (e.g. music vs news) is **not established by the current data**. Obtain a comparably defined content-category dataset before discussing preference shifts.
- "Merge the datasets" should mean join/harmonise **compatible** datasets by defensible keys; do not treat ACMA adult 18+ and Infinite Dial population 10+ rates as directly interchangeable.
- The author's name is written as `Zhoubin Li` based on earlier submitted coursework context. Edit it if a different byline is desired.
- The JSON files pass syntax checks and all twelve relative paths exist. **Browser rendering could not be fully checked in this environment**; local Chromium access was blocked. Review C10 city-label overlaps, C11 state labels, C12 proportional tick marks and C08/C09/C12 interactions on GitHub Pages.
