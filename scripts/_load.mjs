// Loads project .ts data files in plain node (no build): used by check scripts. Needs typescript (TS_PATH or node_modules).
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import path from 'node:path'
const require = createRequire(import.meta.url)
let ts
try { ts = require('typescript') } catch { ts = require(path.join(process.env.TS_PATH || '', 'typescript')) }
const Module = require('node:module'); const root = process.cwd()
require.extensions['.ts'] = (m, file) => m._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText, file)
const orig = Module._resolveFilename
Module._resolveFilename = function (req, ...a) { return orig.call(this, req.startsWith('@/') ? path.join(root, req.slice(2)) : req, ...a) }
export const L = n => require(path.join(root, n))
