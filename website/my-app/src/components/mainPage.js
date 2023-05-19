import './mainPage.css'
import { useState,useEffect } from 'react';
import goFetch from './goFetch'
import CapOneHeader from './CapOneHeader';
import GraphComponent from './GraphComp';

export default function MainPage(){
    const acct_id = '98765432-10fe-dcba-9876-543210fedcba';
    const base_path = 'http://localhost:8080/'

    const [acctInfo,setAcctInfo] = useState({});
    const [semester,setSemester] = useState({})
    useEffect(()=>{
        const uri1 = base_path + `account/${acct_id}`;
        const uri2 = base_path + `semester/${acct_id}`
        goFetch(uri1,setAcctInfo)
        goFetch(uri2,setSemester)
    },[])

    // useEffect(()=>{
    //     console.log("test",typeof(semester.end_date))
    // },[semester])


    const sampleData = [
        { x: '2023-01-01', y: 100 },
        { x: '2023-02-01', y: 150 },
        { x: '2023-03-01', y: 200 },
        { x: '2023-04-01', y: 180.75 },
        { x: '2023-05-01', y: 220 },
        { x: '2023-06-01', y: 300 },
      ];
    return (
		<div>
            {acctInfo.available_balance && semester.end_date &&(
                <CapOneHeader balance={acctInfo.available_balance} firstName={acctInfo.first_name} lastName={acctInfo.last_name} acctDigits={acctInfo.acct_num.slice(acctInfo.acct_num.length-4)}/>
            )};
          
            {acctInfo.available_balance && semester.end_date &&(
			<div id="middle-row">
				<div class="middle-box">
					<div class="upper-middle-box">
                        <h3>Remaining Balance For Semester</h3>
                    </div>
					<div class="lower-middle-box">
                        ${acctInfo.available_balance.dollars}.{('0' + acctInfo.available_balance.cents.toString()).slice(-2)} &emsp; &emsp;  &emsp; until {semester.end_date.substr(5,2)}/{semester.end_date.substr(8,2)}/{semester.end_date.substr(0,4)}
                    </div>
                </div>
			
            	
				
                <div class="middle-box">
                        <div class="upper-middle-box">
                            <h3>Remaining Balance For The Week</h3>
                        </div>
                        <div class="lower-middle-box">$ 75.00 &emsp; &emsp;  &emsp; &emsp; until 05/07/2023
                        </div>
                </div>
            </div>
            )};

			<div id="bottom-row">
              <div class = "bottom-middle-box">
                      Weekly Summary
                </div>
                <div class="graph">
                    <GraphComponent data={sampleData} in_width={1250} in_height={600} padding={90}/>
                </div>

                <div class="graph">
                    <GraphComponent data={sampleData} in_width={1250} in_height={600} padding={90}/>
                </div>
			</div>
		</div>
	);
}