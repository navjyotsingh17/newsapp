import React, { useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from 'react';

// a constant named as News
const News = (props) => {

    //different states to set states
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line
    const [page, setPage] = useState()
    const [totalResults, setTotalResults] = useState(0)

    //a function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //updateNews method to set the proggress bar above the navbar, show the loding gif, fetch the news from the news API endpoint, convert it into json and render on the client side
    const updateNews = async () => {
        props.setProgress(10);
        // in the below url value i have enterd back ticks so that i can write java script in it.

        const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=en`;
        setLoading(true)
        let data = await fetch(url); // here we have to write await because its a async fuction this returns a promise so we have to wait for this promise to get resolved
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setResults(parsedData.results)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    // use effect method whenever the page changes it changes the document title based on the category and also updateNews method is called to render the news based on the news props category
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey | Get your daily dose of news for free!`;
        updateNews();
        // eslint-disable-next-line
    }, []) // By providing an empty dependency array [], you are telling React that the effect has no dependencies and should only run once, when the component is initially rendered


    const fetchMoreData = async () => {

        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=en&page=16910840741654c31472926c1c75034df5eda00381`;
        setPage(results.nextPage)
        let data = await fetch(url);
        let parsedData = await data.json()
        setResults(results.concat(parsedData.results))
        setTotalResults(parsedData.totalResults)
    };


    return (
        <>
            {/* h1 tag here is to set the heading of the page based on the current news category */}
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {/* here i am showing the spinner gif based on the loading flag if it's true or false */}
            {loading && <Spinner />}

            {/* here in the InfiniteScroll tag i am setting the dataLength according to the articles parameter from the news API json response, then calling the fetchMoreData fuction to load more news, setting the hasMore variable comparing the articles parameter length from the API json reponse withe totalResults state */}
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={results.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">

                        {results.map((element) => {
                            // here the reason i have entered the key element as the url becoz the news url will be unique for each news
                            return <div className="col-md-4" key={element.link}>
                                {/* here i am mapping the different parameters of the articles array such as url, title, image url etc of the json response to a variable to the NewsItem component*/}
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.image_url} newsUrl={element.link} author={element.creator} date={element.pubDate} source={element.source_id} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )

}

export default News

//here i have set the default props value of the News componets becoz if in any case the actual props values are not getting passed these values gets passed as props and my app should not crash.
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'businesss',
}

// here i have set the propstype of the props so appropiate datatypes gets passed to each props.
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}