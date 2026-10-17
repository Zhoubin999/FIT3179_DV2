FIT3179 DV2 filename fix (based on Layout v0.7)

All Vega-Lite JSON filenames in js/ have been renamed from cNN_* to chartNN_*.
index.html data-spec references now point to the matching names.
Chart container ids c01...c12 are unchanged (required by main.js).
CSV file names and data/... relative URLs are unchanged.

To install: replace the old site files with the contents of this package.
IMPORTANT: delete the OLD cNN_*.vg.json files in js/ if keeping your folder tidy; they are no longer referenced.
If you rename any other JSON filenames later, edit the corresponding data-spec in index.html.

For VS Code Live Server: open this folder and serve index.html via http://127.0.0.1:5500/ (port may differ).
