import * as React from "react";
//import NextLink from "next/link";
import prisma from "@/prisma";
import Wrapper from "@/components/wrapper";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//import Hero from "@/components/event/Hero";
import Questions from "@/components/event/Questions";
import QuestionForm from "@/components/event/QuestionForm";
//import { Question } from "@prisma/client";

async function getEventDetails(eventCode) {
	return await prisma.event.findFirst({
		include: {
			questions: true,
		},
		where: {
			code: eventCode,
		},
	});
}

async function getEventQuestions(eventCode) {
	let questions = [];
	const valid_event = await prisma.event.findFirst({
		where: {
			code: eventCode,
		},
	});
	if (valid_event) {
		questions = await prisma.question.findMany({
			where: {
				eventId: valid_event.id,
			},
			orderBy: [
				{
					answered: "asc",
				},
				{
					votes: "desc",
				},
				{
					created: "asc",
				},
			],
		});
	}
	return questions;
}

export async function generateMetadata({ params }) {
	const { eventid } = await params;
	const eventData = getEventDetails(eventid);
	const [event] = await Promise.all([eventData]);
	let event_title = event?.title;

	return {
		title: event_title,
		description: "Engage, Empower, Evolve – Make Every Interaction Count!",
	};
}

export default async function Page({ params }) {
	const { eventid } = await params;
	const eventData = getEventDetails(eventid);
	const eventQuestionsData = getEventQuestions(eventid);
	const [event, questions] = await Promise.all([eventData, eventQuestionsData]);
	return (
		<Wrapper params={params}>
			<Box
				component="section"
				sx={{
					p: 2,
					background: "url(/images/crowd.jpg) no-repeat center center",
					backgroundAttachment: "fixed",
					backgroundSize: "cover",
					height: "100vh",
					width: "100%",
					overflow: "auto",
					position: "relative",
				}}
			>
				<Container
					sx={{
						backgroundColor: "white",
						mt: 4,
						opacity: "0.85",
						py: 4,
					}}
				>
					<Typography variant="h4" color="inherit">
						{event?.title}
					</Typography>

					<Questions event={event} questions={questions} params={params} />
					<QuestionForm event={event} eventid={eventid} />
				</Container>
			</Box>
		</Wrapper>
	);
}
