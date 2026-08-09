import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const sourceDir = path.resolve('../LauraBrowStudio');
const designSystemDir = path.resolve('../LauraBrowStudio Design System');
const destDir = path.resolve('.');

console.log('Copying components...');
copyDir(path.join(sourceDir, 'src/components'), path.join(destDir, 'src/components'));

console.log('Copying lib...');
copyDir(path.join(sourceDir, 'src/lib'), path.join(destDir, 'src/lib'));

console.log('Copying hooks...');
copyDir(path.join(sourceDir, 'src/hooks'), path.join(destDir, 'src/hooks'));

console.log('Copying assets from original project...');
if (fs.existsSync(path.join(sourceDir, 'src/assets'))) {
    copyDir(path.join(sourceDir, 'src/assets'), path.join(destDir, 'src/assets'));
}

console.log('Copying HIGH QUALITY assets from Design System...');
if (fs.existsSync(path.join(designSystemDir, 'assets'))) {
    // Flatten the assets (images, logos) directly into src/assets
    const dsAssets = path.join(designSystemDir, 'assets');
    const destAssets = path.join(destDir, 'src/assets');
    
    // Copy top level
    copyDir(dsAssets, destAssets);
    
    // Flatten logos
    if (fs.existsSync(path.join(dsAssets, 'logos'))) {
        let logos = fs.readdirSync(path.join(dsAssets, 'logos'), { withFileTypes: true });
        for (let entry of logos) {
            if (!entry.isDirectory()) {
                fs.copyFileSync(path.join(dsAssets, 'logos', entry.name), path.join(destAssets, entry.name));
            }
        }
    }
    
    // Flatten images
    if (fs.existsSync(path.join(dsAssets, 'images'))) {
        let images = fs.readdirSync(path.join(dsAssets, 'images'), { withFileTypes: true });
        for (let entry of images) {
            if (!entry.isDirectory()) {
                fs.copyFileSync(path.join(dsAssets, 'images', entry.name), path.join(destAssets, entry.name));
            }
        }
    }
}

console.log('Copying public folder from original project...');
if (fs.existsSync(path.join(sourceDir, 'public'))) {
    copyDir(path.join(sourceDir, 'public'), path.join(destDir, 'public'));
}

console.log('Copying components.json...');
if (fs.existsSync(path.join(sourceDir, 'components.json'))) {
    fs.copyFileSync(path.join(sourceDir, 'components.json'), path.join(destDir, 'components.json'));
}

console.log('Migration of source files complete!');
