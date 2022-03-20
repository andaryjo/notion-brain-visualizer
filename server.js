"use strict";

const { Client } = require('@notionhq/client');
const hapi = require("@hapi/hapi");

async function startServer() {

    const server = hapi.server({
        port: 8080,
        host: "localhost",
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: "GET",
        path: "/",
        options: {
            cors: true,
        },
        handler: async (request, h) => {
            return h.file('./index.html');
        }
    });

    server.route({
        method: "GET",
        path: "/graph",
        options: {
            cors: true,
        },
        handler: async (request, h) => {
            return h.file('./graph.html');
        }
    });

    server.route({
        method: "GET",
        path: "/proxy/search",
        options: {
            cors: true,
        },
        handler: async (request, h) => {
            const client = new Client({ auth: request.headers["authorization"].replace("Bearer ", "") });
            try {
                const results = await client.search({
                    start_cursor: request.query.start_cursor
                });
                return h.response(results);;
            } catch (err) {
                return h.response(err.code).code(err.status);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/proxy/blocks/{id}/children",
        options: {
            cors: true,
        },
        handler: async (request, h) => {
            const client = new Client({ auth: request.headers["authorization"].replace("Bearer ", "") });
            try {
                const results = await client.blocks.children.list({
                    block_id: request.params.id,
                    start_cursor: request.query.start_cursor
                });
                return h.response(results);
            } catch (err) {
                return h.response(err.code).code(err.status);
            }
        }
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);

}

startServer();
