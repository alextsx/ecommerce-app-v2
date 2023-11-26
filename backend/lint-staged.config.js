module.exports = {
  // This will check TypeScript and JavaScript files
  '**/*.(js|ts)': () => 'npx tsc --noEmit',

  // This will lint and format TypeScript and JavaScript files
  '**/*.(js|ts)': (filenames) => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`
  ],

  // This will format JSON and Markdown files
  '**/*.(json|md)': (filenames) => `npx prettier --write ${filenames.join(' ')}`
};
