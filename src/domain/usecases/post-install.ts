import { execSync } from 'child_process';

interface PostInstallStep {
  label: string;
  command: string;
}

const POST_INSTALL_STEPS: PostInstallStep[] = [
  { label: 'Installing dependencies', command: 'npm install --silent' },
  { label: 'Initializing git', command: 'git init -q' },
  { label: 'Staging files', command: 'git add .' },
  { label: 'Creating initial commit', command: 'git commit -q -m "Initial commit from react-creator"' },
];

export const runPostInstall = (projectPath: string): void => {
  for (const step of POST_INSTALL_STEPS) {
    execSync(step.command, {
      cwd: projectPath,
      stdio: 'pipe',
    });
  }
};

export { POST_INSTALL_STEPS };
