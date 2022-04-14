import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import AudioSrc from "./audio.mp3";
import React, { useCallback, useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import {
  MdPlayCircle,
  MdPauseCircle,
  MdReplay5,
  MdForward5,
} from "react-icons/md";
import Data from "./data.json";
import Block from "./components/Block";
import { formatSecond } from "./utils";
const DataArr = Data.content.document.children;

function App() {
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  const updateCurrentTime = useCallback((startTime) => {
    audioRef.current.currentTime = startTime;
    setCurrentTime(startTime);
  }, []);

  const handleForward = () => {
    audioRef.current.currentTime = currentTime + 5;
    setCurrentTime(currentTime + 5);
  };

  const handleRePlay = () => {
    let time = currentTime - 5;
    if (time <= 0) {
      time = 0;
    }
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleChangeSpeed = (e) => {
    audioRef.current.playbackRate = Number(e.target.value);
  };

  return (
    <>
      <div className="text-container pt-4">
        {DataArr.map((i, inx) => (
          <Block
            blockObject={i}
            currentTime={
              currentTime >= i.data.start && currentTime < i.data.end
                ? currentTime
                : 0
            }
            setCurrentTime={updateCurrentTime}
            duration={duration}
            key={inx}
          />
        ))}
      </div>

      <div style={{ height: 78 }}></div>
      <audio
        ref={audioRef}
        src={AudioSrc}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
      />
      <div className="control-container row py-4 justify-content-center">
        <div className="col-2  d-flex ">
          <MdReplay5 onClick={handleRePlay} className="mx-3" size={30} />
          {isPlay ? (
            <MdPauseCircle
              onClick={handlePausePlayClick}
              className="mx-3"
              size={30}
            />
          ) : (
            <MdPlayCircle
              onClick={handlePausePlayClick}
              className="mx-3"
              size={30}
            />
          )}
          <MdForward5 onClick={handleForward} className="mx-3" size={30} />
        </div>
        <div className="col-2 d-flex justify-content-center align-items-center">
          <span className="caption p-1">Playback speed</span>
          <select
            defaultValue={1}
            className="select-speed caption"
            onChange={handleChangeSpeed}
          >
            <option value="0.5">0.5x</option>
            <option value="1">1.0x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
        <div className="col-3 ">
          <div className="d-flex justify-content-between">
            <div className="caption">{formatSecond(currentTime)}</div>
            <div className="caption">{formatSecond(duration)}</div>
          </div>

          <TimeSlider
            axis="x"
            xmax={duration}
            x={currentTime}
            onChange={handleTimeSliderChange}
            styles={{
              track: {
                height: "6px",
                width: "100%",
              },
              active: {
                height: "6px",
              },
              thumb: {
                marginTop: "-1px",
                width: "10px",
                height: "10px",
                borderRadius: 50,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
