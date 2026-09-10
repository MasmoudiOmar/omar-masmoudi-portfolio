import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Serves the Cloudflare Pages Function at /api/chat during `vite dev`, by
 * reusing the exact handler that runs in production. The API key is read here
 * in the Node process and never reaches the client bundle.
 */
const chatApiDevServer = (apiKey: string): Plugin => ({
  name: 'chat-api-dev-server',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        return res.end('Method Not Allowed');
      }

      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);

        const { onRequestPost } = await server.ssrLoadModule('/functions/api/chat.ts');

        const response: Response = await onRequestPost({
          request: new Request('http://localhost/api/chat', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: Buffer.concat(chunks),
          }),
          env: { GEMINI_API_KEY: apiKey },
          params: {},
          waitUntil: () => {},
        });

        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      } catch (error) {
        server.config.logger.error(`/api/chat failed: ${error}`);
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ error: 'The assistant failed locally. See the dev server logs.' }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), chatApiDevServer(env.GEMINI_API_KEY)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
