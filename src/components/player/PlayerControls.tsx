import React, { FC, useCallback } from "react";
import { UseLottieFactoryResult, LottieState, PlayerControlsElement } from "../../types";
import Spacer from "../misc/Spacer";
import { PlayerControlsFramesIndicator } from "./PlayerControlsFramesIndicator";
import { PlayerControlsProgressBar } from "./PlayerControlsProgressBar/PlayerControlsProgressBar";
import { LoopButton } from "./buttons/LoopButton";
import { PauseButton } from "./buttons/PauseButton";
import { PlayButton } from "./buttons/PlayButton";
import { StopButton } from "./buttons/StopButton";

export type PlayerControlsProps = Pick<
  UseLottieFactoryResult,
  "state" | "totalFrames" | "loop" | "play" | "pause" | "stop" | "seek" | "toggleLoop" | "subscribe"
> & {
  show: boolean;
  elements?: PlayerControlsElement[];
};

export const PlayerControls: FC<PlayerControlsProps> = (props) => {
  const {
    show,
    elements,
    state,
    totalFrames,
    loop,
    play,
    pause,
    stop,
    seek,
    toggleLoop,
    subscribe,
  } = props;

  /**
   * Checks if the consumer have any preference on what elements we should display
   */
  const shouldShowElement = useCallback(
    (element: PlayerControlsElement) => {
      // If specific elements weren't specified, display all
      if (!elements || !Array.isArray(elements)) {
        return true;
      }

      // Otherwise, display if `element` is in `elements` array
      return elements.includes(element);
    },
    [elements],
  );

  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      {shouldShowElement(PlayerControlsElement.Play) && state !== LottieState.Playing && (
        <>
          <PlayButton onClick={play} />
          <Spacer size={10} />
        </>
      )}

      {shouldShowElement(PlayerControlsElement.Pause) && state === LottieState.Playing && (
        <>
          <PauseButton onClick={pause} />
          <Spacer size={10} />
        </>
      )}

      {shouldShowElement(PlayerControlsElement.Stop) && state !== LottieState.Stopped && (
        <>
          <StopButton onClick={stop} />
          <Spacer size={10} />
        </>
      )}

      {shouldShowElement(PlayerControlsElement.FramesIndicator) && (
        <>
          <PlayerControlsFramesIndicator
            subscribe={subscribe}
            totalFrames={totalFrames || 0}
            decimals={0}
          />
          <Spacer size={10} />
        </>
      )}

      {shouldShowElement(PlayerControlsElement.ProgressBar) && (
        <>
          <PlayerControlsProgressBar
            subscribe={subscribe}
            totalFrames={totalFrames}
            onChange={(progress, isDraggingEnded) => {
              seek(progress, !!isDraggingEnded);
            }}
          />
          <Spacer size={10} />
        </>
      )}

      {shouldShowElement(PlayerControlsElement.Loop) && (
        <LoopButton isOn={loop} onClick={toggleLoop} />
      )}
    </div>
  );
};