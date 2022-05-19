import { Box, Container, Typography } from "@mui/material";

export const NotFoundPage = () => {
	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "79.5vh",
				}}
			>
				<Typography variant="h2">404</Typography>
			</Box>
		</Container>
	);
};
