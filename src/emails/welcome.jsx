import React from 'react'
import {Button,  Html} from "@react-email/components"

const welcome = () => {
  return (
    <Html>
        <Button
        href="https://game.com"
        style={{background: "#000", color:"#fff", padding: "12px 20px"}}>
            Click Me
        </Button>
    </Html>
  )
}

export default welcome