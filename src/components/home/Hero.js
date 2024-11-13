import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import EventCodeForm from "@/components/home/EventCodeForm";
import NewEventForm from "@/components/home/NewEventForm";

export default function Hero() {
	return (
		<Box
			component="section"
			sx={{
				p: 2,
				background: "url(/images/stage.jpg) no-repeat center center",
				backgroundAttachment: "fixed",
				backgroundSize: "cover",
				height: "100vh",
				width: "100%",
				position: "relative",
			}}
		>
			<Box
				sx={{
					color: "white",
					position: "absolute",
					left: "50%",
					top: "50%",
					mr: "-50%",
					transform: "translate(-50%, -50%);",
				}}
			>
				<Box
					sx={{
						mb: 2,
					}}
				>
					<EventCodeForm />
				</Box>
				<Typography variant="h5">
					Engage, Empower, Evolve – Make Every Interaction Count!
				</Typography>
				<Box
					sx={{
						p: 2,
						textAlign: "center",
					}}
				>
					<NewEventForm />
				</Box>
			</Box>
		</Box>
	);
}
