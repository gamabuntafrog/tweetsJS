import {useEffect, useState} from "react";
import {Bar, Line} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import tweets from "../../tweets.csv";
import Papa from "papaparse";
var $ = require("jquery")


const Reasons = () => {

    const [body, setBody] = useState([]);
    const [typeOfCompany, setTypeOfCompany] = useState('Virgin America')
    const [reasons, setReasons] = useState({});

    const labels = [
        'Bad Flight',
        'Late Flight',
        'Can\'t Tell ',
        'Customer Service Issue',
        'Flight Attendant Complaints',
        'Flight Booking Problems',
        'Cancelled Flight',
        'Damaged Luggage',
        'longlines'
    ];

    useEffect(() => {

        $.ajax({
            url: `${tweets}`,
            dataType: 'text',
        }).done(successFunction);

        function successFunction(data) {
            Papa.parse(data, {
                complete: function(res) {
                    let array = []
                    res.data.map((row, i) => {
                        if (i === 0) {
                            return
                        } else {
                            array.push(row.filter((el, i) => {
                                if (i === 3) {
                                   return el
                                }
                                if (i === 5) {
                                    return el
                                }
                            }))
                        }
                        if (i === res.data.length - 1) {
                            setBody(array)
                        }
                    })
                }
            })
        }

    }, []);

    useEffect(() => {
        const reasons = body.filter(el => {

            if (el[1] === `${typeOfCompany}`) {
                return el
            } else {
                return
            }
        })

        let bF = 0
        let cT = 0
        let lF = 0
        let cSI = 0
        let fAC = 0
        let cF = 0
        let longlines = 0
        let fBP = 0
        let dL = 0

        reasons.filter((el, i) => {


            if (el[0] === 'Bad Flight') {
                bF++
            } else if (el[0] === 'Late Flight') {
                lF++
            } else if (el[0] === 'Can\'t Tell') {
                cT++
            } else if (el[0] === 'Customer Service Issue') {
                cSI++
            } else if (el[0] === 'Flight Attendant Complaints') {
                fAC++
            } else if (el[0] === 'Flight Booking Problems') {
                fBP++
            } else if (el[0] === 'Cancelled Flight') {
                cF++
            } else if (el[0] === 'Damaged Luggage') {
                dL++
            } else if (el[0] === 'longlines') {
                longlines++
            }

            if (i === reasons.length - 1) {
                setReasons({
                    badFlight: bF,
                    lateFlight: lF,
                    cantTell: cT,
                    customerServiceIssue: cSI,
                    flightAttendantComplaints: fAC,
                    flightBookingProblems: fBP,
                    cancelledFlight: cF,
                    damagedLuggage: dL,
                    longlines: longlines
                })
            }
        })


    }, [body, typeOfCompany]);


    const data = {
        labels: labels,
        datasets: [{
            label: `${typeOfCompany}`,
            backgroundColor: 'rgb(255,99,132)',
            borderColor: 'rgb(255,41,84)',
            data: [
                reasons.badFlight,
                reasons.lateFlight ,
                reasons.cantTell,
                reasons.customerServiceIssue ,
                reasons.flightAttendantComplaints,
                reasons.flightBookingProblems,
                reasons.cancelledFlight,
                reasons.damagedLuggage,
                reasons.longlines
            ],
        }]
    };

    return <div>

        <div style={{height: 400}}>
            <Line
                data={data}
                height={400}
                width={500}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
        <div>
            <button type={'button'} name={'Virgin America'} onClick={(e) => setTypeOfCompany(e.target.name)}>Virgin America</button>
            <button type={'button'} name={'United'} onClick={(e) => setTypeOfCompany(e.target.name)}>United</button>
            <button type={'button'} name={'US Airways'} onClick={(e) => setTypeOfCompany(e.target.name)}>US Airways</button>
            <button type={'button'} name={'Southwest'} onClick={(e) => setTypeOfCompany(e.target.name)}>Southwest</button>
            <button type={'button'} name={'Delta'} onClick={(e) => setTypeOfCompany(e.target.name)}>Delta</button>
            <button type={'button'} name={'American'} onClick={(e) => setTypeOfCompany(e.target.name)}>American</button>

        </div>
    </div>
}


export default Reasons;