import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import './BookmarkItem.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function deleteBookmarkRequest(bookmarkId, cb) {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE'/*,
    
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
    */
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
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      cb(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
  }

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => {
        //console.log(context);
        return (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
            <Link to={`/edit/${props.id}`}>Edit Bookmark</Link>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              onClick={() => {deleteBookmarkRequest(
                                  props.id,
                                  context.deleteBookmark
              )}}
            >
              Delete
            </button>
          </div>
        </li>
        )}
      }
    </BookmarksContext.Consumer>
  )
}
/*
BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: "",

}
*/
/*
BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
};
*/