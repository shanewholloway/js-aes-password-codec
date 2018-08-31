import pkg from './package.json'
import rpi_jsy from 'rollup-plugin-jsy-lite'
import { terser as rpi_terser } from 'rollup-plugin-terser'

const sourcemap = 'inline'
const plugins = [rpi_jsy()]
const plugins_min = plugins.concat([ rpi_terser({}) ])

export default [
  { input: `code/index.nodejs.jsy`, plugins,
    output: [
      { file: pkg.main, format: 'cjs', exports:'default', sourcemap },
      { file: pkg.module, format: 'es', sourcemap }, ]},

  { input: `code/index.web.jsy`, plugins,
    output: { file: pkg.browser.replace('.min.js','.dbg.js'), format: 'umd', name: pkg.name, exports:'default', sourcemap } },

  { input: `code/index.web.jsy`, plugins: plugins_min,
    output: { file: pkg.browser, format: 'umd', name: pkg.name, exports:'default' } },

  { input: `test/unittest.jsy`, context: 'window', plugins,
    output: { file: 'test/__unittest.iife.js', format: 'iife', name: `test_${pkg.name}`, sourcemap } },

  { input: `test/unittest.jsy`, plugins,
    output: { file: 'test/__unittest.cjs.js', format: 'cjs', sourcemap } },

].filter(Boolean)
