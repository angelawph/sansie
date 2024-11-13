import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LoginForm from "@/components/login/LoginForm";

export default function Header() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				color="transparent"
				elevation={0}
				sx={{
					color: "white",
				}}
			>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link
							href="/"
							color="inherit"
							sx={{
								textDecoration: "none",
							}}
						>
							interact
						</Link>
					</Typography>

					<LoginForm />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
