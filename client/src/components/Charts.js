import React from 'react'
import { useGlobalContext } from "../context/GlobalContext";
import { Pie } from "react-chartjs-2"

function Charts() {
  const {repos} = useGlobalContext();

  return (
    <div>
        <Pie/>
    </div>
  
  )
}

export default Charts
