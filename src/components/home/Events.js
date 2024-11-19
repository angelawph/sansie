"use client";
import { Suspense } from "react";
import * as React from "react";
import {
	Box,
	Typography,
	Button,
	Container,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
//import { Event, Question } from "@prisma/client";
import useSWR from "swr";
import axios from "axios";

import LinearProgress from "@mui/material/LinearProgress";

export default function Events() {
	const [items, setItems] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const fetcher = (url) => {
		setLoading(true);
		return axios.get(url).then((res) => {
			if (!res.data) {
				throw Error(res.data.message);
			} else {
				/*
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
				
				*/
				setItems(res.data.items);
				console.log('Total events: ' + res.data.items.length);
			}
			setLoading(false);
			return res.data;
		});
	};

	const api_endpoint = "/api";
	const { data, error, isLoading } = useSWR(api_endpoint, fetcher, {
		refreshInterval: 15000,
	});

	return (
		<Suspense fallback={<LinearProgress />}>
			{!isLoading ? (
				<>
					{items.length > 0 ? (
						<Box
							sx={{
								p: 2,
								background: "url(/images/seated.jpg) no-repeat center center",
								backgroundSize: "cover",
								backgroundAttachment: "fixed",
								height: "100vh",
								width: "100%",
								position: "relative",
								color: "white",
							}}
						>
							<Box
								sx={{
									width: {
										xs: "90vw",
										sm: "75vw",
										md: "60vw",
										lg: "50vw",
										xl: "50vw",
									},
									backgroundColor: "white",
									opacity: "0.75",
									color: "white",
									position: "absolute",
									left: "50%",
									top: "50%",
									mr: "-50%",
									transform: "translate(-50%, -50%);",
								}}
							>
								<List
									sx={{
										py: 2,
										width: "100%",
									}}
								>
									{items.map((item) => (
										<ListItem
											component={Link}
											href={"/events/" + item.code}
											key={item.id}
										>
											<ListItemIcon>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
													<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
												</svg>
											</ListItemIcon>
											<ListItemText primary={item.title} />
										</ListItem>
									))}
								</List>
							</Box>
						</Box>
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
