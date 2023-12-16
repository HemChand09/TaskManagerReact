import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

export default function PrivateRoute({token, Component}) {
return (
  token ? <Component/> :  <Navigate to={'/signin'} replace/>

  )
}