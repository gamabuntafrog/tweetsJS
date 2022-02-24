import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2';
import tweets from "../../tweets.csv";
import Papa from "papaparse";
var $ = require("jquery")


const Sentiment = () => {

    const [virginAmerica, setVirginAmerica] = useState(0);
    const [united, setUnited] = useState(0);
    const [usAirlines, setUsAirlines] = useState(0);
    const [american, setAmerican] = useState(0);
    const [southwest, setSouthwest] = useState(0);
    const [delta, setDelta] = useState(0);
    const [body, setBody] = useState([]);
    const [typeOfSentiment, setTypeOfSentiment] = useState('positive')

    const labels = [
        'Virgin America',
        'United',
        'US Airways',
        'American',
        'Southwest',
        'Delta',
    ];

    useEffect(() => {


        $.ajax({
            url: `${tweets}`,
            dataType: 'text',
        }).done(successFunction);

        function successFunction(data) {
            Papa.parse(data, {
                complete: function(res){
                    let array = []
                    res.data.map((row, i) => {
                        if (i === 0) {
                            return
                        } else {
                            // setBody(body.concat(row))
                            array.push(row.filter((el, i) => {
                                if (i === 10) {
                                    return el
                                } else if (i === 5) {
                                    return el
                                } else if (i === 1) {
                                    return el
                                } else {
                                    return
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
        const positiveSentiment = body.filter(el => {

            if (el[0] === `${typeOfSentiment}`) {
                return el
            } else {
                return
            }
        })

        let vA = 0
        let united = 0
        let uA = 0
        let american = 0
        let southwest = 0
        let delta = 0


        positiveSentiment.forEach((el, i) => {

            if (el[1] === 'Virgin America') {
                vA++;
            } else if (el[1] === 'United') {
                united++;
            } else if (el[1] === 'US Airways') {
                uA++;
            } else if (el[1] === 'American') {
                american++
            } else if (el[1] === 'Southwest') {
                southwest++
            } else if (el[1] === 'Delta') {
                delta++
            }
            if (i === positiveSentiment.length - 1) {
                setVirginAmerica(vA)
                setUnited(united)
                setUsAirlines(uA)
                setAmerican(american)
                setSouthwest(southwest)
                setDelta(delta)
            }
        })
    }, [body, typeOfSentiment]);

    const data = {
        labels: labels,
        datasets: [{
            label: `${typeOfSentiment} sentiment`,
            backgroundColor: 'rgb(255,99,132)',
            borderColor: 'rgb(255,41,84)',
            data: [virginAmerica, united, usAirlines, american, southwest, delta],
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
                <button onClick={(e) => setTypeOfSentiment(e.target.name)} type={'button'} name={'positive'}>Positive</button>
                <button onClick={(e) => setTypeOfSentiment(e.target.name)} type={'button'} name={'neutral'}>Neutral</button>
                <button onClick={(e) => setTypeOfSentiment(e.target.name)} type={'button'} name={'negative'}>Negative</button>
            </div>
        </div>
}


export default Sentiment;