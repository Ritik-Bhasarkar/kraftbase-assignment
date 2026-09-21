"use client";

import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	FC,
	useContext,
} from "react";

export interface DeviceWidthContextProps {
	deviceWidth?: number | null;
	mode?: "desktop" | "mobile";
}

export const DeviceWidthContext = createContext<
	DeviceWidthContextProps | undefined
>({
	deviceWidth: null,
	mode: undefined,
});

export const DeviceWidthProvider: FC<{
	children: ReactNode;
	isMobile: boolean;
}> = ({ children, isMobile }) => {
	const [deviceWidth, setDeviceWidth] = useState<number | null>(null);
	const [mode, setMode] = useState<"desktop" | "mobile">(
		isMobile ? "mobile" : "desktop",
	);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setDeviceWidth(width);
			setMode(width > 480 ? "desktop" : "mobile");
		};
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const contextValue: DeviceWidthContextProps = {
		deviceWidth,
		mode,
	};

	return (
		<DeviceWidthContext.Provider value={contextValue}>
			{children}
		</DeviceWidthContext.Provider>
	);
};

export const useDeviceWidth = () => {
	const context = useContext(DeviceWidthContext);
	if (context === undefined) {
		throw new Error("must be used with provider");
	}
	return context;
};
