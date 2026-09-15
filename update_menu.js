const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

const cssRegex = /(\.mobile-menu-btn\s*\{[\s\S]*?body\.menu-open\s*\{[^}]*\})/;
const htmlRegex = /(<div class="mobile-menu-overlay"[\s\S]*?<\/nav>)/;
const jsRegex = /(\/\/\s*Mobile Menu migliorato[\s\S]*?)(?=\/\/\s*Feature Modal Functionality|\/\/\s*Gestione Modale dei Servizi|\/\/\s*Gestione Modale Camere)/;

const cssMatch = indexContent.match(cssRegex);
const htmlMatch = indexContent.match(htmlRegex);
const jsMatch = indexContent.match(jsRegex);

const newCss = cssMatch[1];
const newHtml = htmlMatch[1];
const newJs = jsMatch[1].trim() + "\n\n        "; 

const overrideStyle = `\n    <!-- Mobile Menu Override -->\n    <style>\n        ${newCss}\n    </style>\n`;

const filesToUpdate = [
    'camere.html',
    'tour.html',
    'servizi.html',
    'galleria.html',
    'contatti.html',
    'informazioni.html',
    'prenota.html',
    'Dolce-Lagunahtml-main/index.html'
];

filesToUpdate.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Inject CSS before </head>
    if (!content.includes('<!-- Mobile Menu Override -->')) {
        content = content.replace('</head>', overrideStyle + '</head>');
    }
    
    // 2. Replace HTML
    const oldHtmlRegex = /(<div class="mobile-menu-overlay"[\s\S]*?<\/nav>)/;
    if (oldHtmlRegex.test(content)) {
        let localizedHtml = newHtml;
        localizedHtml = localizedHtml.replace(/class="active"/g, '');
        const filename = path.basename(file);
        if (filename === 'index.html') {
            localizedHtml = localizedHtml.replace(/(href="index\.html")/, '$1 class="active"');
        } else {
            localizedHtml = localizedHtml.replace(new RegExp(`(href="${filename}")`), '$1 class="active"');
        }
        content = content.replace(oldHtmlRegex, localizedHtml);
    }
    
    // 3. Replace JS
    const oldJsRegex = /(\/\/\s*Mobile Menu[\s\S]*?)(?=\/\/\s*Feature Modal|\/\/\s*Gestione Modale|\/\/\s*.*Modal|\/\/\s*Slider|\/\/\s*Form|\/\/\s*Gallery|<\/script>)/;
    if (oldJsRegex.test(content)) {
        content = content.replace(oldJsRegex, newJs);
    } else {
        const genericJsRegex = /(const mobileMenuBtn = document\.querySelector\('\.mobile-menu-btn'\);[\s\S]*?)(?=\/\/\s*|\n\s*<\/script>)/;
        if (genericJsRegex.test(content)) {
            content = content.replace(genericJsRegex, newJs);
        }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${file}`);
});
