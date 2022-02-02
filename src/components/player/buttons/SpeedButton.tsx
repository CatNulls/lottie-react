import React, { FC } from "react";
import config from "../../../config";
import { BaseButton } from "../../misc/BaseButton";

export type SpeedButtonProps = {
  speed: number;
  speeds?: number[]; // TODO: add levels to also set labels like: Slow (0.5), Normal (1), Fast (2) etc.
  onClick: (speed: number) => void;
};

export const SpeedButton: FC<SpeedButtonProps> = ({ speed, speeds = [0.5, 1, 2], onClick }) => (
  <BaseButton
    DropdownContent={(setShowDropdown) => (
      <>
        <span
          style={{
            color: config.whiteColor,
            padding: 5,
            textDecoration: "none",
            display: "block",
            fontSize: config.textFontSize,
            fontWeight: "bold",
          }}
        >
          Playback Speed
        </span>

        {speeds.map((newSpeed) => (
          <button
            key={newSpeed}
            style={{
              backgroundColor: config.transparentColor,
              color: speed === newSpeed ? config.accentColor : config.whiteColor,
              padding: 5,
              textDecoration: "none",
              display: "block",
              fontSize: config.textFontSize,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              onClick(newSpeed);
              setShowDropdown(false);
            }}
          >
            {newSpeed}
          </button>
        ))}
      </>
    )}
  >
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <path
        d="M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z"
        fill={speed === 1 ? config.whiteColor : config.accentColor}
      />
    </svg>
  </BaseButton>
);