import React, { useEffect, useState } from "react";
import {
  approveIntent,
  deleteIntent,
  getAllIntents,
  updateIntent,
} from "../../../../../api/regOrgApi";

// Styles
import "./IntentEditor.css";

//Extension
import swal from "sweetalert";
import IntentResponses from "./IntentResponses/IntentResponses";
import Loader from "../../../../common/Loader/Loader";
import AddNewIntent from "./AddNewIntent/AddNewIntent";
import { useSelector } from "react-redux";

const IntentEditor = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [newIntent, setNewIntent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [intents, setIntents] = useState([]);
  const [activeIntentId, setActiveIntentId] = useState(0);
  const [isMultiActive, setIsMultiActive] = useState(false);

  const [activeIntentName, setActiveIntentName] = useState(
    intents.filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))[
      activeIntentId
    ]?.intentName
  );
  const [isIntentNameEditable, setIsIntentNameEditable] = useState(false);
  const [responses, setResponses] = useState([]);
  const [multiIntents, setMultiIntents] = useState([]);

  const [isAddNewIntent, setIsAddNewIntent] = useState(false);

  const {
    auth: {
      user: { role },
    },
  } = useSelector((state) => state);

  const iAmAdmin = role === "admin";

  const fetchIntents = async () => {
    setIsLoading(true);
    try {
      const res = await getAllIntents();
      setIntents(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchIntents();
  }, []);

  useEffect(() => {
    setActiveIntentName(
      intents.filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))[
        activeIntentId
      ]?.intentName
    );
  }, [intents, activeIntentId]);

  useEffect(() => {
    if (intents[0])
      setResponses(
        intents.filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))[
          activeIntentId
        ]?.responses || []
      );

    setMultiIntents(
      intents.filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))[
        activeIntentId
      ]?.multiIntents || []
    );
  }, [activeIntentId, intents, isMultiActive]);

  const handleIntentUpdate = async () => {
    setIsLoading(true);

    try {
      console.log({
        responses,
      });

      if (isMultiActive) {
        const updatedIntent = await updateIntent(
          intents.filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))[
            activeIntentId
          ]._id,
          activeIntentName,
          responses,
          multiIntents
        );
        console.log({ updatedIntent });
      } else {
        const updatedIntent = await updateIntent(
          intents.filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))[
            activeIntentId
          ]._id,
          activeIntentName,
          responses
        );
        console.log({ updatedIntent });
      }

      setIsLoading(false);

      swal({
        title: "Good job!",
        text: "Intents Saved!",
        icon: "success",
        button: "Exit",
      });

      fetchIntents();
    } catch (error) {
      console.log({ err: error.response });
    } finally {
      setIsIntentNameEditable(false);
    }
  };

  useEffect(() => {
    console.log({ multiIntents });
  }, [multiIntents]);

  const handleIntent = () => {
    if (newIntent) {
      if (isMultiActive && multiIntents.length < 5) {
        setMultiIntents((prev) => [
          ...prev,
          { intentName: newIntent, responses: [] },
        ]);
      } else if (responses.length < 5) {
        setResponses((prev) => [...prev, newIntent]);
      }
      setNewIntent("");
    }
  };

  const handleDelete = async (intentName) => {
    try {
      console.log({ intentName });

      const res = await deleteIntent(intentName);
      console.log({ res });
      swal({
        title: "Good job!",
        text: "Intent Deleted!",
        icon: "success",
        button: "Exit",
      });
      fetchIntents();
      setResponses([]);
    } catch (error) {
      console.log({ err: error.response });
    }
  };

  const handleApprove = async (intentName) => {
    try {
      const res = await approveIntent(intentName);
      swal({
        title: "Good job!",
        text: "Intent Approved!",
        icon: "success",
        button: "Exit",
      });
      console.log({ res });
      fetchIntents();
    } catch (error) {
      console.log({ error: error.response });
    }
  };

  return (
    <div className="intentEditor dashboard__page">
      {isLoading && <Loader />}

      {isAddNewIntent && (
        <AddNewIntent
          onClose={() => setIsAddNewIntent(false)}
          fetchIntents={fetchIntents}
          isMultiActive={isMultiActive}
        />
      )}

      <h1 className="manageOrgs__heading">
        Intent <span>Editor</span>{" "}
      </h1>

      <div className="intentEditor__box">
        <div className="intentEditor__box__left">
          <h2 className="intentEditor__box__title">
            Intents
            {!iAmAdmin && (
              <div className="intentEditor__box__switch">
                <span className="badge badge-primary">single</span>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isMultiActive}
                    onChange={(e) => {
                      setActiveIntentId(0);
                      setIsMultiActive((prev) => !prev);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="badge badge-success">multi</span>
              </div>
            )}
          </h2>

          <div className="intentEditor__box__scroll">
            {!isMultiActive && !iAmAdmin && (
              <div
                className={`intentEditor__box__strip`}
                onClick={() => setIsAddNewIntent(true)}
              >
                <div className="intentName">Add New Intent</div>
                <i className="fas fa-plus-circle"></i>
              </div>
            )}
            {intents
              .sort((a, b) => b.isCustom - a.isCustom)
              .filter(({ isMulti }) => (isMultiActive ? isMulti : !isMulti))
              .map(({ intentName, _id, isMulti, isCustom, isApproved }, i) => (
                <div
                  className={`intentEditor__box__strip ${
                    activeIntentId === i
                      ? "intentEditor__box__strip__active"
                      : ""
                  }`}
                  key={_id}
                  onClick={() => setActiveIntentId(i)}
                >
                  <div className="intentName">
                    {intentName}{" "}
                    {isCustom && (
                      <span className="badge badge-warning">custom</span>
                    )}
                    {isCustom &&
                      (isApproved ? (
                        <span className="badge badge-success">approved</span>
                      ) : (
                        <span className="badge badge-danger">unapproved</span>
                      ))}
                    {isMulti ? (
                      <span className="badge badge-success">multi</span>
                    ) : (
                      <span className="badge badge-primary">single</span>
                    )}{" "}
                  </div>
                  <i className="fas fa-chevron-right"></i>
                </div>
              ))}
          </div>
        </div>
        <div className="intentEditor__box__right">
          <div className="intent__title">
            <div>
              {!isIntentNameEditable ? (
                <>
                  {activeIntentName} &nbsp;
                  <i
                    className="fas fa-pen"
                    onClick={() => setIsIntentNameEditable(true)}
                  ></i>
                </>
              ) : (
                <input
                  type="text"
                  value={activeIntentName}
                  onChange={(e) => setActiveIntentName(e.target.value)}
                  onBlur={() => setIsIntentNameEditable(false)}
                />
              )}
            </div>

            {intents[0] && (
              <div>
                {iAmAdmin && (
                  <>
                    {!intents.filter(({ isMulti }) =>
                      isMultiActive ? isMulti : !isMulti
                    )[activeIntentId]?.isApproved && (
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          handleApprove(
                            intents.filter(({ isMulti }) =>
                              isMultiActive ? isMulti : !isMulti
                            )[activeIntentId]?.intentName
                          )
                        }
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(
                          intents.filter(({ isMulti }) =>
                            isMultiActive ? isMulti : !isMulti
                          )[activeIntentId]?.intentName
                        )
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleIntentUpdate()}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <IntentResponses
            isMultiActive={isMultiActive}
            responses={responses}
            multiIntents={multiIntents}
            setMultiIntents={setMultiIntents}
            setResponses={setResponses}
          />

          <div className="intent__add">
            <input
              className={`intent__add__input ${
                isFocus ? "intent__add__input__focus" : ""
              }`}
              type="text"
              placeholder="New Response"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(e) => setNewIntent(e.target.value)}
              value={newIntent}
            />
            <i className="fas fa-plus" onClick={handleIntent}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentEditor;
