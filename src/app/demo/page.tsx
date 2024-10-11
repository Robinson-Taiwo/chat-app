/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useMemo } from 'react'
import {io} from "socket.io-client"

const page = () => {

const socket = useMemo(() => io("http://localhost:4000"), [])
socket.on("connect", ()=>{
    console.log("i am connected")
})

socket.on("message", (data, id)=>{
   console.log(data + "" + id)
})


  return (
    <div>
      this is the demo page
    </div>
  )
}

export default page
