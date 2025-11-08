const fs = require('fs');
const path = require('path');

/**
 * This script safely merges package-additions.json into package.json
 * Usage: node merge-package-json.js
 */

const packageJsonPath = path.join(__dirname, 'package.json');
const additionsPath = path.join(__dirname, 'package-additions.json');

try {
  // Read both files
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const additions = JSON.parse(fs.readFileSync(additionsPath, 'utf8'));

  // Merge scripts
  if (additions.scripts) {
    packageJson.scripts = {
      ...packageJson.scripts,
      ...additions.scripts,
    };
  }

  // Merge dependencies
  if (additions.dependencies) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...additions.dependencies,
    };
  }

  // Merge devDependencies
  if (additions.devDependencies) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...additions.devDependencies,
    };
  }

  // Write back to package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf8'
  );

  console.log('✅ Successfully merged package-additions.json into package.json');
  console.log('📦 Run "npm install" to install new dependencies');
} catch (error) {
  console.error('❌ Error merging packages:', error.message);
  process.exit(1);
}
