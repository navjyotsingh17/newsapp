import React from 'react'

const NewsItem = (props) => {
    //mentioing all the props values which are getting passed as props in this component from the News component
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            {/* making a card component so that my news can render in that */}
            <div className="card">
                {/* setting the styles for the card component */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "absolute",
                    right: "0"
                }}>
                    {/* creating the badge component to display source of each news */}
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>

                {/* setting the image of each news to some other image if the image of that particlar news is not present */}
                <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    {/* defining title, description, author, date and button for the each news */}
                    <h5 className="card-title">{!title ? "No Title" : title}  </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewsItem
