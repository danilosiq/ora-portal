import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const errors = [];
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const reservedNames = new Set(['src/app/page.tsx', 'src/app/layout.tsx']);
for (const file of files(sourceRoot)) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (!reservedNames.has(relative) && !/^[A-Z][A-Za-z0-9]*$/.test(path.parse(file).name)) {
    errors.push(`${relative}: nome de arquivo deve usar PascalCase`);
  }
}
for (const file of files(sourceRoot)) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (/\.(css|scss|sass|less)$/.test(file) && relative !== 'src/core/styles/Globals.css') {
    errors.push(`${relative}: use utilitários Tailwind; somente a entrada global é permitida`);
  }
}
const sourceFiles = files(sourceRoot).filter((file) => /\.tsx?$/.test(file));
for (const file of sourceFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const text = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  if (text.includes('@/src/')) errors.push(`${relative}: alias deve partir de @/`);
  if (/\bconsole\.log\s*\(/.test(text)) errors.push(`${relative}: console.log em código final`);
  if (/\b(?:hover:)?(?:bg|text|border|ring)-orange-\d+/.test(text)) {
    errors.push(`${relative}: use os tokens primary, primary-hover e primary-light`);
  }
  const isHook = relative.includes('/hooks/');
  function visit(node) {
    if (ts.isJsxAttribute(node) && node.name.getText(source) === 'style') {
      errors.push(`${relative}: estilos inline não são permitidos; use Tailwind`);
    }
    if (isHook && (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node))) {
      errors.push(`${relative}: hooks não podem conter JSX`);
    }
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const imported = node.moduleSpecifier.text;
      if (file.endsWith('.tsx') && /(?:^axios$|\/services(?:\/|$))/.test(imported)) {
        errors.push(`${relative}: componente não pode consumir transporte/services diretamente`);
      }
      if (relative.startsWith('src/core/components/') && imported.includes('/pages/')) {
        errors.push(`${relative}: componente compartilhado depende de uma página`);
      }
      if (relative.startsWith('src/components/ui/') && /\/core\/(pages|mocks)/.test(imported)) {
        errors.push(`${relative}: primitivo shadcn depende de regra de negócio`);
      }
    }
    if (ts.isFunctionDeclaration(node) && /^[A-Z]/.test(node.name?.text ?? '')) {
      const parameter = node.parameters[0];
      if (parameter && ts.isObjectBindingPattern(parameter.name)) {
        if (
          !parameter.type ||
          !ts.isTypeReferenceNode(parameter.type) ||
          !parameter.type.getText(source).endsWith('Props')
        ) {
          errors.push(`${relative}: componente deve usar um tipo nomeado terminado em Props`);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
if (fs.existsSync(path.join(sourceRoot, 'core/components/ui'))) {
  errors.push('Primitivos shadcn devem ficar em src/components/ui');
}
const theme = fs.readFileSync(path.join(sourceRoot, 'core/styles/Globals.css'), 'utf8');
if (/^\s*[.#][a-z_-][\w-]*/im.test(theme)) {
  errors.push(
    'Globals.css deve conter somente setup Tailwind, tokens, defaults globais e keyframes',
  );
}
for (const [name, value] of Object.entries({
  primary: '#FF7A00',
  'primary-hover': '#B25500',
  'primary-light': '#FFEAD6',
})) {
  const actual = theme.match(new RegExp(`--${name}\\s*:\\s*(#[a-f0-9]+)`, 'i'))?.[1];
  if (actual?.toUpperCase() !== value) errors.push(`Token ${name} deve ser ${value}`);
}
if (errors.length) {
  for (const error of errors) process.stderr.write(`${error}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Arquitetura validada em ${sourceFiles.length} arquivos TypeScript.\n`);
}
