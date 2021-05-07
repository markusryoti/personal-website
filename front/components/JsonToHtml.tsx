export const renderJsonToHtml = (props) => {
  switch (props.element.type) {
    case 'h1':
      return <h1>{props.children}</h1>;
    case 'h2':
      return <h2>{props.children}</h2>;
    case 'h3':
      return <h3>{props.children}</h3>;
    case 'h4':
      return <h4>{props.children}</h4>;
    case 'h5':
      return <h5>{props.children}</h5>;
    case 'h6':
      return <h6>{props.children}</h6>;
    case 'code':
      return <CodeElement {...props} />;
    case 'bold':
      return <strong>{props.children}</strong>;
    case 'italic':
      return <em>{props.children}</em>;
    case 'quote':
      return <blockquote>{props.children}</blockquote>;
    case 'ordered-list':
      return <ol {...props.attributes}>{props.children}</ol>;
    case 'list-item':
      return <li {...props.attributes}>{props.children}</li>;
    default:
      return <DefaultElement {...props} />;
  }
};

export const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
      }}
    >
      {props.children}
    </span>
  );
};
