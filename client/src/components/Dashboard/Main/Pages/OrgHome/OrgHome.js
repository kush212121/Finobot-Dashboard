import React, { useState } from "react";

// Styles
import "./OrgHome.css";

import "highlight.js/styles/an-old-hope.css";

import { useSelector } from "react-redux";

const OrgHome = () => {
  const { apiCallsLeft, messagesLeft, orgName } = useSelector(
    (state) => state.auth.user
  );

  const [copiedState, setCopiedState] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  const stepsData = {
    step1: {
      title: "Step 1: Add styles file to head tag of your website",
      code: `<link
          href="https://finnobot.s3.eu-west-2.amazonaws.com/main.css"
          rel="stylesheet"
        />`,
    },
    step2: {
      title: "Step 2: Place the following html tag in your website's markup.",
      code: `<div id="finnobot"></div>`,
    },
    step3: {
      title:
        "Step 3: Place the follwing scripts in the body tag just before the body closing tag",
      text: `
        <script src="https://finnobot.s3.eu-west-2.amazonaws.com/app.js"></script>
        <script src="https://finnobot.s3.eu-west-2.amazonaws.com/main.js"></script>
        <script src="https://finnobot.s3.eu-west-2.amazonaws.com/2.js"></script>
      `,
      code: (
        <div>
          {`<script src="https://finnobot.s3.eu-west-2.amazonaws.com/app.js"></script>`}
          <br />
          {`<script src="https://finnobot.s3.eu-west-2.amazonaws.com/main.js"></script>`}
          <br />
          {`<script src="https://finnobot.s3.eu-west-2.amazonaws.com/2.js"></script>`}
        </div>
      ),
    },
  };
  const handleCopy = (key) => {
    const { text, code } = stepsData[key];

    navigator.clipboard.writeText(text || code);
    setCopiedState((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="orgHome dashboard__page">
      <h1 className="manageOrgs__heading">
        Welcome to <span>Finnobot!</span> {orgName}
      </h1>

      <div className="orgHome__ins__grid">
        <div className="orgHome__ins__col">
          <h2>Your Plan</h2>

          <div className="orgHome__stats">
            <div className="orgHome__stats__col">
              <div className="orgHome__stat__title">API Calls Left</div>
              <div
                className={`orgHome__stat__value ${
                  apiCallsLeft > 999 ? "text-success" : "text-danger"
                }`}
              >
                {apiCallsLeft}
              </div>
            </div>
            <div className="orgHome__stats__col">
              <div className="orgHome__stat__title">Messages Left</div>
              <div
                className={`orgHome__stat__value ${
                  messagesLeft > 999 ? "text-success" : "text-danger"
                }`}
              >
                {messagesLeft}
              </div>
            </div>
          </div>

          <br />
        </div>
        <div className="orgHome__ins__col">
          <h2>Quick Start</h2>
          <br />

          {Object.keys(stepsData).map((key) => {
            const { title, code } = stepsData[key];

            return (
              <div>
                <h3>{title}</h3>

                <div className="orgHome__code">
                  <code>
                    {code}

                    {copiedState[key] && (
                      <div className="text-success">
                        Copied to clipboard <i className="fas fa-check"></i>{" "}
                      </div>
                    )}

                    {!copiedState[key] && (
                      <div
                        className="orgHome__code__overlay"
                        onClick={() => handleCopy(key)}
                      >
                        <div>
                          Copy to clipboard
                          <i className="fas fa-clipboard"></i>
                        </div>
                      </div>
                    )}
                  </code>
                </div>

                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrgHome;
