var AOEFeaturizer = require('./featurizer');
if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('AOEFeaturizer', function () { return AOEFeaturizer; });
} else {
    global.window.AOEFeaturizer = AOEFeaturizer;
}