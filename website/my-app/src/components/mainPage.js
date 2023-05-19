import './mainPage.css'
import { useState,useEffect } from 'react';
import goFetch from './goFetch'
import CapOneHeader from './CapOneHeader';

export default function MainPage(){
    const acct_id = '98765432-10fe-dcba-9876-543210fedcba';
    const [acctInfo,setAcctInfo] = useState({});
    useEffect(()=>{
        const uri = `http://localhost:8080/account/${acct_id}`;
        goFetch(uri,setAcctInfo)
    },[])

    useEffect(()=>{
        console.log("test",acctInfo)
    },[acctInfo])

    return (
		<div>
            {acctInfo.available_balance &&(
                <CapOneHeader balance={acctInfo.available_balance} firstName={acctInfo.first_name} lastName={acctInfo.last_name} acctDigits={acctInfo.acct_num.slice(acctInfo.acct_num.length-4)}/>
            )};           

			<div id="middle-row">
				<div class="middle-box">
					<div class="upper-middle-box">Remaining Balance For Spring Semester</div>
					<div class="lower-middle-box">$ 500.00 &emsp; &emsp;  &emsp; &emsp; until 05/2023</div>
				</div>
				
				
				<div class="middle-box">
					<div class="upper-middle-box">Remaining Balance For The Week</div>
					<div class="lower-middle-box">$ 75.00 &emsp; &emsp;  &emsp; &emsp; until 05/07/2023 </div>
					</div>
			</div>

			<div id="bottom-row">
				<div class="graph">
			
					
					<h1>hi</h1>
                </div>
			</div>
		</div>
	);
}