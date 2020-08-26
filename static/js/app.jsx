class App extends React.Component {
    render() {
      var tableRows = null;
      if(this.state != null){
        tableRows = this.state.books.map((row, i) => 
        <tr><th>{row.bookname}</th><th>{row.author}</th><th>{row.isbn}</th><th>${row.price}</th></tr>
        );
      }
      return (<table className="table">
        <thead className="thead-dark"><tr><th>Name</th><th>Author</th><th>ISBN</th><th>Price</th></tr></thead>
        <tbody>
          {tableRows}  
        </tbody>
      </table>);
    }

    componentDidMount() {
      fetch('http://localhost:8080/books')
        .then(response => response.json())
        .then(data => this.setState({ books: data }));
    }
}

ReactDOM.render(<App />, document.getElementById('app'));