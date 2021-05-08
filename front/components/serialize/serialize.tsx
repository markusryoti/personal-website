import { Text } from 'slate';
import { CodeElement } from '../JsonToHtml';

function serialize(node) {
  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join('');

  switch (node.type) {
    case 'p':
      return <p dangerouslySetInnerHTML={{ __html: children }}></p>;
    case 'h1':
      return <h1>{children}</h1>;
    case 'h2':
      return <h2>{children}</h2>;
    case 'h3':
      return <h3>{children}</h3>;
    case 'h4':
      return <h4>{children}</h4>;
    case 'h5':
      return <h5>{children}</h5>;
    case 'h6':
      return <h6>{children}</h6>;
    case 'code':
      return <CodeElement {...children} />;
    case 'quote':
      return (
        <blockquote dangerouslySetInnerHTML={{ __html: children }}></blockquote>
      );
    case 'ordered-list':
      return <ol dangerouslySetInnerHTML={{ __html: children }}></ol>;
    case 'bullet-list':
      return <ul dangerouslySetInnerHTML={{ __html: children }}></ul>;
    case 'list-item':
      return `<li>${children}</li>`;
    default:
      return children;
  }
}

export default serialize;
