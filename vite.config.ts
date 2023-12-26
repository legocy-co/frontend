import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'https:/site.legocy.online',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        '/api': {
          target: process.env.VITE_API_ENDPOINT,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  });
};
