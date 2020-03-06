function generateMarkdown(data) {
  return `
<img src = '${data.avatar_url}'>

${data.email}

## ${data.title}

# ${data.description}

# ${data.tableOfContent}

# ${data.installation}

# ${data.usage}

# ${data.license}

# ${data.contributing}

# ${data.tests}

# ${data.questions}
`;
}

module.exports = generateMarkdown;
