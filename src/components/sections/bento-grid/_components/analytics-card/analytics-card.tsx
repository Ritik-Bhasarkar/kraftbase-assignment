import type { CSSProperties } from "react";
import "./analytics-card.scss";

interface AnalyticsBar {
	label: string;
	min: number;
	max: number;
}

interface AnalyticsPreviewProps {
	title?: string;
	subText?: string;
	bars: AnalyticsBar[];
	yAxis?: number[]; // top to bottom, e.g. [150, 130, 110, 90, 70, 50]
	highlightIndex?: number;
	highlightText?: string;
	gaugeTitle?: string;
	gaugeDate?: string;
	gaugeValue?: number; // 0 - 100
	gaugeIcon?: string;
	gaugeNote?: string;
	className?: string;
}

const AnalyticsPreviewComponent = ({
	title,
	subText,
	bars,
	yAxis = [150, 130, 110, 90, 70, 50],
	highlightIndex,
	highlightText,
	gaugeTitle,
	gaugeDate,
	gaugeValue = 0,
	gaugeIcon,
	gaugeNote,
	className = "",
}: AnalyticsPreviewProps) => {
	const previewClasses = ["analytics-preview", className]
		.filter(Boolean)
		.join(" ");

	const top = yAxis[0];
	const bottom = yAxis[yAxis.length - 1];
	const toPercent = (v: number) => ((v - bottom) / (top - bottom)) * 100;

	return (
		<div className={previewClasses}>
			<div className="analytics-preview--card analytics-preview--chart">
				<div className="analytics-preview--chart--header">
					{title && (
						<h3 className="analytics-preview--chart--title">
							{title}
						</h3>
					)}
					{subText && (
						<p className="analytics-preview--chart--subtext">
							{subText}
						</p>
					)}
				</div>

				<div className="analytics-preview--chart--plot">
					{yAxis.map((tick) => (
						<div
							className="analytics-preview--chart--tick"
							key={tick}
							style={
								{
									"--pos": `${toPercent(tick)}%`,
								} as CSSProperties
							}>
							<span className="analytics-preview--chart--tick--label">
								{tick}
							</span>
						</div>
					))}

					{bars.map((bar, i) => (
						<div
							className="analytics-preview--chart--column"
							key={bar.label}>
							<div
								className="analytics-preview--chart--bar"
								data-active={i === highlightIndex || undefined}
								style={
									{
										"--bottom": `${toPercent(bar.min)}%`,
										"--height": `${toPercent(bar.max) - toPercent(bar.min)}%`,
										"--delay": `${i * 0.06}s`,
									} as CSSProperties
								}>
								{i === highlightIndex && highlightText && (
									<span className="analytics-preview--chart--badge">
										{highlightText}
									</span>
								)}
							</div>
							<span className="analytics-preview--chart--day">
								{bar.label}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="analytics-preview--side">
				<div className="analytics-preview--card analytics-preview--gauge">
					<div className="analytics-preview--gauge--header">
						<div className="analytics-preview--gauge--header--heading">
							{gaugeTitle && (
								<p className="analytics-preview--gauge--header--heading--title">
									{gaugeTitle}
								</p>
							)}
							{gaugeDate && (
								<p className="analytics-preview--gauge--header--heading--date">
									{gaugeDate}
								</p>
							)}
						</div>
						<span className="analytics-preview--gauge--header--toggle" />
					</div>

					<div
						className="analytics-preview--gauge--dial"
						role="img"
						aria-label={`${gaugeValue}%`}
						style={{ "--value": gaugeValue } as CSSProperties}>
						<svg
							className="analytics-preview--gauge--svg"
							viewBox="0 0 120 120"
							aria-hidden="true">
							<path
								className="analytics-preview--gauge--track"
								d="M24.64 95.36 A50 50 0 1 1 95.36 95.36"
								pathLength={100}
							/>
							<path
								className="analytics-preview--gauge--arc"
								d="M24.64 95.36 A50 50 0 1 1 95.36 95.36"
								pathLength={100}
								style={{ strokeDashoffset: 100 - gaugeValue }}
							/>
						</svg>
						<div className="analytics-preview--gauge--center">
							{gaugeIcon && (
								<span className="analytics-preview--gauge--icon">
									{gaugeIcon}
								</span>
							)}
							<span className="analytics-preview--gauge--value" />
						</div>
					</div>

					{gaugeNote && (
						<p className="analytics-preview--gauge--note">
							{gaugeNote}
						</p>
					)}
				</div>

				<div className="analytics-preview--add">
					<span className="analytics-preview--add--icon" />
				</div>
			</div>
		</div>
	);
};

const AnalyticsPreview = () => {
	return (
		<AnalyticsPreviewComponent
			title="Interactions and amount collected"
			subText="Totals For 31 Feb"
			highlightIndex={2}
			highlightText="34%"
			gaugeTitle="Operational Health"
			gaugeDate="April 2025"
			gaugeValue={80}
			gaugeIcon="🔥"
			gaugeNote="Address Actionable Cases Promptly To Maintain A Healthy Score."
			bars={[
				{ label: "Mon", min: 72, max: 125 },
				{ label: "Tue", min: 60, max: 106 },
				{ label: "Wed", min: 80, max: 150 },
				{ label: "Thu", min: 98, max: 133 },
				{ label: "Fri", min: 68, max: 108 },
				{ label: "Sat", min: 80, max: 118 },
				{ label: "Sun", min: 82, max: 110 },
			]}
		/>
	);
};

export default AnalyticsPreview;
