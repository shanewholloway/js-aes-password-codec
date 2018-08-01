import pkg from './package.json'
import {parse as path_parse} from 'path'
import rpi_jsy from 'rollup-plugin-jsy-babel'
import { terser as rpi_terser } from 'rollup-plugin-terser'

const sourcemap = 'inline'
const plugins = [rpi_jsy()]
const plugins_min = plugins.concat([ rpi_terser({}) ])

export default [

  { input: `code/index.nodejs.jsy`, plugins, external: ['crypto'],
    output: [
      { file: pkg.main, format: 'cjs', exports:'default', sourcemap },
      { file: pkg.module, format: 'es', sourcemap }, ]},

  { input: `code/index.web.jsy`, plugins, external:[],
    output: { file: pkg.browser.replace('.min.js','.dbg.js'), format: 'umd', name: pkg.name, exports:'default', sourcemap } },

  { input: `code/index.web.jsy`, plugins: plugins_min, external:[],
    output: { file: pkg.browser, format: 'umd', name: pkg.name, exports:'default', sourcemap } },

  { input: `test/unittest.jsy`, context: 'window', plugins, external:[],
    output: { file: 'test/__unittest.iife.js', format: 'iife', name: `test_${pkg.name}`, sourcemap } },

  { input: `test/unittest.jsy`, plugins, external:['crypto'],
    output: { file: 'test/__unittest.cjs.js', format: 'cjs', name: `test_${pkg.name}`, sourcemap } },

].filter(Boolean)
