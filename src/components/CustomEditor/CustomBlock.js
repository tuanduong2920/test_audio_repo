import React, { useEffect, useMemo, useState } from "react";
import { MdMessage } from "react-icons/md";
import { formatSecond } from "../../utils";
import EditSpeakerBox from "../EditSpeakerBox";

const TestBlock = ({
  attributes,
  currentTime,
  setCurrentTime,
  children,
  element,
}) => {
  const [commentList, setCommentList] = useState([]);
  const [isEditname, setEditName] = useState(false);
  useEffect(() => {
    if (JSON.stringify(element.data.comments) !== "{}") {
      setCommentList(Object.entries(element.data.comments).map((i) => i[1]));
    }
  }, []);

  return (
    <div {...attributes} className="py-2">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-6 caption">{formatSecond(element.data.start)}</div>
      </div>
      <div className="row">
        <div contentEditable={false} className="col-2 ">
          {isEditname ? (
            <EditSpeakerBox
              currentName={element.data.speaker}
              node={element}
              setEditName={setEditName}
            />
          ) : (
            <div className="text-right">
              <span onClick={() => setEditName(true)}>
                {element.data.speaker || "+ Add speaker"}
              </span>
            </div>
          )}
        </div>
        <div className="col-6">
          {/* {blockObject.children.map((i, inx) => (
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
          ))} */}
          {children}
        </div>
        <div contentEditable={false} className="col-3 comment-container">
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

export default React.memo(TestBlock);
