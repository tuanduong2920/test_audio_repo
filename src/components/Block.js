import React, { useEffect, useMemo, useState } from "react";
import Text from "./Text";
import { MdMessage } from "react-icons/md";
import { formatSecond } from "../utils";
import EditSpeakerBox from "./EditSpeakerBox";

const Block = ({ blockObject, currentTime, setCurrentTime, position }) => {
  const [commentList, setCommentList] = useState([]);
  const [isEditname, setEditName] = useState(false);

  useEffect(() => {
    if (JSON.stringify(blockObject.data.comments) !== "{}") {
      setCommentList(
        Object.entries(blockObject.data.comments).map((i) => i[1])
      );
    }
  }, []);

  useEffect(() => console.log("block render"));

  const startTimeCommentArr = useMemo(
    () => commentList.map((i) => i.dataStart),
    [commentList]
  );

  return (
    <div className="py-2">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-6 caption">
          {formatSecond(blockObject.data.start)}
        </div>
      </div>
      <div className="row">
        <div className="col-2 ">
          {isEditname ? (
            <EditSpeakerBox
              currentName={blockObject.data.speaker}
              blockPosition={position}
              setEditName={setEditName}
            />
          ) : (
            <div className="text-right">
              <span onClick={() => setEditName(true)}>
                {blockObject.data.speaker || "+ Add speaker"}
              </span>
            </div>
          )}
        </div>
        <div className="col-6">
          {blockObject.children.map((i, inx) => (
            <Text
              textObject={i}
              currentTime={
                currentTime >= i.data.dataStart && currentTime < i.data.dataEnd
                  ? currentTime
                  : 0
              }
              setCurrentTime={setCurrentTime}
              hasDecoration={startTimeCommentArr.includes(i.data.dataStart)}
              textPosition={inx}
              blockPosition={position}
              key={inx}
            />
          ))}
        </div>
        <div className="col-3 comment-container">
          {commentList.map((i) => (
            <div key={i.id} className="card m-1 px-2 card-comment">
              <MdMessage size={20} display="block" opacity="0.4" />
              <div className="card-body">{i.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Block);
