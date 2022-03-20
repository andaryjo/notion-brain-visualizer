# Notion Brain Visualizer

The Notion Brain Visualizer lets you visualize your [Notion.so](https://notion.so) workspace as an undirected graph. Each node in the graph represents a page, and each edge in the network means that these pages have a relation of either type subpage or mention.

This tool uses the official [Notion API](https://developers.notion.com/) to query pages of your workspace. It does this in a recursive behavior, where each newly found page will be added as new node to the graph.

## Screenshots

![Screenshots](https://gitlab.com/andary/ideas/uploads/bf0a805e3768655d93563c1073fecf97/notion-brain-screenshots.png)

## Technology Stack

The repository contains a [Node.js}(https://nodejs.org/en/) application running [Hapi](https://hapi.dev/) webserver. This server serves the static HTML files for the web application and proxies the API call to the Notion API. **The sigle purpose of the webserver is to act as proxy**, because the Notion API's Cross-Origin Resource Sharing policies do not allow API requests directly out of the browser. However, all required business logic is contained in the client-side web application, so if the Notion team ever were to change their minds on this, the web application could be used standalone.

The web application uses [vis.js](https://visjs.org/) to render the graph.

## Set up

1. [Create a Notion integration](https://developers.notion.com/docs/getting-started#step-1-create-an-integration) and give it read access to your workspace. Note that this also requires you to share your pages with the integration's technical user.
2. Clone this repository and run `npm install` to install the dependencies.
3. Run `npm start` to start the webserver. You can access it at `http://localhost:8080`.
