import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ thoughtId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, {error}] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    thoughtId, commentText
                }
            });
            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value} = event.target;

        if(name === 'commentText' && value.length <= 200) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };

    return(
        <div>
            <h4>What are your thoughts on this thought?</h4>
            <p className={`m-0 ${
                characterCount ===200 || error ? 'text-danger' : ''
            }`}>
                Character Count: {characterCount}/200
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-center" 
            onSubmit={handleFormSubmit}>
        <div className="col-12 col-lg-9">
            <textarea name="commentText" 
            placeholder="Add You Comment"
            value={commentText}
            className="form-input w-100"
            style={{ lineHeight: '1.5'}}
            onChange={handleChange}></textarea>
        </div>
        
        <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
            </button>
        </div>
        </form>
        </div>
    );
};

export default CommentForm;