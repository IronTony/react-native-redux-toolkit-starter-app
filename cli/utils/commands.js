const { execSync } = require('child_process');

function executeCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    throw error;
  }
}

module.exports = {
  executeCommand,
};
