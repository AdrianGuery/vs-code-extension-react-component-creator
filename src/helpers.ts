function parseComponentName(componentName: string) {
  componentName =
    componentName?.trim().charAt(0).toUpperCase() + componentName?.slice(1);
  componentName = componentName.replace(/ /g, "-");
  return { name: componentName, slug: componentName.toLowerCase() };
}

function generateContent(name: string, slug: string) {
  const content = [
    `import React from "react";\n`,

    `// eslint-disable-next-line css-modules/no-unused-class`,
    `import css from "./${name}.module.scss"\n`,

    `interface PropTypes{\n  prop1: string\n}`,

    `const ${name} = ({ prop1, ...rest }: PropTypes) => {`,
    `   return (`,
    `     <div className={css.root}>\n`,
    `       {/* To complete */}\n`,
    `       {/* To complete */}\n`,
    `     </div>`,
    `   )`,
    `} \n`,
    `export default ${name}\n`,
  ];

  return content.join("\n");
}

export { parseComponentName, generateContent };
