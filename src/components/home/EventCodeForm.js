"use client";
import * as React from "react";
import { Box, TextField, Container } from "@mui/material";
import { useRouter } from "next/navigation";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function EventCodeForm() {
	const router = useRouter();
	const [eventCode, setEventCode] = React.useState("");
	//const [code, setCode] = React.useState("");
	const [events, setEvents] = React.useState([]);

	const updateSearchString = async (searchstring) => {
		setEventCode(searchstring);
		const endpoint = "/api?q=" + searchstring;
		console.log(endpoint);
		try {
			const response = await fetch(endpoint, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const response_content = await response.json();
			if (response_content) {
				switch (response_content.outcome) {
					case 3:
						setEvents(response_content.items);
						break;
					default:
						alert(response_content.outcome);
						break;
				}
			}
		} catch (error) {
			//console.error(error);
		}
	};

	const goToEvent = (code) => {
		router.push("/events/" + code);
	};

	return (
		<Container>
			<Paper
				sx={{
					p: "0.75rem 1rem",
					display: "flex",
					mx: "auto",
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
				<Autocomplete
					sx={{ ml: 1, flex: 1 }}
					freeSolo
					disableClearable
					onChange={(e, value) => goToEvent(value.code)}
					options={events}
					getOptionLabel={(option) =>
						option.title ? option.title : option.code
					}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Enter passcode or Search"
							value={eventCode}
							onChange={(e) => updateSearchString(e.target.value)}
							slotProps={{
								input: {
									...params.InputProps,
									type: "search",
								},
							}}
						/>
					)}
				/>
			</Paper>
		</Container>
	);
}

/*
<IconButton
					type="submit"
					color="primary"
					sx={{ p: "10px" }}
					aria-label="directions"
				>
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
*/