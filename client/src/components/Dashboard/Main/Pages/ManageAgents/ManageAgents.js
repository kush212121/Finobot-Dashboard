import React, { useEffect, useState } from "react";

import "./ManageAgents.css";

//Components
import AgentCard from "./AgentCard/AgentCard";
import {
  getAllAgents,
  createAgent,
  deleteAgent,
  updateAgent,
} from "../../../../../api/regOrgApi";
import setAuthToken from "../../../../../api/setAuthToken";

//Extension
import swal from "sweetalert";

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAgents = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("finnToken");
    setAuthToken(token);

    console.log({ token });

    try {
      const agents = await getAllAgents();
      setAgents(agents.data);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const saveAgent = async (data) => {
    setIsLoading(true);

    try {
      const res = await createAgent(data);
      await fetchAgents();
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const delAgent = async (agentId) => {
    setIsLoading(true);
    try {
      const res = await deleteAgent(agentId);
      await fetchAgents();
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const upAgent = async (agentId, data) => {
    setIsLoading(true);

    try {
      const res = await updateAgent(agentId, data);
      await fetchAgents();
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="manageAgents dashboard__page">
      <h1 className="manageOrgs__heading">
        Agents <span>Panel</span>
      </h1>

      {isLoading ? (
        <i
          className={`fas fa-sync-alt ${isLoading ? "reload-rotate" : ""}`}
          onClick={() => {
            setIsLoading(true);
            fetchAgents();
          }}
        ></i>
      ) : (
        <div className="manageAgents__grid">
          <AgentCard saveAgent={saveAgent} isAdd />
          {agents.map(({ _id, name, email }) => (
            <AgentCard
              key={_id}
              agentId={_id}
              agentName={name}
              agentEmail={email}
              delAgent={delAgent}
              upAgent={upAgent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAgents;
