const RANK_COLORS = {
  "WR": '#e013db',
  "S+": '#26a7f1',
  "S-": '#26a7f1',
  "A+": '#1df814',
  "A-": '#1df814',
  "B+": '#c3f057',
  "B-": '#c3f057',
  "C+": '#fefc0e',
  "C-": '#fefc0e',
  "D+": '#f9a507',
  "D-": '#f9a507',
  "E+": '#ae252a',
  "E-": '#ae252a',
  "F+": '#86797a',
  "F-": '#86797a'
};

// parse svg from file
let rankTemplate = null;
const rankTemplatePromise = fetch('mods/rank_template.svg')
  .then(r => r.text())
  .then(text => {
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    rankTemplate = doc.documentElement;
  });

function m_makeRankBadge(label) {
  if (!rankTemplate) {
    console.warn('Rank template not loaded yet');
    return null;
  }
  const template = rankTemplate;
  const svg = template.cloneNode(true);
  svg.style.color = RANK_COLORS[label] ?? '#ffffff';
  svg.querySelectorAll('.rank-label').forEach(t => t.textContent = label);
  return svg;
}

function m_calculateRank(finishTimeObject, WRTimeObject) {
  const finishFrames = finishTimeObject.numberOfFrames;
  const WRFrames = WRTimeObject.numberOfFrames;
  const ratio = finishFrames / WRFrames;
  if (ratio <= 1) {
    return "WR";
  } else if (ratio < 1.0025) {
    return "S+";
  } else if (ratio < 1.005) {
    return "S-";
  } else if (ratio < 1.01) {
    return "A+";
  } else if (ratio < 1.025) {
    return "A-";
  } else if (ratio < 1.05) {
    return "B+";
  } else if (ratio < 1.075) {
    return "B-";
  } else if (ratio < 1.1) {
    return "C+";
  } else if (ratio < 1.125) {
    return "C-";
  } else if (ratio < 1.15) {
    return "D+";
  } else if (ratio < 1.175) {
    return "D-";
  } else if (ratio < 1.2) {
    return "E+";
  } else if (ratio < 1.225) {
    return "E-";
  } else if (ratio < 1.25) {
    return "F+";
  } else {
    return "F-";
  }
}