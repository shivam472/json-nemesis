import { useState, useEffect, useContext } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import classes from "./UsersTable.module.css";
import NewUserForm from "./NewUserForm";
import { FormContext } from "./context/form-context";
import EditUserForm from "./EditUserForm";
import DeleteUserForm from "./DeleteUserForm";

const UsersTable = () => {
  const formCtx = useContext(FormContext);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();

  const tableStyle = {
    width: "90%",
    height: "650px",
    overflowY: "scroll",
  };

  const formVisibilityHandler = ({ user, userType }) => {
    formCtx.showForm(userType);
    setUserData(user);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setUsers(data);
      });
  }, []);

  return (
    <section className={classes["users-details"]}>
      {formCtx.formVisibility && formCtx.newUserFormVisibility && (
        <NewUserForm />
      )}
      {formCtx.formVisibility && formCtx.editUserFormVisibility && (
        <EditUserForm userData={userData} />
      )}
      {formCtx.formVisibility && formCtx.deleteUserFormIsVisibitity && (
        <DeleteUserForm userData={userData} />
      )}

      <TableContainer style={tableStyle} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.name}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell
                  style={{
                    width: "70px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      formVisibilityHandler({ user, userType: "EXISTING_USER" })
                    }
                  />
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      formVisibilityHandler({ user, userType: "DELETE_USER" })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.add}>
          <AddCircleOutlineOutlinedIcon
            style={{
              width: "50px",
              height: "50px",
              color: "grey",
              cursor: "pointer",
            }}
            onClick={() => formCtx.showForm("NEW_USER")}
          />
        </div>
      </TableContainer>
    </section>
  );
};

export default UsersTable;
