import React,{useEffect,useState} from "react";
import { getCategories } from "../admin/helper/adminapicall";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "text-white p-4",
  children
}) => {

 
  return(
  <div>
    <Menu />
    <div className="container-fluid">
      <div className={className}>{children}</div>
    </div>
    
  </div>
)};

export default Base;
