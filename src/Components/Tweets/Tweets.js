import tweets from '../../tweets.csv';
import Papa from 'papaparse'
import React, {useEffect, useState} from "react";
var $ = require("jquery")

const Tweets = () => {

    const [head, setHead] = useState([]);
    const [body, setBody] = useState([]);

    useEffect(() => {
        $.ajax({
            url: `${tweets}`,
            dataType: 'text',
        }).done(successFunction);

        function successFunction(data) {
            Papa.parse(data, {
                complete: function(res){
                    setHead(res.data[0].filter(el => {
                        if (el === 'text') {
                            return el
                        }
                        if (el === 'airline') {
                            return el
                        }
                        if (el === 'airline_sentiment') {
                            return el
                        }
                    }))

                    let array = []
                    res.data.map((row, i) => {
                        if (i === 0) {
                            return
                        } else {
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

    return (
        <table border='1'>
            <tbody>
            <tr>
                {head.map((el, i) => {
                    return <th key={i}>{el}</th>
                })}
            </tr>
            {body.map((element, i) => {

                return <tr key={i}>{element.map(el => {
                    return <td key={el}>{el}</td>
                })}</tr>
            })}
            </tbody>

        </table>
    )
}

export default Tweets;
