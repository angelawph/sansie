"use client";
import * as React from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function QuestionForm({ event, eventid }) {
	const router = useRouter();

	const [question, setQuestion] = React.useState("");
	
	const submitData = async (event) => {
		event.preventDefault();

		const endpoint = "/api/event/" + eventid;
		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					question: question,
				}),
			});
			const response_content = await response.json();
			if (response_content) {
				switch (response_content.outcome) {
					case 3:
						setQuestion("");
						/*
						router.push("/events/" + response_content.items[0].code);
                        */
						location.reload();
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
		<Box component="form" onSubmit={submitData}>
			<Box
				sx={{
					pb: 2,
				}}
			>
				<TextField
					fullWidth
					required
					id="new-event-question-form"
					label="Ask a Question"
					multiline
					rows={3}
					onChange={(e) => setQuestion(e.target.value)}
					value={question}
				/>
			</Box>
			<Box>
				<Button type="submit" variant="contained" color="primary">
					Post Question
				</Button>
			</Box>
		</Box>
	);
}
