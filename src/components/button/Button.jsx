import React, { memo } from 'react'

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  bg = "bg-black",
  text = "text-white"
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bg} ${text} px-6 py-3 ${className}`}
    >
      {children}
    </button>
  )
}

export default memo(Button)