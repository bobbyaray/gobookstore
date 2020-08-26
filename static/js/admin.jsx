class Admin extends React.Component{
    render() {
        return (
            <div>
                <BookForm/>
                <br/>
                <BookList/>
        </div>);
      }
}

class BookForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookname: '',
      author: '',
      isbn: '',
      price: 0,
      publisher: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    fetch('http://localhost:8080/book/add', {
      method: 'post',
      body: JSON.stringify(this.state)
    });

    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then(data => this.setState({ books: data }));

    this.BookList.render();
    event.preventDefault();
  }

    render(){
        return(
            <div>
            <h2>Add a new book</h2>
            <form onSubmit={this.handleSubmit}>
            <label>
              Name: &nbsp;
              <input name="bookname" type="text" value={this.state.bookname} onChange={this.handleChange} />
            </label><br/>
            <label>
              Author: &nbsp;
              <input name="author" type="text" value={this.state.author} onChange={this.handleChange} />
            </label><br/>
            <label>
              ISBN: &nbsp;
              <input name="isbn" type="text" value={this.state.isbn} onChange={this.handleChange} />
            </label><br/>
            <label>
              Price: &nbsp;
              <input name="price" type="number" value={this.state.price} onChange={this.handleChange} />
            </label><br/>
            <label>
              Publisher: &nbsp;
              <input name="publisher" type="text" value={this.state.publisher} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
          </form>  
          </div>
        );
    }
}

class BookList extends React.Component{
    render(){
        var tableRows = null;
        if(this.state != null){
          tableRows = this.state.books.map((row, i) => 
          <tr><td>{row.bookname}</td><td>{row.author}</td><td>{row.isbn}</td><td>${row.price}</td><td><button type="button" class="btn btn-danger">Delete</button></td></tr>
          );
        }

        return(     
            <div>   
                <h2>Current Books</h2>
        <table className="table">
        <thead className="thead-dark"><tr><th>Name</th><th>Author</th><th>ISBN</th><th>Price</th><th>Options</th></tr></thead>
        <tbody>
          {tableRows}  
        </tbody>
      </table></div>);
    }

    componentDidMount() {
        fetch('http://localhost:8080/books')
          .then(response => response.json())
          .then(data => this.setState({ books: data }));
      }
}

ReactDOM.render(<Admin />, document.getElementById('admin'));