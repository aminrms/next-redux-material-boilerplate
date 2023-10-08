import { fieldInterface, fieldTypeOfObj } from "@/types/global";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FastField, FastFieldProps } from "formik";
import React from "react";

const FormField = ({ item, onReduxChange }) => {
  return (
    <FastField name={item?.name}>
      {({ field, meta }: FastFieldProps) => {
        return handleFieldDetection({
          meta,
          field,
          item,
          onReduxChange,
        } as fieldInterface);
      }}
    </FastField>
  );
};

const handleFieldDetection = ({
  meta,
  item: { label, id, type, fieldType, selectOptions },
  onReduxChange,
  field: { onChange, ...rest },
}: fieldInterface) => {
  const fieldTypes: fieldTypeOfObj = {
    textField: (
      <FormControl fullWidth>
        <label htmlFor={id}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            {label}
          </Typography>
        </label>
        <TextField
          {...rest}
          onChange={(e) => {
            if (onReduxChange) {
              onReduxChange({ key: rest?.name, value: e.target.value });
            }
            onChange(e);
          }}
          type={type}
          size="medium"
          id={id}
        />
        {meta.touched && (
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            color="error"
            sx={{ mt: 1 }}
          >
            {meta?.error}
          </Typography>
        )}
      </FormControl>
    ),
    checkbox: (
      <FormControl fullWidth>
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              {...rest}
              onChange={(e) => {
                onChange(e);
              }}
            />
          }
        />
      </FormControl>
    ),
    radio: (
      <FormControl fullWidth>
        <FormControlLabel
          value={rest.value}
          control={
            <Radio
              {...rest}
              onChange={(e) => {
                onChange(e);
              }}
            />
          }
          label={label}
        />
        {meta.touched && (
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            color="error"
            sx={{ mt: 1 }}
          >
            {meta?.error}
          </Typography>
        )}
      </FormControl>
    ),
    select: (
      <FormControl fullWidth>
        <label htmlFor={id}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            {label}
          </Typography>
        </label>
        <Select
          {...rest}
          onChange={(e) => {
            onChange(e);
          }}
          labelId={id}
        >
          {selectOptions &&
            selectOptions?.length > 0 &&
            selectOptions?.map((item, index) => (
              <MenuItem value={item?.value}>{item?.label}</MenuItem>
            ))}
        </Select>
        {meta.touched && (
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            color="error"
            sx={{ mt: 1 }}
          >
            {meta?.error}
          </Typography>
        )}
      </FormControl>
    ),
  };
  let modifyFieldType = fieldType === undefined ? "textField" : fieldType;
  return fieldTypes[modifyFieldType];
};

export default FormField;
