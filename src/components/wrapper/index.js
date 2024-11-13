import * as React from "react";

import {
	Box,
} from "@mui/material";
import Header from "@/components/wrapper/Header";

export function Wrapper({children}) {
	return (
		<Box component="main">
            <Header />
			{children}
		</Box>
	);
}
export default Wrapper;
