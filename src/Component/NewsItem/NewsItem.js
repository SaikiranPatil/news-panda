import React, { Component } from "react";
import "./style.css";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgSrc, url, publishedAt, author, source } =
      this.props;
    return (
      <>
        <div className="card m-3">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
            {source}
          </span>
          <img
            src={imgSrc}
            style={{ height: "10rem" }}
            className="card-img-top"
            alt="News Image"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text card-main">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                {new Date(publishedAt).toGMTString()} <br />{" "}
                {!author ? "Unknown" : `${author}`}
              </small>
            </p>
            <a href={url} className="btn btn-primary" target="_blank">
              View More
            </a>
          </div>
        </div>
      </>
    );
  }
}
