import React from 'react'
import RestaurantDataService from '../services/restaurant.js'
import {Link} from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';

import Prism from "prismjs";
import "../css/prism.css";



const Restaurant = props => {

  const { userDetails } = props

  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = React.useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  React.useEffect(() => {
    console.log("Prism.highlightAll()")
    Prism.highlightAll()
  })

  const deleteReview = (reviewId, index) => {
    if(window.confirm("Do you really want to delete?")){
      RestaurantDataService.deleteReview(reviewId, userDetails.user._id)
      .then(response => {
        console.log(response)
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-12 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                        {ReactHtmlParser(review.text)}
                       <p className="card-text">
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {userDetails && userDetails.user._id === review.user_id &&
                          <div className="row">
                            <button onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</button>
                            <Link to={{
                              pathname: "/restaurants/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;