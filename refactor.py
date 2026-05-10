import re

def process_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        css = f.read()

    # Define variables in :root
    root_vars = '''
  --rgb-text: 255, 255, 255;
  --rgb-bg: 0, 0, 0;
  --input-color: #ffffff;
  --card-bg-start: #2a2f45;
  --card-bg-end: #1c1f2e;
  --blackboard-bg: #1e222b;
  --fab-bg: rgba(15, 18, 25, 0.88);
'''
    light_vars = '''
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
'''
    # Add variables to :root
    css = css.replace('--unassigned-bg: #2a2e3a;', '--unassigned-bg: #2a2e3a;' + root_vars)
    css = css.replace('}\n\nbody {', '}\n' + light_vars + '\nbody {')

    # Replace hardcoded rgb values
    css = re.sub(r'rgba\(\s*255\s*,\s*255\s*,\s*255\s*,', r'rgba(var(--rgb-text),', css)
    css = re.sub(r'rgba\(\s*0\s*,\s*0\s*,\s*0\s*,', r'rgba(var(--rgb-bg),', css)
    
    css = css.replace('color: #ffffff !important;', 'color: var(--input-color) !important;')
    css = css.replace('background: linear-gradient(to bottom, #2a2f45, #1c1f2e);', 'background: linear-gradient(to bottom, var(--card-bg-start), var(--card-bg-end));')
    css = css.replace('background: #1e222b;', 'background: var(--blackboard-bg);')
    css = css.replace('background: rgba(15, 18, 25, 0.88);', 'background: var(--fab-bg);')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(css)

def process_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Change inline styles to css variables
    html = html.replace('style="background: rgba(13, 15, 21, 0.95); border-bottom: 1px solid var(--border);"', 'style="background: var(--surface); border-bottom: 1px solid var(--border);"')
    html = html.replace('style="background: rgba(0,0,0,0.15);"', 'style="background: rgba(var(--rgb-bg), 0.15);"')
    html = html.replace('rgba(255,255,255,', 'rgba(var(--rgb-text),')
    
    # Add light mode button next to title
    button_html = '''
        <button id="themeToggleBtn" class="p-2 hover:bg-black/10 rounded-lg transition-colors" title="테마 변경">
          <i data-lucide="sun" class="w-5 h-5 hidden" id="iconSun"></i>
          <i data-lucide="moon" class="w-5 h-5" id="iconMoon"></i>
        </button>
'''
    html = html.replace('<div class="layout-manager-group">', button_html + '\n      <div class="layout-manager-group">')
    
    # fix hover:text-white and text-white to be more generic, or just text-[var(--text)]
    html = html.replace('text-white/70', 'text-[color:rgba(var(--rgb-text),0.7)]')
    html = html.replace('text-white/40', 'text-[color:rgba(var(--rgb-text),0.4)]')
    html = html.replace('text-white/80', 'text-[color:rgba(var(--rgb-text),0.8)]')
    html = html.replace('text-white/30', 'text-[color:rgba(var(--rgb-text),0.3)]')
    html = html.replace('hover:text-white', 'hover:text-[color:rgba(var(--rgb-text),1)]')
    html = html.replace('text-white', 'text-[color:rgba(var(--rgb-text),1)]')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

process_css('style.css')
process_html('index.html')
