import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux.hooks";
import { useUsersApi } from "../../hooks/users-api.hook";
import { User } from "../../types/user.type";
import * as Yup from "yup";
import { UserRole } from "../../enums/user-role.enum";
import { FormikMUITextField } from "../../components/FormikMUITextField/FormikMUITextField";

const initialValues: Omit<User, "id" | "password" | "roleId" | "email"> = {
	name: "",
	number: "",
};

const validationSchema = Yup.object({
	name: Yup.string().required("Required"),
	number: Yup.string().required("Required"),
});

export const ProfilePage = () => {
	const userId = useAppSelector((state) => (state.auth ? state.auth.id : 0));
	const [user, setUser] = useState<User | null>(null);
	const { getUser, updateUser } = useUsersApi();

	const form = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			if (user) {
				await updateUser(userId, {
					...user,
					...values,
				});
				await fillUserData();
			}
		},
	});

	useEffect(() => {
		fillUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	const fillUserData = async () => {
		const _user = await getUser(userId);
		setUser(_user);
		form.setValues(
			_user ?? {
				name: "",
				number: "",
			}
		);
	};

	const role =
		user?.roleId === UserRole.Admin
			? "Admin"
			: user?.roleId === UserRole.Customer
			? "Traveler"
			: "Hotel Admin";

	return user ? (
		<Container
			maxWidth="lg"
			sx={{
				my: 10,
			}}
		>
			<Box component="form" onSubmit={form.handleSubmit}>
				<Card>
					<CardHeader title="Your profile data" />

					<CardContent>
						<Box display="flex" flexDirection="column" rowGap={4}>
							<TextField label="Email" value={user.email} />
							<TextField label="Role" value={role} />

							<FormikMUITextField
								label="Name"
								name="name"
								form={form}
							/>
							<FormikMUITextField
								label="Number"
								name="number"
								form={form}
							/>
						</Box>
					</CardContent>
					<CardActions
						sx={{
							justifyContent: "flex-end",
							columnGap: 2,
						}}
					>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => fillUserData()}
						>
							Reset
						</Button>
						<Button variant="contained" type="submit">
							Save
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Container>
	) : null;
};
