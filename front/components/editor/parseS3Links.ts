import { Text } from 'slate';

export function parseS3Links(node) {
  if (Text.isText(node)) {
    return;
  }

  if (node.type === 'image') {
    return node.url;
  }

  const children = node.children
    ? node.children.filter((p) => p.children).map((n) => parseS3Links(n))
    : [];

  return children.map((child) => {
    if (child.type === 'image') {
      return node.url;
    }
    return '';
  });
}
