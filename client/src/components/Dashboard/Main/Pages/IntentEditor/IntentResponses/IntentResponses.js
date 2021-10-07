import React, { useState } from "react";

//Styles
import "./IntentResponses.css";

const IntentResponses = ({
  isMultiActive,
  responses,
  multiIntents,
  setMultiIntents,
  setResponses,
}) => {
  const [dropId, setDropId] = useState(null);
  const [newRes, setNewRes] = useState("");

  const sortFunc = (a, b) => {
    if (a.intentName < b.intentName) {
      return -1;
    }
    if (a.intentName > b.intentName) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="intentResponses">
      {(isMultiActive ? multiIntents : responses).map((res, i) => (
        <>
          <div className="intent__response" key={i}>
            <div className="intent__response__left">
              <span className="intent__num">{i + 1}</span>
              <div className="intent__response__text">
                {isMultiActive ? res.intentName : res}
              </div>
            </div>
            <div className="intent__response__right">
              <i
                className="fas fa-trash text-danger"
                onClick={() =>
                  setResponses((prev) => prev.filter((item) => item !== res))
                }
              ></i>

              {isMultiActive && (
                <i
                  className={`fas fa-chevron-right text-danger intentResponses__drop ${
                    dropId === i ? "intentResponses__drop__active" : ""
                  }`}
                  onClick={() => {
                    setDropId(dropId === i ? null : i);

                    setResponses((prev) => prev.filter((item) => item !== res));
                  }}
                ></i>
              )}
            </div>
          </div>
          {dropId === i && isMultiActive && (
            <div className="intentResponses__multires">
              {res.responses?.sort(sortFunc).map((response, i) => (
                <div className="intentResponses__multires__input" key={i}>
                  <div className="intentResponses__multires__input__left">
                    <span className="intent__num">{i + 1}</span>

                    {response}
                  </div>
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      setMultiIntents((prev) =>
                        [
                          ...prev.filter(
                            ({ intentName }) => intentName !== res.intentName
                          ),
                          {
                            ...res,
                            responses: [
                              ...res.responses.filter(
                                (res) => res !== response
                              ),
                            ],
                          },
                        ].sort(sortFunc)
                      );
                    }}
                  />
                </div>
              ))}
              {res.responses?.length < 5 && (
                <div className="intentResponses__multires__input">
                  <input
                    placeholder="New Response"
                    value={newRes}
                    onChange={(e) => setNewRes(e.target.value)}
                  />
                  <div
                    className="intentResponses__multires__input_add"
                    onClick={() => {
                      if (newRes) {
                        setMultiIntents((prev) =>
                          [
                            ...prev.filter(
                              ({ intentName }) => intentName !== res.intentName
                            ),
                            { ...res, responses: [...res.responses, newRes] },
                          ].sort(sortFunc)
                        );
                        setNewRes("");
                      }
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default IntentResponses;
