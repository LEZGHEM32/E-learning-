#!/usr/bin/env node
/**
 * merge-package-json.js
 * 
 * Helper script to safely merge package-additions.json into package.json
 * 
 * Usage: node merge-package-json.js
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_PATH = path.join(__dirname, 'package.json');
const ADDITIONS_PATH = path.join(__dirname, 'package-additions.json');

function mergePackages() {
  try {
    // Read existing package.json
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_PATH, 'utf8'));
    
    // Read additions
    const additions = JSON.parse(fs.readFileSync(ADDITIONS_PATH, 'utf8'));
    
    // Merge dependencies
    packageJson.dependencies = {
      ...(packageJson.dependencies || {}),
      ...(additions.dependencies || {})
    };
    
    // Merge devDependencies
    packageJson.devDependencies = {
      ...(packageJson.devDependencies || {}),
      ...(additions.devDependencies || {})
    };
    
    // Merge scripts
    packageJson.scripts = {
      ...(packageJson.scripts || {}),
      ...(additions.scripts || {})
    };
    
    // Add prisma section if exists
    if (additions.prisma) {
      packageJson.prisma = additions.prisma;
    }
    
    // Write back to package.json
    fs.writeFileSync(PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log('✅ Successfully merged package-additions.json into package.json');
    console.log('Run: npm install');
  } catch (error) {
    console.error('❌ Error merging packages:', error.message);
    process.exit(1);
  }
}

mergePackages();
