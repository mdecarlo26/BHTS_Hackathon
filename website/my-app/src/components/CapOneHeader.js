import { useState,useEffect } from "react";

export default function CapOneHeader({balance,firstName,lastName,acctDigits}){
    return (
        <header>
            <img
                id="logo"
                src="https://logos-world.net/wp-content/uploads/2021/04/Capital-One-Emblem.jpg"
            />
            <span id="left-text"><div class = "upper-left-text">Hello, {firstName} {lastName}</div> <br/><div class = "lower-left-text"></div> Checking ...{acctDigits}</span>
            <span id="right-text">${balance.dollars}.{('0' + balance.cents.toString()).slice(-2)} <br/> Available Balance</span>
		</header>
    )
}