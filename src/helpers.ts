function parseComponentName(componentName: string) {
  componentName =
    componentName?.trim().charAt(0).toUpperCase() + componentName?.slice(1);
  componentName = componentName.replace(/ /g, "-");
  return { name: componentName, slug: componentName.toLowerCase() };
}

function generateJSXContent(name: string, slug: string) {
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

function generateTestContent(name: string) {
  const content = [
    `import * as React from "react";\n`,

    `import { render, screen } from "test-utils";`,
    `import userEvent from "@testing-library/user-event";\n`,
    `import ${name} from "./${name}";\n`,

    `test("counter increments and decrements when the buttons are clicked", async () => {`,
    `   render(<${name} />);\n`,
    `   const buttonChangeTitle = screen.getByRole("button", { name: /change title/i });`,
    `   const title = screen.getByText(/TITLE/i);`,
    `   expect(title).toBeInTheDocument();`,
    `   userEvent.click(buttonChangeTitle);`,
    `   expect(title).toHaveTextContent("TITLE 1");`,
    `});`
  ];

  return content.join("\n");
}

export { parseComponentName, generateJSXContent, generateTestContent };
