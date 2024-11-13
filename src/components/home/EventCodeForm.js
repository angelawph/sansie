"use client";
import * as React from "react";
import { Box, TextField, Container } from "@mui/material";
import { useRouter } from "next/navigation";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

export default function EventCodeForm() {
	const router = useRouter();
	const [eventCode, setEventCode] = React.useState("");

	return (
		<Container >
			<Paper
				component="form"
				sx={{
					p: "0.75rem 1rem",
					display: "flex",
					mx: 'auto',
					alignItems: "center",
					width: {
						xs: "90vw",
						sm: "67vw",
						md: "50vw",
						lg: "35vw",
						xl: "35vw",
					},
					//'25vw'
				}}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					value={eventCode}
					onChange={(e) => setEventCode(e.target.value)}
					placeholder="Enter Event Passcode"
					inputProps={{ "aria-label": "Enter event passcode" }}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
					</svg>
				</IconButton>
			</Paper>
		</Container>
	);
}
