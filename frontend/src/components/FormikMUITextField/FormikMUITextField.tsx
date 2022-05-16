import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

type FormikMUITextFieldProps = {
	label: string;
	name: string;
	form: {
		values: { [x: string]: unknown };
		handleChange:
			| ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
			| undefined;
		touched: { [x: string]: any };
		errors: { [x: string]: any };
	};
	type?: string;
};

export const FormikMUITextField = ({
	label,
	name,
	form,
	type = "text",
}: FormikMUITextFieldProps) => {
	return (
		<TextField
			value={form.values[name]}
			onChange={form.handleChange}
			name={name}
			label={label}
			error={form.touched[name] && Boolean(form.errors[name])}
			helperText={form.touched[name] && form.errors[name]}
			type={type}
		/>
	);
};
