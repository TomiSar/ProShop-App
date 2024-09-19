import fs from 'fs';
import path from 'path';

function fixModuleImports(directoryPath) {
  const dirFiles = fs.readdirSync(directoryPath);
  dirFiles.forEach((file) => {
    const absolutePath = path.join(directoryPath, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      fixModuleImports(absolutePath);
    } else if (absolutePath.endsWith('.js')) {
      let content = fs.readFileSync(absolutePath, 'utf8');

      // Regex to add .js extension to relative imports only (exclude npm packages)
      content = content.replace(/(?<=from\s+['"])(\.[^'"]*)(?=['"])/g, '$1.js');
      content = content.replace(
        /(?<=import\s+['"])(\.[^'"]*)(?=['"])/g,
        '$1.js'
      );

      fs.writeFileSync(absolutePath, content, 'utf8');
    }
  });
}

// Specify the output directory
const outputDirPath = path.resolve('backend/dist');
fixModuleImports(outputDirPath);
