"use client";
import * as React from "react";
import { Box, Typography, Button, Container, List } from "@mui/material";
import { Suspense } from "react";
import useSWR from "swr";
import axios from "axios";

import SingleQuestion from "@/components/event/SingleQuestion";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import CheckIcon from "@mui/icons-material/Check";

export default function QuestionsSWR({ event, params }) {
	const [item, setItem] = React.useState("");
	const [items, setItems] = React.useState([]);

	let bs_answered_questions = [];
	let bs_unanswered_questions = [];

	const [unanswered, setUnanswered] = React.useState([]);
	const [answered, setAnswered] = React.useState([]);
	const [offline, setOffline] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const fetcher = (url) => {
		setLoading(true);
		return axios.get(url).then((res) => {
			if (!res.data) {
				throw Error(res.data.message);
			} else {
				//                console.log(res.data.items.length);

				let answered_questions = [];
				let unanswered_questions = [];
				let offline_questions = [];
				for (var i = 0; i < res.data.items.length; i++) {
					if (res.data.items[i].answered) {
						answered_questions.push(res.data.items[i]);
					} else if (res.data.items[i].offline) {
						offline_questions.push(res.data.items[i]);
					} else {
						unanswered_questions.push(res.data.items[i]);
					}
				}
				setAnswered(answered_questions);
				setUnanswered(unanswered_questions);
				setOffline(offline_questions);
				setItems(res.data.items);
			}
			setLoading(false);
			return res.data;
		});
	};

	const api_endpoint = "/api/event/" + event.code;
	const { data, error, isLoading } = useSWR(api_endpoint, fetcher, {
		refreshInterval: 300,
	});

	return (
		<Suspense fallback={<LinearProgress />}>
			{!isLoading ? (
				<>
					{items.length > 0 ? (
						<>
							{unanswered.length ? (
								<Box
									sx={{
										mb: 2,
									}}
								>
									<Typography variant="h6">Questions</Typography>
									<List
										sx={{
											py: 2,
										}}
									>
										{unanswered.map((item) => (
											<SingleQuestion
												event={event}
												key={item.id}
												question={item}
											/>
										))}
									</List>
								</Box>
							) : (
								<Alert
									icon={<CheckIcon fontSize="inherit" />}
									severity="success"
								>
									No Questions
								</Alert>
							)}

							{offline.length ? (
								<Box
									sx={{
										mb: 2,
									}}
								>
									<Typography variant="h6">Questions to be taken Offline</Typography>
									<List
										sx={{
											py: 2,
										}}
									>
										{offline.map((item) => (
											<SingleQuestion
												event={event}
												key={item.id}
												question={item}
											/>
										))}
									</List>
								</Box>
							) : (
								<></>
							)}

							{answered.length ? (
								<Box
									sx={{
										mb: 2,
									}}
								>
									<Typography variant="h6">Answered</Typography>
									<List
										sx={{
											py: 2,
										}}
									>
										{answered.map((item) => (
											<SingleQuestion
												event={event}
												key={item.id}
												question={item}
											/>
										))}
									</List>
								</Box>
							) : (
								<></>
							)}
						</>
					) : (
						<></>
					)}
				</>
			) : (
				<LinearProgress />
			)}
		</Suspense>
	);
}
