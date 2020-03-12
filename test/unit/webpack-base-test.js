const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');

  // console.log('--------------------------------------------------------------------------------');
  // console.log('baseConfig', baseConfig);
  // console.log('--------------------------------------------------------------------------------');

  it('entry', () => {
    assert.equal(baseConfig.entry.index, '/Users/kin/Documents/workspace/PersonalProject/builder-webpack-react-cli/test/smoke/template/src/index.js');
  });
});
