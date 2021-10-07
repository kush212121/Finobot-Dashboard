import React, { useEffect, useState } from "react";

// Styles
import "./ManageOrgs.css";

//MatUI
import CustomTable from "../../../../common/MatUi/CustomTable";
import {
  getAllRegOrgs,
  sendMail,
  deleteOrg,
} from "../../../../../api/regOrgApi";
import setAuthToken from "../../../../../api/setAuthToken";

//Components
import EditPartner from "./EditPartner/EditPartner";

//Extension
import swal from "sweetalert";

const ManageOrgs = () => {
  const [orgsData, setOrgsData] = useState([]);
  const [isActiveOrg, setIsActiveOrg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeEditOrgId, setActiveEditOrgId] = useState(null);

  const getOrgs = async (type) => {
    setIsLoading(true);
    try {
      setAuthToken(localStorage.getItem("finnToken"));
      const res = await getAllRegOrgs(type);
      console.log({ res });
      setOrgsData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log({ msg: error.message });
    }
  };

  useEffect(() => {
    getOrgs("orgs");
  }, []);

  const approveOrg = async (data) => {
    try {
      const res = await sendMail(data);
      console.log({ res });

      swal({
        title: "Good job!",
        text: "Organization Approved!",
        icon: "success",
        button: "Exit",
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteOrganization = async (orgId) => {
    const delType = isActiveOrg ? "orgs" : "regOrgs";

    try {
      const res = await deleteOrg(orgId, delType);
      console.log({ res });
      swal("Organization Deleted!", {
        icon: "success",
      });
      getOrgs(isActiveOrg ? "orgs" : "regOrgs");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleApproveReject = async (isApproved, data) => {
    if (isApproved) {
      await approveOrg(data);
      getOrgs(isActiveOrg ? "orgs" : "regOrgs");
    } else
      swal({
        title: "Are you sure?",
        text: "Once rejected, organization cannot be approved!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteOrganization(data);
        }
      });
  };

  return (
    <div className="manageOrgs dashboard__page">
      <h1 className="manageOrgs__heading">
        Welcome to <span>Finnobot!</span>
      </h1>
      {activeEditOrgId && (
        <EditPartner
          orgsData={orgsData}
          activeOrgId={activeEditOrgId}
          onClose={() => setActiveEditOrgId(null)}
          getOrgs={getOrgs}
        />
      )}

      <div className="manageOrgs__actions">
        <button
          className={`btn btn-primary${isActiveOrg ? "" : "-outlined"}`}
          onClick={() => {
            setIsLoading(true);
            setIsActiveOrg(true);
            getOrgs("orgs");
          }}
        >
          Active Organizations
        </button>
        <button
          className={`btn btn-primary${isActiveOrg ? "-outlined" : ""}`}
          onClick={() => {
            setIsLoading(true);
            setIsActiveOrg(false);
            getOrgs("regOrgs");
          }}
        >
          Pending Organizations
        </button>

        <i
          className={`fas fa-sync-alt ${isLoading ? "reload-rotate" : ""}`}
          onClick={() => {
            setIsLoading(true);
            getOrgs(isActiveOrg ? "orgs" : "regOrgs");
          }}
        ></i>
      </div>

      <br />

      {orgsData.length && !isLoading ? (
        <CustomTable
          rows={orgsData}
          handleApproveReject={handleApproveReject}
          isActiveOrg={isActiveOrg}
          setActiveEditOrgId={setActiveEditOrgId}
        />
      ) : isLoading ? (
        "Loading..."
      ) : (
        "No organizations"
      )}
    </div>
  );
};

export default ManageOrgs;
