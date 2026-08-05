/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type BaseProps = {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "value" | "onChange" | "type"
  >;

type TextareaProps = BaseProps & {
  as: "textarea";
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "value" | "onChange"
  >;

type SelectProps = BaseProps & {
  as: "select";
  value: string;
  onValueChange: (value: string | null) => void; // ← allow null
  options: { label: string; value: string }[];
};

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const InputComponent = (props: FormFieldProps) => {
  const {
    name,
    label,
    error,
    className = "",
    containerClassName = "",
    as = "input",
    placeholder,
    ...rest
  } = props;

  const errorClass = error ? "border-red-500 focus-visible:ring-red-500" : "";

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && <Label htmlFor={name}>{label}</Label>}

      {/* INPUT */}
      {as === "input" && (
        <Input
          id={name}
          name={name}
          type={(props as InputProps).type ?? "text"}
          value={(props as InputProps).value}
          onChange={(props as InputProps).onChange}
          placeholder={placeholder}
          className={`${errorClass} ${className}`}
          {...(rest as any)}
        />
      )}

      {/* TEXTAREA (shadcn) */}
      {as === "textarea" && (
        <Textarea
          id={name}
          name={name}
          value={(props as TextareaProps).value}
          onChange={(props as TextareaProps).onChange}
          placeholder={placeholder}
          className={`${errorClass} ${className}`}
          {...(rest as any)}
        />
      )}

      {/* SELECT (shadcn) */}
      {as === "select" && (
        <Select
          value={(props as SelectProps).value}
          onValueChange={(props as SelectProps).onValueChange}
        >
          <SelectTrigger id={name} className={`${errorClass} ${className}`}>
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {(props as SelectProps).options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputComponent;
