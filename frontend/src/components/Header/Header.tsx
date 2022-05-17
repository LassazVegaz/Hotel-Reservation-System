import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/redux.hooks";

type NavLink = {
	text: string;
	path: string;
};

const HeaderComponent = ({ links }: { links: NavLink[] }) => {
	const navigate = useNavigate();

	return (
		<>
			<AppBar>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography variant="h5">HRS</Typography>

						<Box flexGrow={1} ml={5}>
							{links.map((link, index) => (
								<Button
									sx={{
										color: "white",
									}}
									key={index}
									onClick={() => navigate(link.path)}
								>
									{link.text}
								</Button>
							))}
						</Box>

						<Box>
							<IconButton>
								<Avatar />
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Toolbar />
		</>
	);
};

export const Header = () => {
	const authData = useAppSelector((s) => s.auth);

	let links: NavLink[] = [
		{
			text: "Hotels",
			path: "/hotels",
		},
	];

	if (authData && authData.roleId === UserRole.Customer) {
		links.push({
			text: "My bookings",
			path: "/",
		});
	}

	return authData ? <HeaderComponent links={links} /> : null;
};
