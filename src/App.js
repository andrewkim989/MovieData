import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchError: "",
      submit: false,
      data: "",
      found: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    var search = event.target.value;
    this.setState({search: search});

    if (search.length === 0) {
      this.setState({searchError: "Please fill in the text field", submit: false});
    }
    else {
      this.setState({searchError: "", submit: true});
    }
  }

  submit(e) {
    fetch("http://www.omdbapi.com/?t="+ this.state.search + "&apikey=a128c9e8")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.Error) {
            this.setState({searchError: "Movie or TV show not found", found: false});
          }
          else {
            this.setState({data: result, found: true});
            this.data();
          }
        },
        (error) => {
          this.setState({searchError: "Bad request", found: false});
        }
      )
    this.setState({search: "", submit: false});
    e.preventDefault();
  }

  movie() {
    return (
      <div id = "movieform">
        <form onSubmit = {this.submit}>
          <div className = "error">{this.state.searchError}</div>
          <input type = "text" name = "name" value = {this.state.search}
          placeholder = "Type in the name of the movie here"
          onChange = {this.handleChange} size = "40"></input>

          <input type = "submit" className = "btn btn-primary" disabled = {!this.state.submit}
          value = "Search"></input>
        </form>
      </div>
    )
  }

  data() {
    return (
      <div id = "data">
        <p><b>Title:</b> {this.state.data.Title}</p>
        <p><b>Year:</b> {this.state.data.Year}</p>
        <p><b>Rated:</b> {this.state.data.Rated}</p>
        <p><b>Released:</b> {this.state.data.Released}</p>
        <p><b>Length:</b> {this.state.data.Runtime}</p>
        <p><b>Genre:</b> {this.state.data.Genre}</p>
        <p><b>Director:</b> {this.state.data.Director}</p>
        <p><b>Plot:</b> {this.state.data.Plot}</p>
        <p><b>Box Office:</b> {this.state.data.BoxOffice}</p>
        <p><b>Production:</b> {this.state.data.Production}</p>
      </div>
    )
  }

  render() {
    return (
      <div className = "App">
        <h1>Movie Data</h1><br></br>
        {this.movie()}
        <div id = "blackline"></div>
        {this.state.found ? this.data(): null}
      </div>
    );
  }
}

export default App;
