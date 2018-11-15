/**
 * `react-testing-library` mounts the components in a virtual `<body>`.
 * When you do multiple tests, all the components remain mounted.
 * With this import, after each test the library will unmount everything, so we don't
 * have to do it ourselves
 */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

/**
 * We have to do this because Material-UI's tooltip uses `document.createRange` and we
 * don't have that in jest
 */
if ('document' in global) {
  document.createRange = jest.fn(() => ({
    setStart: jest.fn(),
    setEnd: jest.fn(),
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  }));
}
