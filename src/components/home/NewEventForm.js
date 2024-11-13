"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function NewEventForm() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [eventName, setEventName] = React.useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const submitData = async () => {
		const endpoint = "/api/event";
		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					event_name: eventName,
				}),
			});
			const response_content = await response.json();
			if (response_content) {
				switch (response_content.outcome) {
					case 3:
						router.push("/events/" + response_content.items[0].code);
						//location.reload();
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

	return (
		<Box>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClickOpen}
				startIcon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
					</svg>
				}
			>
				Create Event
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Ready to transform your audience interaction?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Imagine an event where every question gets heard, every vote counts,
						and every opinion matters. <br />
						<br />
						Create an event today and watch your engagement soar!
					</DialogContentText>
					<TextField
						autoComplete="false"
						required
						value={eventName}
						onChange={(e) => setEventName(e.target.value)}
						margin="dense"
						id="new_event_name"
						name="eventname"
						label="Name of Event"
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={submitData}>
						Create
					</Button>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
