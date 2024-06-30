import React from 'react'

function Button({title, ...props}) {
  return (
    <button className={`btn btn-outline btn-default ` } {...props} >{title}</button>
  )
}

export default Button