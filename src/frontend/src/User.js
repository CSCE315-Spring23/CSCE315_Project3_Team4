import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const User = {
    name: "null",
    email: "null",
    isManager: false
};

function CreateUser(name, email) {
    this.name = name;
    this.email = email;
    this.isManager = checkManager(name, email);
}

function checkManager(name, email) {
    // Ask backend to verify managerial status of user
    return false;
}

export default User;