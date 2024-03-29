import { Button, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useFormik } from "formik";
import { UserRole } from "../../enums/user-role.enum";
import { User } from "../../types/user.type";
import * as yup from "yup";
import { FormikMUITextField } from "../../components/FormikMUITextField/FormikMUITextField";
import { useUsersApi } from "../../hooks/users-api.hook";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/notifications.hook";

type CreateAccountFormValues = Omit<User, "id"> & {
	password: string;
	confirmPassword: string;
};

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
	confirmPassword: yup
		.string()
		.required("Confirm password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
	number: yup.string().required("Number is required"),
});

export const CreateAcountForm = () => {
	const { createUser, isEmailTaken } = useUsersApi();
	const navigate = useNavigate();
	const { showError } = useNotifications();

	const initialValues: CreateAccountFormValues = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		number: "",
		roleId: UserRole.Customer,
	};

	const form = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			// check if email is taken
			if (await isEmailTaken(values.email)) {
				showError("Email is already taken");
				return;
			}

			const newUser: User = {
				...values,
				id: 0,
			};
			if (await createUser(newUser)) {
				navigate("/login");
			}
		},
	});

	const handleRoleChange = (
		_event: React.MouseEvent<HTMLElement, MouseEvent>,
		value: any
	) => {
		form.setFieldValue("roleId", value);
	};

	return (
		<Box
			component="form"
			display="flex"
			flexDirection="column"
			rowGap={3}
			onSubmit={form.handleSubmit}
		>
			<FormikMUITextField label="Name" name="name" form={form} />
			<FormikMUITextField
				label="Mobile number"
				name="number"
				type="tel"
				form={form}
			/>
			<FormikMUITextField
				label="Email"
				name="email"
				type="email"
				form={form}
			/>
			<FormikMUITextField
				label="Password"
				name="password"
				type="password"
				form={form}
			/>
			<FormikMUITextField
				label="Confirm passowrd"
				name="confirmPassword"
				type="password"
				form={form}
			/>

			<ToggleButtonGroup
				value={form.values.roleId}
				exclusive
				fullWidth
				onChange={handleRoleChange}
			>
				<ToggleButton name="roleId" value={UserRole.Customer}>
					Traveler
				</ToggleButton>
				<ToggleButton name="roleId" value={UserRole.HotelAdmin}>
					Hotel Admin
				</ToggleButton>
			</ToggleButtonGroup>

			<Button
				variant="contained"
				sx={{
					mt: 3,
				}}
				type="submit"
			>
				Sign Up
			</Button>
			<Button
				color="secondary"
				variant="contained"
				onClick={() => navigate("/login")}
			>
				Sign In
			</Button>
		</Box>
	);
};
