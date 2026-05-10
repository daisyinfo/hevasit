const fs = require('fs');

function processCss(filePath) {
    let css = fs.readFileSync(filePath, 'utf8');

    const rootVars = `
  --rgb-text: 255, 255, 255;
  --rgb-bg: 0, 0, 0;
  --input-color: #ffffff;
  --card-bg-start: #2a2f45;
  --card-bg-end: #1c1f2e;
  --blackboard-bg: #1e222b;
  --fab-bg: rgba(15, 18, 25, 0.88);
`;

    const lightVars = `
:root[data-theme="light"] {
  --bg: #f8fafc;
  --surface: rgba(255, 255, 255, 0.95);
  --surface-solid: #ffffff;
  --text: #1e293b;
  --text-dim: rgba(30, 41, 59, 0.6);
  --primary: #4f46e5;
  --primary-glow: rgba(79, 70, 229, 0.2);
  --secondary: #e2e8f0;
  --border: rgba(0, 0, 0, 0.1);
  --disabled-bg: #e2e8f0;
  --disabled-border: rgba(0, 0, 0, 0.1);
  --unassigned-bg: #f1f5f9;
  
  --rgb-text: 0, 0, 0;
  --rgb-bg: 255, 255, 255;
  --input-color: #1e293b;
  --card-bg-start: #ffffff;
  --card-bg-end: #f8fafc;
  --blackboard-bg: #334155;
  --fab-bg: rgba(255, 255, 255, 0.9);
}

:root[data-theme="light"] .blackboard {
  color: #f8fafc;
}
:root[data-theme="light"] .student-card {
  color: var(--text);
}
:root[data-theme="light"] .action-btn.secondary {
  background: rgba(0,0,0,0.05);
}
:root[data-theme="light"] .brush-btn {
  color: rgba(0,0,0,0.8);
  border: 1px solid rgba(0,0,0,0.15);
}
:root[data-theme="light"] .brush-btn.active {
  color: white;
}
:root[data-theme="light"] .pool-section {
  border-color: rgba(0,0,0,0.1);
}
:root[data-theme="light"] .pool-header {
  color: rgba(0,0,0,0.7);
  background: rgba(0,0,0,0.03);
}
:root[data-theme="light"] .seat-number {
  color: rgba(0,0,0,0.3);
}
:root[data-theme="light"] .grid-cell.disabled {
  background-color: rgba(226, 232, 240, 0.8);
}
`;

    css = css.replace('--unassigned-bg: #2a2e3a;', '--unassigned-bg: #2a2e3a;' + rootVars);
    css = css.replace('}\n\nbody {', '}\n' + lightVars + '\nbody {');

    css = css.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/g, 'rgba(var(--rgb-text),');
    css = css.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,/g, 'rgba(var(--rgb-bg),');
    
    css = css.replace(/color:\s*#ffffff\s*!important;/g, 'color: var(--input-color) !important;');
    css = css.replace(/background:\s*linear-gradient\(to bottom, #2a2f45, #1c1f2e\);/g, 'background: linear-gradient(to bottom, var(--card-bg-start), var(--card-bg-end));');
    css = css.replace(/background:\s*#1e222b;/g, 'background: var(--blackboard-bg);');
    css = css.replace(/background:\s*rgba\(15, 18, 25, 0.88\);/g, 'background: var(--fab-bg);');

    fs.writeFileSync(filePath, css, 'utf8');
}

function processHtml(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    html = html.replace(/style="background: rgba\(13, 15, 21, 0.95\); border-bottom: 1px solid var\(--border\);"/g, 'style="background: var(--surface); border-bottom: 1px solid var(--border);"');
    html = html.replace(/style="background: rgba\(0,0,0,0.15\);"/g, 'style="background: rgba(var(--rgb-bg), 0.15);"');
    html = html.replace(/rgba\(255,255,255,/g, 'rgba(var(--rgb-text),');
    
    const buttonHtml = `
        <button id="themeToggleBtn" class="p-2 hover:bg-black/10 rounded-lg transition-colors" title="테마 변경" style="color: rgba(var(--rgb-text), 0.7);">
          <i data-lucide="sun" class="w-5 h-5 hidden" id="iconSun"></i>
          <i data-lucide="moon" class="w-5 h-5" id="iconMoon"></i>
        </button>
`;
    html = html.replace('<div class="layout-manager-group">', buttonHtml + '\n      <div class="layout-manager-group">');
    
    html = html.replace(/text-white\/70/g, 'text-[color:rgba(var(--rgb-text),0.7)]');
    html = html.replace(/text-white\/40/g, 'text-[color:rgba(var(--rgb-text),0.4)]');
    html = html.replace(/text-white\/80/g, 'text-[color:rgba(var(--rgb-text),0.8)]');
    html = html.replace(/text-white\/30/g, 'text-[color:rgba(var(--rgb-text),0.3)]');
    html = html.replace(/hover:text-white/g, 'hover:text-[color:rgba(var(--rgb-text),1)]');
    html = html.replace(/text-white/g, 'text-[color:rgba(var(--rgb-text),1)]');

    fs.writeFileSync(filePath, html, 'utf8');
}

processCss('style.css');
processHtml('index.html');
console.log('Refactoring done.');
