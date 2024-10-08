import { useState } from "react";
import { useMutation} from '@apollo/client';

import { ADD_THOUGHT} from '../../utils/mutations';
import { QUERY_THOUGHTS } from '../../utils/queries';

const ThoughtForm = () => {
    const [formState, setFormState] = useState({
        thoughtText: '',
        thoughtAuthor: ''
    });

const [characterCount, setCharacterCount] = useState(0);

const [addThought, {error}] = useMutation(ADD_THOUGHT, {
    refetchQueries: [
        QUERY_THOUGHTS,
        'getthoughts'
    ]
});

const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const { data } = await addThought({
            variables: {...formState},
        });

        setFormState({
            thoughtText:'',
            thoughtAuthor:'',
        });
    } catch (err) {
        console.error(err);
    }
};

const handleChange = (event) => {
    const { name, value} = event.target;

    if(name === 'thoughtText' && value.length <= 200) {
        setFormState({ ...formState, [name]: value});
        setCharacterCount(value.length);
    } else if (!name === 'thoughtText') {
        setFormState({ ...formState, [name]: value});
    }
};

    return(
        <div>
            <h3>What is on your mind</h3>

            <p className={`m-3 ${characterCount === 200 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/200 {error && <span className="m1-2">
                Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-center" onChange={handleFormSubmit}>

                <div className="col-12">
                    <textarea name="thouthText" 
                    placeholder="Here is a thought"
                    value={formState.thoughtText}
                    className="form-input w-100"
                    style={{ lineHeight: '1.5'}}
                    onChange={handleChange} id=""></textarea>
                </div>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-primary btn-block py-3" type="submit">Add Thought</button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">Something went wrong...</div>
                )}
            </form>
        </div>
    );
};


export default ThoughtForm;