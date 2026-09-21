"use client";

import React from "react";
import "./badge-heading.scss";
import { Button } from "../button/button";

interface BadgeHeadingProps {
	badgeText?: string;
	text?: string;
	subText?: string;
	buttonText?: string;
	buttonTrailingIcon?: string;
	buttonLeadingIcon?: string;
}

const BadgeHeading = ({
	badgeText,
	text,
	subText,
	buttonText,
	...props
}: BadgeHeadingProps) => {
	return (
		<div className="badge-heading">
			<div className="badge-heading--top">
				{badgeText && (
					<span className="badge-heading--top--badge">
						{badgeText}
					</span>
				)}
				<h2 className="badge-heading--top--text">{text}</h2>
			</div>

			{subText && <p className="badge-heading--subtext">{subText}</p>}

			{buttonText && (
				<div className="badge-heading--actions">
					<Button
						text={buttonText}
						variant="primary"
						size="large"
						trailingIcon={props.buttonTrailingIcon}
						leadingIcon={props.buttonLeadingIcon}
						whiteBorder
					/>
				</div>
			)}
		</div>
	);
};

export default BadgeHeading;
