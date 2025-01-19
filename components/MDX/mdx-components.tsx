import * as runtime from "react/jsx-runtime";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { Callout } from "../Custom/Callout";
import { ExternalLink } from "../Custom/ExternalLink";
import { Image } from "../Custom/Image";
import { Step } from "../Custom/Step";
import { Tabs } from "../Custom/Tabs";
import { Note } from "../Custom/Note";
import Pre from "../Custom/Pre";
import { JSX, ClassAttributes, HTMLAttributes } from "react";

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
  a: ExternalLink,
  Step,
  Tabs,
  Note,
  pre: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLPreElement> &
      HTMLAttributes<HTMLPreElement>
  ) => <Pre {...props} />,
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
