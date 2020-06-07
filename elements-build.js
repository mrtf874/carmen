const fs = require('fs-extra');  
const concat = require('concat');

(async function build() {
    const files = [
        './dist/cegApp/runtime.js',
        './dist/cegApp/polyfills-es5.js',
        './dist/cegApp/polyfills.js',
        './dist/cegApp/scripts.js',
        './dist/cegApp/main.js'
    ];

    await fs.ensureDir('elements');
    await concat(files, 'elements/ceg-element.js');
    await fs.copyFile(
        './dist/cegApp/styles.css',
        'elements/styles.css'
    );
})();
