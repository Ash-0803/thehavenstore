import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../UserSlice";

export function UserProfile() {
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  return <div>{userInfo}</div>;
}
