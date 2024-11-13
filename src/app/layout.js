import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import Script from "next/script";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<>
				<Script
					strategy="lazyOnload"
					src="https://www.googletagmanager.com/gtag/js?id=G-KYNHZX376Y"
				/>
				<Script id="google-analytics" strategy="lazyOnload">
					{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KYNHZX376Y', {
          page_path: window.location.pathname,
        });
      `}
				</Script>
			</>

			<body>
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
