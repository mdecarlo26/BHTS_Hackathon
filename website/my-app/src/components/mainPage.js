import './mainPage.css'
import { useState,useEffect } from 'react';
import goFetch from './goFetch'
import CapOneHeader from './CapOneHeader';
import GraphComponent from './GraphComp';


function getWeeklyDates(startDate, endDate) {
    const dates = [];
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    
    // Convert start and end dates to milliseconds
    const startMs = new Date(startDate).getTime();
    const endMs = new Date(endDate).getTime();
    
    // Iterate from start date to end date with a weekly interval
    for (let currentMs = startMs; currentMs <= endMs; currentMs += oneWeek) {
      const currentDate = new Date(currentMs).toLocaleDateString();
      dates.push(currentDate);
    }
    
    return dates;
  }

function getWeeksBetweenDates(startDateStr, endDateStr) {
    const startDateParts = startDateStr.split('/').map(Number);
    const endDateParts = endDateStr.split('/').map(Number);
  
    // Construct Date objects using the parts of the date strings
    const startDate = new Date(startDateParts[2], startDateParts[0] - 1, startDateParts[1]);
    const endDate = new Date(endDateParts[2], endDateParts[0] - 1, endDateParts[1]);
  
    // Adjust the dates to midnight to avoid time zone inconsistencies
  
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
    const timeDifference = Math.abs(endDate - startDate);
    const numberOfWeeks = Math.ceil(timeDifference / oneWeekInMilliseconds);
  
    return numberOfWeeks;
  }
  

function formatDataArray(dataArray) {
    return dataArray.map((data) => {
      const { available_balance, date } = data;
      // Format the balance
  
      // Format the date
      const formattedDate = new Date(date).toLocaleDateString();
  
      return { y: Number(available_balance), x: formattedDate };
    });
  }

  function formatShopArray(dataArray) {
    return dataArray.map((data) => {
      const { amount, date } = data;
      // Format the balance
  
      // Format the date
      const formattedDate = new Date(date).toLocaleDateString();
  
      return { y: Number(amount), x: formattedDate };
    });
  }

function addBalancePrediction(dataArr,end_date,end_amount,curr_date){
    const weeklyDates = getWeeklyDates(curr_date,end_date);
    const timeDiff = getWeeksBetweenDates(curr_date,end_date)-1;
    const curr_bal = dataArr[dataArr.length-1].y
    const costDiff =  curr_bal- end_amount;
    const weeklySpend = Number((costDiff/timeDiff).toFixed(2));
    for (let i=1;i<weeklyDates.length;i++){
        dataArr.push({x:weeklyDates[i],y: (curr_bal - (i)*weeklySpend).toFixed(2)})
    }
}

function addSpendingPrediction(dataArr,end_date,end_amount,curr_date,curr_bal){
    const weeklyDates = getWeeklyDates(curr_date,end_date);
    const timeDiff = getWeeksBetweenDates(curr_date,end_date)-1;
    const costDiff =  curr_bal- end_amount;
    const weeklySpend = Number((costDiff/timeDiff).toFixed(2));
    for (let i=1;i<weeklyDates.length;i++){
        dataArr.push({x:weeklyDates[i],y: weeklySpend})
    }
    // console.log(dataArr)
}


export default function MainPage(){
    const acct_id = '98765432-10fe-dcba-9876-543210fedcba';
    const base_path = 'http://localhost:8080/'

    const [acctInfo,setAcctInfo] = useState({});
    const [semester,setSemester] = useState({});
    const [balance_history,setBalanceHistory] = useState([]);
    const [graphBalance,setGraphBalance] = useState([]);
    const [cutoff,setCutoff] = useState('');
    const [shop_history,setShopHistory] = useState([]);
    const [graphSpending,setGraphSpending] = useState([]);
    useEffect(()=>{
        const uri1 = base_path + `account/${acct_id}`;
        const uri2 = base_path + `semester/${acct_id}`;
        const uri3 = base_path + `balance/${acct_id}`;
        const uri4 = base_path + `history/${acct_id}`;
        goFetch(uri1,setAcctInfo)
        goFetch(uri2,setSemester)
        goFetch(uri3,setBalanceHistory)
        goFetch(uri4,setShopHistory)
    },[])

    useEffect(()=>{
        if (balance_history[0] && semester && acctInfo.uuid && shop_history[0]){
            const newarr = formatDataArray(balance_history);
            setCutoff(new Date(acctInfo.date_modified).toLocaleDateString())
            const prediction_data = addBalancePrediction(newarr,new Date(semester.end_date).toLocaleDateString(),Number(acctInfo.desired_saving_amount),new Date(acctInfo.date_modified).toLocaleDateString())
            setGraphBalance(newarr)

            const shopArr = formatShopArray(shop_history);
            addSpendingPrediction(shopArr,new Date(semester.end_date).toLocaleDateString(),Number(acctInfo.desired_saving_amount),new Date(acctInfo.date_modified).toLocaleDateString(),Number(balance_history[balance_history.length-1].available_balance))

            setGraphSpending(shopArr)

        }
    },[balance_history,semester,acctInfo,shop_history])

    useEffect(()=>{
        // console.log("show me the balance",graphBalance)
    },[graphBalance])


    const sampleData = [
        { x: '2023-01-01', y: 100 },
        { x: '2023-02-01', y: 150 },
        { x: '2023-03-01', y: 200 },
        { x: '2023-04-01', y: 180.7 },
        { x: '2023-05-01', y: 220 },
        { x: '2023-06-01', y: 300 },
      ];

    return (
		<div>
            {acctInfo.uuid && semester.end_date &&(
                <CapOneHeader balance={acctInfo.available_balance} firstName={acctInfo.first_name} lastName={acctInfo.last_name} acctDigits={acctInfo.acct_num.slice(acctInfo.acct_num.length-4)}/>
            )};
          
            {acctInfo.uuid && semester.end_date &&(
			<div id="middle-row">
				<div className="middle-box">
					<div className="upper-middle-box">
                        <h3>Remaining Balance For Semester</h3>
                    </div>
					<div className="lower-middle-box">
                        ${acctInfo.available_balance} &emsp; &emsp;  &emsp; until {semester.end_date.substr(5,2)}/{semester.end_date.substr(8,2)}/{semester.end_date.substr(0,4)}
                    </div>
                </div>
			
            	
				
                <div className="middle-box">
                        <div className="upper-middle-box">
                            <h3>Remaining Balance For The Week</h3>
                        </div>
                        <div className="lower-middle-box">$ 75.00 &emsp; &emsp;  &emsp; &emsp; until 05/07/2023
                        </div>
                </div>
            </div>
            )};
            {acctInfo.uuid &&(
			<div id="bottom-row">
              <div className = "bottom-middle-box">
                      Weekly Summary<br/>
                      Desired Amount Remaining After Semester: ${acctInfo.desired_saving_amount}
                </div>
                <div>
                    <h3>Red Lines and Points Indicate Future Values</h3>
                </div>
                {graphBalance[0] && cutoff &&(
                    <div className="graph">
                        <GraphComponent data={graphBalance} in_width={1250} in_height={600} padding={90} cutoff={new Date(cutoff)} y_label={'Balance ($)'} title={'Balance Throughout the Semester'}/>
                    </div>
                )};                
                {graphSpending[0] && cutoff &&(
                <div className="graph">
                    <GraphComponent data={graphSpending} in_width={1250} in_height={600} padding={90} cutoff={new Date(cutoff)} y_label={'Spending ($)'} title={'Spending Throughout the Semester'}/>
                </div>
                )};
			</div>
            )}
		</div>
	);
}
