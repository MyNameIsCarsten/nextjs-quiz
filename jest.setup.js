require('@babel/polyfill');
const { configure } = require('@testing-library/dom');
configure({ testIdAttribute: 'data-testid' });
require('@testing-library/jest-dom');