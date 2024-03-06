import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { order, createOrderAsync, selectCount } from "./OrderSlice";

export function Order() {
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();

  return <div></div>;
}
