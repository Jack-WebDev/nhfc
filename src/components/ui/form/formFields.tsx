import React, { useState } from "react";
import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  SelectValue,
  Input,
  FormMessage,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  FormDescription,
} from "..";
import { RadioGroup, RadioGroupItem, Checkbox } from "@/components";

export function FormInput(props: FormInputProps) {
  const {
    type,
    placeholder,
    label,
    name,
    disabled,
    defaultValue,
    fullWidth,
    value,
    description,
    small,
  } = props;


  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            fullWidth
              ? `w-full  flex flex-col gap-0`
              : small
              ? "w-full md:w-16 flex flex-col gap-0"
              : "w-full md:w-[48%] flex flex-col gap-0"
          }
        >
          {label && <FormLabel className="text-black">{label}:</FormLabel>}

          <Input 
            type={type ? type : "text"}
            contentEditable="true"
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled ? true : false}
            {...field}
            defaultValue={defaultValue ? defaultValue : undefined}
            value={value ? value : undefined}
            
          />

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-blue-500">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
export function FormFileInput(props: FormFileInputProps) {
  const { placeholder, label, name, disabled, setFile, description } = props;
  type FilesType = HTMLInputElement;
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:w-[48%] flex flex-col gap-0 ">
          {label && <FormLabel className="text-black">{label}:</FormLabel>}

          <Input
            type="file"
            contentEditable="true"
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled ? disabled : false}
            {...field}
            //@ts-ignore
            onChange={(e: React.ChangeEvent) => setFile(e.target.files[0])}
          />

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-blue-500">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export function FormTextArea(props: FormTextAreaProps) {
  const { placeholder, label, name, disabled, defaultValue, description } =
    props;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="text-black">{label}:</FormLabel>}

          <Textarea
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled ? disabled : false}
            {...field}
            defaultValue={defaultValue ? defaultValue : undefined}
          />

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-blue-500">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export function FormSelect(props: SelectProps) {
  const {
    label,
    name,
    placeholder,
    data,
    disabled,
    defaultValue,
    fullWidth,
    description,
  } = props;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            fullWidth
              ? "w-full  flex flex-col gap-0"
              : "w-full md:w-[48%] flex flex-col gap-0"
          }
        >
          {label && <FormLabel className="text-black">{label}:</FormLabel>}

          <Select
            onValueChange={field.onChange}
            disabled={disabled ? disabled : false}
            defaultValue={defaultValue ? defaultValue : undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {data.map((item) => (
                  <SelectItem key={item.id} value={item.value}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-blue-500">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
export function FormRadio(props: RadioGroupProps) {
  const {
    label,
    name,
    data,
    disabled,
    defaultValue,
    flex,
    fullWidth,
    description,
    layout,
  } = props;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            fullWidth
              ? "w-full  flex flex-col gap-0 "
              : "w-full max-w-fit flex flex-col gap-0 "
          }
        >
          <div
            className={
              flex === "row"
                ? "flex  items-center gap-4"
                : "flex flex-col gap-2"
            }
          >
            {label && <FormLabel className="text-black">{label}:</FormLabel>}

            <RadioGroup
              defaultValue={defaultValue}
              onValueChange={field.onChange}
              name="name"
            >
              <div
                className={
                  layout === "row"
                    ? "flex items-center gap-2 max-w-fit"
                    : "flex flex-col gap-2 max-w-fit"
                }
              >
                
                {data.map((item) => (
                  <div className="flex items-center space-x-2" key={item.id}>
                    <RadioGroupItem
                      className="h-4 w-4"
                      value={item.value}
                      id={item.id}
                      
                    />
                    <label className="text-xs" htmlFor={item.id}>
                      {item.title}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-blue-500">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
export function FormCheckBox(props: CheckBoxProps) {
  const {
    label,
    name,
    id,
    disabled,
    defaultValue,
    fullWidth,
    description,
    placeholder,
  } = props;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            fullWidth
              ? "w-full  flex flex-col gap-0 "
              : "w-full max-w-fit flex flex-col gap-0 "
          }
        >
          {label && <FormLabel className="text-black">{label}:</FormLabel>}

          <div className="flex items-center space-x-2">
            <Checkbox id={id} />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {placeholder}
            </label>
          </div>

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-blue-500">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export type FormTextAreaProps = {
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
  description?: string;
};

export type FormInputProps = {
  type?: string;
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string | number;
  fullWidth?: boolean;
  value?: string | number;
  description?: string;
  small?: boolean;
};
export type FormFileInputProps = {
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  description?: string;
};

export type RadioGroupProps = {
  label?: string;
  name: string;
  data: SelectData[];
  disabled?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  description?: string;
  layout: string;
  flex?: string;
};
export type CheckBoxProps = {
  label?: string;
  name: string;
  placeholder: string;
  id: string;
  disabled?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  description?: string;
};
export type SelectProps = {
  label?: string;
  name: string;
  placeholder: string;
  data: SelectData[];
  disabled?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  description?: string;
};

export type SelectData = {
  id: string;
  title: string;
  value: string;
};
