import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';

export default [
  // Custom per tutte le pagine
  {
    input: 'src/vanilla-marquee.js',
    output: [{
      plugins: [
        terser({
          mangle: {
            properties: {
              regex: /^_*/,
              reserved: [
                'css3easing',
                'delayBeforeStart',
                'direction',
                'duplicated',
                'duration',
                'gap',
                'pauseOnHover',
                'recalcResize',
                'speed',
                'startVisible',
              ]
            },
          },
        }),
      ],
      dir:            'dist/',
      format:         'es',
      indent:         false,
      entryFileNames: '[name].min.js',
    }, {
      dir:            'dist/',
      format:         'es',
      indent:         false,
      entryFileNames: '[name].js',
    }],
    context: 'window',
    plugins: [
      eslint(),
      resolve({
        browser:        true,
        modules:        true,
        preferBuiltins: false,
      }),
      commonjs({
        include: [
          /node_modules/,
        ], // Default: undefined
        sourceMap: false,
      }),
    ],
  },
];