import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  // Custom per tutte le pagine
  {
    input: 'src/js-marquee.js',
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