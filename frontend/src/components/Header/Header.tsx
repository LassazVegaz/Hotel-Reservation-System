import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/redux.hooks";
import { useUsersApi } from "../../hooks/users-api.hook";

type NavLink = {
	text: string;
	path: string;
};

const HeaderComponent = ({ links }: { links: NavLink[] }) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { logoutUser } = useUsersApi();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleClose();
		logoutUser();
	};

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
							<IconButton onClick={handleMenu}>
								<Avatar />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleLogout}>
									Logout
								</MenuItem>
							</Menu>
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
