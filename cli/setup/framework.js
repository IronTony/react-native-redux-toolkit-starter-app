const { executeCommand } = require('../utils/commands');
const { log } = require('../utils/logger');

function createProject(projectName, isExpo) {
  log.step(
    `Creating ${isExpo ? 'Expo' : 'React Native'} TypeScript project...`
  );
  if (isExpo) {
    executeCommand(
      `npx create-expo-app@latest ${projectName} --template blank-typescript`
    );
  } else {
    executeCommand(
      `npx @react-native-community/cli@latest init ${projectName}`
    );
  }
}

function installIOSDependencies(projectPath) {
  const path = require('path');
  const fs = require('fs');

  log.step('Installing iOS dependencies...');
  try {
    const iosPath = path.join(projectPath, 'ios');
    if (fs.existsSync(iosPath)) {
      log.info('Running pod install (this may take a few minutes)...');
      executeCommand('cd ios && pod install && cd ..', { cwd: projectPath });
      log.success('iOS dependencies installed');
    }
  } catch (error) {
    log.warning(
      'Failed to run pod install. Please run "cd ios && pod install" manually before running on iOS.'
    );
  }
}

module.exports = {
  createProject,
  installIOSDependencies,
};
