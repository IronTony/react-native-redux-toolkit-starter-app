// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  orange: '\x1b[38;5;208m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue} ✨ ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green} ✅ ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow} ⚠️ ${colors.reset} ${msg}`),
  step: (msg) =>
    console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red} ❌ ${colors.reset} ${msg}`),
};

function displayBanner() {
  console.log('\n');
  console.log(
    `${colors.blue}${colors.bright}           ****             ****              ${colors.yellow}${colors.bright}██╗   ██╗ ██████╗ ██╗  ████████╗██████╗ ███╗   ██╗`
  );
  console.log(
    `${colors.blue}         *********       *********            ${colors.yellow}${colors.bright}██║   ██║██╔═══██╗██║  ╚══██╔══╝██╔══██╗████╗  ██║`
  );
  console.log(
    `${colors.blue}         **      **** ****      **            \x1b[38;5;220m██║   ██║██║   ██║██║     ██║   ██████╔╝██╔██╗ ██║`
  );
  console.log(
    `${colors.blue}        **         *****         **           \x1b[38;5;214m╚██╗ ██╔╝██║   ██║██║     ██║   ██╔══██╗██║╚██╗██║`
  );
  console.log(
    `${colors.blue}        **         *****         **           \x1b[38;5;214m ╚████╔╝ ╚██████╔╝███████╗██║   ██║  ██║██║ ╚████║`
  );
  console.log(
    `${colors.blue}         **       **   **       **            ${colors.orange}  ╚═══╝   ╚═════╝ ╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`
  );
  console.log(`${colors.blue}         **  *****************  **            `);
  console.log(
    `${colors.blue}       ***********       ***********          ${colors.orange}███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗ `
  );
  console.log(
    `${colors.blue}   *****  **  ***         ***  **  *****      ${colors.orange}██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗`
  );
  console.log(
    `${colors.blue} ***      *****    *****   ******      ***    ${colors.orange}███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝`
  );
  console.log(
    `${colors.blue}***        ****   *******   ****        ***   \x1b[38;5;202m╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗`
  );
  console.log(
    `${colors.blue}**         ***    *******    ***         **   \x1b[38;5;202m███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║`
  );
  console.log(
    `${colors.blue} ***       ****   *******   ****       ***    \x1b[38;5;202m╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`
  );
  console.log(`${colors.blue}   ****   **  **           **  **   ****      `);
  console.log(
    `${colors.blue}     ********  **         **  *******         \x1b[38;5;202m █████╗ ██████╗ ██████╗ `
  );
  console.log(
    `${colors.blue}         *************************            \x1b[38;5;208m██╔══██╗██╔══██╗██╔══██╗`
  );
  console.log(
    `${colors.blue}         **      ***   ***      **            \x1b[38;5;208m███████║██████╔╝██████╔╝`
  );
  console.log(
    `${colors.blue}        **         ** **         **           \x1b[38;5;208m██╔══██║██╔═══╝ ██╔═══╝ `
  );
  console.log(
    `${colors.blue}        **          ***          **           \x1b[38;5;208m██║  ██║██║     ██║     `
  );
  console.log(
    `${colors.blue}        ***       *** ***       ***           \x1b[38;5;208m╚═╝  ╚═╝╚═╝     ╚═╝     `
  );
  console.log(`${colors.blue}         ***   ****     ****   ***            `);
  console.log(`${colors.blue}           *****           *****              `);
  console.log(`${colors.reset}`);
  console.log('');
  console.log(
    `${colors.cyan}${colors.bright}          🚀  React Native TypeScript Boilerplate Generator  🚀`
  );
  console.log(`${colors.reset}`);
  console.log('');
}

module.exports = {
  colors,
  log,
  displayBanner,
};
