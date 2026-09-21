import type { Metadata } from "next";
import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { DeviceWidthProvider } from "@/context/device-width";
import { isMobileDevice } from "@/utils/device-detect";
import "./globals.scss";

export const metadata: Metadata = {
	title: "Collect Edge",
	description: "Unified Platform for Late-Stage Agency Allocation",
	icons: {
		icon: "/assets/svg/brand/collect-edge.svg",
	},
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
	const isMobile = await isMobileDevice();
	return (
		<html lang="en">
			<DeviceWidthProvider isMobile={isMobile}>
				<body>
					<Navbar />
					{children}
					<Footer />
				</body>
			</DeviceWidthProvider>
		</html>
	);
}
