import React, { Component } from "react";
import NewsItem from "../NewsItem/NewsItem";
import Loading from "../Loading/Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
    if (!this.props.category === "") {
      document.title = `${this.capitalizeFirstLetter(
        this.props.category
      )} | News Monkey`;
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.updateNews();
  }

  nextPage = async () => {
    if (
      Math.ceil(this.state.totalResults / this.props.pageSize) >=
      this.state.page + 1
    ) {
      this.setState({ page: this.state.page + 1 });
      this.updateNews();
    }
  };

  prevPage = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  updateNews = async () => {
    this.props.setProgress(10);
    this.setState({ loading: true });
    var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&q=${this.props.search}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    this.props.setProgress(50);
    const decodedData = await data.json();
    console.log(decodedData,url);
    this.props.setProgress(80);
    this.setState({
      article: decodedData.articles,
      totalResults: decodedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  fetchMoreNews = async () => {
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true });
    var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&q=${this.props.search}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const decodedData = await data.json();
    console.log(decodedData,url);
    this.setState({
      article: this.state.article.concat( decodedData.articles),
      totalResults: decodedData.totalResults,
      loading: false,
    });
  };

  static propTypes = {
    country: PropTypes.string,
    apiKey: PropTypes.string,
    search: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  static defaultProps = {
    country: "in",
    // apiKey: "8ee742ab0c3047ae80479a98e184e620",
    apiKey: "cc567d01caa4475285ca63c9f8b1ce3d",
    search: "",
    category: "",
    pageSize: 12,
  };

  render() {
    return (
      <div className="container pt-5">
        <h3 className="text-center my-3">
          {" "}
          News Panda - Top Headlines{" "}
          {this.props.category
            ? `on ${this.capitalizeFirstLetter(this.props.category)}`
            : ""}{" "}
        </h3>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreNews}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div
            className="allNewsItem"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {this.state.article.map((element) => {
                return (
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgSrc={element.urlToImage}
                    url={element.url}
                    key={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                );
              })}
          </div>
        </InfiniteScroll>
        {/* <div className="button d-flex justify-content-between my-3 mx-5">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.prevPage}
          >
            &larr; Previous
          </button>
          <div className="page" style={{ lineHeight: "2rem" }}>
            Page {this.state.page} of{" "}
            {Math.ceil(this.state.totalResults / this.props.pageSize)}
          </div>
          <button
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) <
              this.state.page + 1
            }
            className="btn btn-primary"
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
