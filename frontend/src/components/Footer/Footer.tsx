import { Box, Typography } from "@mui/material";

export const Footer = () => {
	return (
		<Box py={4} textAlign="center" bgcolor="primary.main">
			<Typography color="white">
				Copyright &copy; {new Date().getFullYear()}
			</Typography>
		</Box>
	);
};
