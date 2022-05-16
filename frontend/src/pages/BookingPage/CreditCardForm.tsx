import { Box, Card, CardContent, TextField } from "@mui/material";

export const CreditCardForm = () => {
	return (
		<Box component="form">
			<Card>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						rowGap: 4,
					}}
				>
					<TextField label="Card owner's name" />
					<TextField label="Card number" />

					<Box display="flex" justifyContent="space-between">
						<Box
							display="flex"
							justifyContent="space-between"
							columnGap={2}
							width={200}
						>
							<TextField label="MM" />
							<TextField label="YY" />
						</Box>
						<TextField
							sx={{
								width: 200,
							}}
							label="CCV"
						/>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
