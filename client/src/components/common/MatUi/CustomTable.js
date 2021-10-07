import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function CustomTable({
  rows,
  handleApproveReject,
  isActiveOrg,
  setActiveEditOrgId,
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Organization Id</TableCell>
            <TableCell>Organization Name</TableCell>
            <TableCell align="center">Director Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Domain Name</TableCell>
            <TableCell align="center">First Number</TableCell>
            <TableCell align="center">Second Number</TableCell>
            <TableCell align="center">Actions</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="center">{row._id}</TableCell>
              <TableCell component="th" scope="row">
                {row.orgName}
              </TableCell>
              <TableCell align="center">{row.directorName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.domainName}</TableCell>
              <TableCell align="center">{row.firstNumber}</TableCell>
              <TableCell align="center">{row.secondNumber}</TableCell>
              <TableCell align="center">
                {row.isEmailSent && (
                  <>
                    <span>
                      <i className="fas fa-check text-success" /> Email Sent!
                    </span>
                    <br />
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleApproveReject(true, {
                          email: row.email,
                          orgId: row._id,
                        })
                      }
                    >
                      Resend
                    </button>
                  </>
                )}

                {/* {isActiveOrg && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleApproveReject(true, {
                        email: row.email,
                        orgId: row._id,
                      })
                    }
                  >
                    View
                  </button>
                )} */}

                <>
                  {!isActiveOrg && !row.isEmailSent && (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleApproveReject(true, {
                          email: row.email,
                          orgId: row._id,
                        })
                      }
                    >
                      Accept
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleApproveReject(false, row._id);
                    }}
                  >
                    {isActiveOrg ? "Delete" : "Reject"}
                  </button>
                </>
              </TableCell>
              <TableCell align="center">
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveEditOrgId(row._id)}
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
