import { useState,useEffect } from "react";

export default function CapOneHeader({balance,firstName,lastName,acctDigits}){
    return (
            <header>
			<img
				id="logo"
				src="https://logos-world.net/wp-content/uploads/2021/04/Capital-One-Emblem.jpg"
			/>
			<span id="left-text">Hello, {firstName} {lastName}<br/> Checking ...{acctDigits}</span>
			<span id="right-text">${balance.toFixed(2)} <br/> Available Balance</span>
		</header>
    )
}