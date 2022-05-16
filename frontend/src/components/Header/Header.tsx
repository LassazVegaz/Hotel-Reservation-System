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

const pages = ["Home", "About", "Contact"];

export const Header = () => {
	return (
		<>
			<AppBar>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography variant="h5">HRS</Typography>

						<Box flexGrow={1} ml={5}>
							{pages.map((page, index) => (
								<Button
									sx={{
										color: "white",
									}}
									key={index}
								>
									{page}
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
