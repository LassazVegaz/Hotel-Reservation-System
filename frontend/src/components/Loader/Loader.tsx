import { Box, CircularProgress } from "@mui/material";

export const Loader = ({ show }: { show: boolean }) => {
	return show ? (
		<Box
			position="fixed"
			left={0}
			top={0}
			width="100vw"
			height="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			zIndex={5000}
			sx={{
				backgroundColor: "#2e2f548c",
			}}
		>
			<CircularProgress />
		</Box>
	) : null;
};
