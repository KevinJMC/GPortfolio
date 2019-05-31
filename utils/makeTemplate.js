'use strict'

/* | ------------------------------------------------------------------------------------------------
 * | - Generate a basic files/content for new template. -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | How to create: npm run template <name>
 * | Example: npm run template myTemplate
 * |
 */

const variables = require('./helper/variables')
const argv = process.argv.slice(2)
const fs = require('fs')

// Check name of template
if (argv.length !== 1) {
  console.warn('Invalid arguments')
  process.exit(0)
}

/**
 * @var {string}
 */
const name = argv[0]

/**
 * Path to templates
 * @type {string}
 */
const BASE_PATH = variables.ROOT + '/src/template/'

// Check on exists template
if (fs.existsSync(BASE_PATH + name)) {
  console.warn(`[Exists]: ${BASE_PATH + name}`)
  process.exit(0)
}

// Create folder
fs.mkdirSync(BASE_PATH + name)

/*
 * ---------------------------------------------- Create required .js file
 */
fs.writeFileSync(BASE_PATH + name + '/index.js', `'use strict'

import '@src/main'

// Code
`, { encoding: 'utf8' })

/*
 * ---------------------------------------------- Create required .scss file
 */
fs.writeFileSync(BASE_PATH + name + '/index.scss', `// noinspection CssUnknownTarget
@import "@src/main.scss";
`, { encoding: 'utf8' })

/*
 * ---------------------------------------------- Create required .html file
 */
fs.writeFileSync(BASE_PATH + name + '/index.html', `<!DOCTYPE html>
<%
const o = htmlWebpackPlugin.options
const safeQuotes = (str) => str.replace(/"/g, '&quot;')
const url = (path) => \`${o.url}/${path}\`
%>
<html lang="en">
<head>
  <!-- START: Common part -->
  <meta charset="utf-8">
  <title><%= o._profile.name %></title>
  <meta property="og:title" content="Portfolio by <%= o._profile.name %>" />
  <meta property="og:type" content="profile" />
  <meta property="og:image" content="<%= o._profile.avatar_url %>" />
  <meta property="og:url" content="<%= o.url %>" />
  <meta property="og:description" content="<%= o._profile.bio %>" />
  <meta property="profile:username" content="<%= o._profile.login %>" />
  <% for (let [property, content] of Object.entries(o._config.opg)) { %>
  <meta property="<%= property %>" content="<%= content %>" />
  <% } %>
  <!-- END: Common part -->
</head>
<body>

</body>
</html>
`, { encoding: 'utf8' })

/*
 * ---------------------------------------------- Complete
 */
console.log('Complete, path:', BASE_PATH + name)
console.log('Change the template in the config.js file to:', name)
