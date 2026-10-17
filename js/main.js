// FIT3179 DV2: load Vega-Lite charts and keep the five-city market selection in sync.
// Charts outside C08/C09/C12 are deliberately unaffected by this choice.
const chartNodes = [...document.querySelectorAll('[data-spec]')];
const marketSelect = document.querySelector('#global-market');
const marketCharts = new Set(['c08', 'c09', 'c12']);
const validMarkets = ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Perth'];
const chartViews = new Map();
let selectedMarket = 'Melbourne';

const visualConfig = {
  background: null,
  axis: {
    labelFont: 'DM Sans, Arial', titleFont: 'DM Sans, Arial',
    labelColor: '#526475', titleColor: '#4B6171',
    domainColor: '#ACB9C3', tickColor: '#ACB9C3', gridColor: '#E8ECEF',
    labelFontSize: 12, titleFontSize: 13
  },
  header: {labelFont: 'DM Sans, Arial', titleFont: 'DM Sans, Arial'},
  legend: {
    labelFont: 'DM Sans, Arial', titleFont: 'DM Sans, Arial',
    labelColor: '#4D6071', labelFontSize: 12, titleFontSize: 12
  },
  title: {
    font: 'Outfit, Arial', fontWeight: 600, fontSize: 16,
    subtitleFont: 'DM Sans, Arial', subtitleFontSize: 12,
    color: '#23384A', subtitleColor: '#657988',
    anchor: 'start', offset: 12
  },
  view: {stroke: null}
};

function adjustChart(spec, container) {
  const chartWidth = container.clientWidth || 600;
  const copy = structuredClone(spec);
  const reserve = container.closest('.full') ? 105 : 125;
  const target = Math.max(280, Math.min(Number(spec.width) || 700, chartWidth - reserve));

  if (copy.vconcat) {
    copy.width = target;
    copy.vconcat.forEach(chart => { chart.width = target; });
  } else if (!copy.facet) {
    copy.width = target;
  }
  return copy;
}

function changeMarket(nextMarket) {
  // This is a single-choice selection. Empty and unsupported markets are ignored.
  if (!validMarkets.includes(nextMarket)) return;
  selectedMarket = nextMarket;
  if (marketSelect) marketSelect.value = nextMarket;

  for (const [id, view] of chartViews.entries()) {
    if (!marketCharts.has(id)) continue;
    try {
      view.signal('SelectedMarket', nextMarket).runAsync().catch(console.error);
    } catch (error) {
      console.error(`Could not synchronise ${id}`, error);
    }
  }
}

if (marketSelect) {
  marketSelect.addEventListener('change', () => changeMarket(marketSelect.value));
}

async function renderChart(el) {
  try {
    const response = await fetch(el.dataset.spec, {cache: 'no-cache'});
    if (!response.ok) throw new Error(`Could not load ${el.dataset.spec} (${response.status})`);
    const spec = await response.json();
    el.innerHTML = '';

    const result = await vegaEmbed(el, adjustChart(spec, el), {
      actions: false, renderer: 'svg', config: visualConfig
    });

    if (marketCharts.has(el.id)) {
      chartViews.set(el.id, result.view);
      result.view.signal('SelectedMarket', selectedMarket);
      await result.view.runAsync();

      // Clicking an actual market mark updates the common selection.
      // Background/legend clicks do nothing; data for other markets remain visible.
      result.view.addEventListener('click', (_event, item) => {
        const datum = item?.datum;
        const market = datum?.market || datum?.geography;
        if (validMarkets.includes(market)) changeMarket(market);
      });
    }
  } catch (error) {
    console.error('Chart rendering failed', el.dataset.spec, error);
    const status = document.createElement('div');
    status.className = 'load-status failure';
    status.textContent = `Chart could not load: ${error.message}`;
    el.replaceChildren(status);
  }
}

// Progressive rendering avoids loading all twelve figures simultaneously.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      renderChart(entry.target);
    });
  }, {rootMargin: '450px 0px'});
  chartNodes.forEach(node => observer.observe(node));
} else {
  chartNodes.forEach(renderChart);
}
