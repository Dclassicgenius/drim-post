import * as runtime from "react/jsx-runtime";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { Callout } from "../Custom/Callout";
import { CodeBlock } from "../Custom/Codeblock";
import { ExternalLink } from "../Custom/ExternalLink";
import { Image } from "../Custom/Image";
import { Step } from "../Custom/Step";
import { Tabs } from "../Custom/Tabs";
import { Note } from "../Custom/Note";
import { TableOfContents } from "../Custom/TableOfContents";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return {
    Component: fn({ ...runtime }).default,

    TableOfContents: fn({ ...runtime }).toc as Toc,
  };
};

const components = {
  Image,
  Callout,
  CodeBlock,
  ExternalLink,
  Step,
  Tabs,
  Note,
  TableOfContents,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const { Component } = useMDXComponent(code);
  return <Component components={components} />;
}

export function MDXToC({ code }: MdxProps) {
  const { TableOfContents } = useMDXComponent(code);

  return TableOfContents;
}
