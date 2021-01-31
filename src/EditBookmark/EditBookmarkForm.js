import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import '../AddBookmark/AddBookmark.css';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
  )
  

export default class EditBookmarkForm extends Component {
  /* state for inputs etc... */
  /*
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`https://localhost:8000/api/bookmarks/${id}`, {
        method: 'GET'
    })
        //.then( some content omitted )
        .then(responseData => {
        this.setState({
            // fields state updates here 
        })
        })
        .catch(error => {// some content omitted })
    }
    */
    static contextType = BookmarksContext;

    constructor(props) {
        super(props)

        this.state = {
            error: null
        }
    }


    handleClickCancel = () => {
        this.props.history.push('/')
    };


    handleSubmit = e => {
        e.preventDefault()
        
        const { title, url, description, rating } = e.target
        const bookmark = {
          title: title.value,
          url: url.value,
          desc: description.value,
          rating: rating.value
        }
        this.setState({ error: null })
        console.log(JSON.stringify(bookmark))
        console.log(`http://localhost:8000/api/bookmarks/${this.props.match.params.id}`)
    
        fetch(`http://localhost:8000/api/bookmarks/${this.props.match.params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(bookmark),
        headers: {
          'content-type': 'application/json'
        }
        })
        .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then(error => {
                // then throw it
                throw error
              })
            }
            return res.json()
          })
        .then(responseData => {
            this.context.updateBookmark(responseData)
            console.log('bookmarks updated')
        })
        .catch(error => {
            this.setState({ error })
          })
    }

  render() {
    let error = {message: ''};
    if (this.state.error) {
        error = this.state.error;
    } 
    const currentBookmark = this.context.bookmarks.find(bookmark => bookmark.id == this.props.match.params.id);
    return (
      <section className='EditBookmarkForm'>
        <h2>Edit bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              //placeholder={currentBookmark.title}
              defaultValue={currentBookmark.title}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='url'
              id='url'
              //placeholder={currentBookmark.url}
              defaultValue={currentBookmark.url}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              //value={this.state.desc}
              //placeholder={currentBookmark.desc}
              defaultValue={currentBookmark.desc}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='rating'
              id='rating'
              //defaultValue='1'
              //min='1'
              //max='5'
              //value={this.state.rating}
              //placeholder={currentBookmark.rating}
              defaultValue={currentBookmark.rating}
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Update
            </button>
          </div>
        </form>

      </section>
    )
  }
}