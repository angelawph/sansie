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
import { Event, Question } from "@prisma/client";
import FolderIcon from "@mui/icons-material/Folder";

export default function Events({events}) {
	return (
		<>
			{events.length ? (
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
							{events.map((item) => (
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
				<div>No Questions</div>
			)}
		</>
	);
}
