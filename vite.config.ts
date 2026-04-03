import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import reactNativeWeb from 'vite-plugin-react-native-web';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      reactNativeWeb(),
      react(),
      tailwindcss(),
      {
        name: 'transform-assets-registry',
        async transform(code, id) {
          if (id.includes('@react-native/assets-registry/registry.js') || id.includes('expo-linear-gradient/build/') || id.includes('expo-blur/build/') || id.includes('expo-av/build/')) {
            const result = await transformWithEsbuild(code, id, { loader: 'tsx' });
            return result;
          }
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      '__DEV__': mode !== 'production',
      'global': 'window',
    },
    resolve: {
      alias: {
        '@react-native/assets-registry/registry': path.resolve(__dirname, './src/utils/assets-registry-mock.js'),
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@navigation': path.resolve(__dirname, './src/navigation'),
        '@screens': path.resolve(__dirname, './src/screens'),
        '@store': path.resolve(__dirname, './src/store'),
        '@theme': path.resolve(__dirname, './src/theme'),
        '@types': path.resolve(__dirname, './src/types'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@constants': path.resolve(__dirname, './src/constants'),
      },
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.jsx',
        '.web.js',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
      ],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
        resolveExtensions: [
          '.web.tsx',
          '.web.ts',
          '.web.jsx',
          '.web.js',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
        ],
      },
      include: [
        'react-native-web',
        'react-native-reanimated',
        'react-native-gesture-handler',
        'react-native-svg',
        'lucide-react-native',
        'react-native-safe-area-context',
        'react-native-screens',
        'expo-linear-gradient',
        '@react-native/assets-registry/registry',
      ],
    },
    esbuild: {
      loader: 'tsx',
      include: /node_modules\/.*\.js$|\.(ts|tsx|js|jsx)$/,
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
