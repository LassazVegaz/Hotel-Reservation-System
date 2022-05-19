import { Box, Card, CardContent } from "@mui/material";
import { FormikProps } from "formik";
import { FormikMUITextField } from "../../components/FormikMUITextField/FormikMUITextField";
import { CreditCard } from "../../types/credit-card.type";

export const CreditCardForm = ({ form }: { form: FormikProps<CreditCard> }) => {
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
					<FormikMUITextField
						label="Card owner's name"
						name="owner"
						form={form}
					/>
					<FormikMUITextField
						label="Card number"
						name="number"
						form={form}
						type="number"
					/>

					<Box display="flex" justifyContent="space-between">
						<Box
							display="flex"
							justifyContent="space-between"
							columnGap={2}
							width={200}
						>
							<FormikMUITextField
								label="MM"
								name="expirationMonth"
								form={form}
								type="number"
							/>
							<FormikMUITextField
								label="YYYY"
								name="expirationYear"
								form={form}
								type="number"
							/>
						</Box>

						<FormikMUITextField
							label="CCV"
							name="cvv"
							form={form}
							type="number"
						/>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
