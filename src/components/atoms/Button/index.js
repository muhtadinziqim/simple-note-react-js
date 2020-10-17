import React, { Component } from 'react';

const Button = ({title, onClick, loading}) => {
    if (loading) {
        return <button disabled>Loading ... </button> 
    }
    return(
    <button onClick={onClick}>{title}</button>
    )
}

export default Button;