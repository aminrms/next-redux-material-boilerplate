import React from "react";
import { Metadata, type NextPage } from "next";
import { SxProps } from "@mui/material";
import { FastFieldProps } from "formik";

export type NextPageComponent<T> = NextPage<T>;
export type metaDataProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
};

export type generateMetadataProps = ({
  searchParams,
  params,
}: metaDataProps) => Metadata;

export interface NextPageProps<T = Record<string, string>> {
  params: T;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export type SxCssProperties = Record<string, SxProps>;
export type CssProps = Record<string, React.CSSProperties>;

export type FormFields = {
  name: string;
  value?: string | number | undefined;
  onChange?: () => void;
  label: string;
  id: string;
  type?: string | "text";
  fieldType?: "textField" | "select" | "checkbox" | "radio";
  selectOptions?: { label: string; value: string }[];
}[];

export type FormField = {
  name: string;
  label: string;
  value?: string | number | undefined;
  onChange?: () => void;
  type?: string;
  id?: string;
  fieldType?: "textField" | "select" | "checkbox" | "radio";
  selectOptions?: { label: string; value: string }[];
};
export interface fieldInterface extends FastFieldProps {
  item: FormField;
  onReduxChange?: (any: any) => void;
}

export type fieldTypeOfObj = Record<
  "textField" | "radio" | "checkbox" | "select",
  React.JSX.Element
>;
