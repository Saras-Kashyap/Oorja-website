/**
 * Push Oorja website repository to GitHub using isomorphic-git
 * Usage: node push_to_github.js <YOUR_GITHUB_TOKEN>
 */
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');

const token = process.argv[2] || process.env.GITHUB_TOKEN;

if (!token) {
  console.error('\nPlease provide your GitHub Personal Access Token:');
  console.error('Usage: node push_to_github.js <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>\n');
  process.exit(1);
}

async function push() {
  console.log('Pushing to https://github.com/Saras-Kashyap/Oorja-website.git on branch main...');
  try {
    const res = await git.push({
      fs,
      http,
      dir: '.',
      remote: 'origin',
      ref: 'main',
      onAuth: () => ({ username: token }),
    });
    console.log('Successfully pushed to GitHub!');
    console.log(res);
  } catch (err) {
    console.error('Push failed:', err.message);
    if (err.data) console.error(err.data);
  }
}

push();
