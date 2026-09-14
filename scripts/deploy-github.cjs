const { execSync } = require('child_process');
const path = require('path');

const rootDir = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\PaneventzFRepl';

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  try {
    return execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
  } catch (err) {
    console.error(`Command failed: ${cmd}`);
    throw err;
  }
}

try {
  console.log('==================================================');
  console.log('🚀 AUTOMATED GITHUB & HOSTINGER DEPLOYMENT');
  console.log('==================================================');

  // 1. Build
  console.log('\n[1/4] Building production assets...');
  run('npm.cmd run build');

  // 2. Commit working branch
  console.log('\n[2/4] Staging and committing changes...');
  run('git add .');
  try {
    run('git commit -m "feat: auto-deployment update"');
  } catch (e) {
    console.log('No new changes to commit, proceeding to push...');
  }

  // 3. Push to ultra-luxury-redesign
  console.log('\n[3/4] Pushing to GitHub (ultra-luxury-redesign)...');
  run('git push origin ultra-luxury-redesign');

  // 4. Merge to main and push to main
  console.log('\n[4/4] Syncing and pushing to GitHub (main)...');
  run('git checkout main');
  run('git merge ultra-luxury-redesign');
  run('git push origin main');
  run('git checkout ultra-luxury-redesign');

  console.log('\n==================================================');
  console.log('✅ ALL CHANGES PUSHED TO GITHUB (main & ultra-luxury-redesign)!');
  console.log('Hostinger will automatically deploy the latest live version.');
  console.log('==================================================\n');
} catch (err) {
  console.error('Deployment failed:', err.message);
  process.exit(1);
}
