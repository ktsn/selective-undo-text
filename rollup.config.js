const pkg = require('./package.json')

module.exports = {
  entry: 'lib/index.js',
  dest: 'dist/selective-undo-text.js',
  format: 'umd',
  moduleName: 'SelectiveUndoText',
  banner: `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 *
 * @license
 * Copyright (c) 2016 ${pkg.author}
 * Released under the MIT license
 * ${pkg.homepage}/blob/master/LICENSE
 */`
}