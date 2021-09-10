import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

const AddReview = props => {

  const editorRef = React.useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const { userDetails } = props 

  let initialReviewState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = content => {
    setReview(content);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: userDetails.user.first_name + " " +  userDetails.user.last_name,
      user_id: userDetails.user._id,
      restaurant_id: props.match.params.id
    };

    console.log(data)

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.error(e);
        });
    }

  };

  return (
    <div>
      {props.userDetails ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
            </div>
            <div className="form-group">
          <Editor 
            apiKey="0c11zgw76m63mtaljiuo3p5gd7h9vsse7g0gqka0dwh62xcj"
            onInit={(evt, editor) => editorRef.current = editor}
            value={review}
            onEditorChange={handleInputChange}
            required

            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
           />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;