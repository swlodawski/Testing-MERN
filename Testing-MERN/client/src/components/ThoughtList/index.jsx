import { Link } from 'react-router-dom';

const ThoughtList = ({thoughts, title}) => {
    if(!ThoughtList.length) {
        return <h3>No Thoughts Exist Yet!!!</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {thoughts && thoughts.map((thought) => {
            <div key={thought._id} className='card mb-3'>
                <h4 className='card-header bg-primary text-light p-2 m-0'>
                {thought.thoughtAuthor} <br />
                <span style={{ fontSize: '1rem'}}>
                    had this thought on {thought.createdAt}
                </span>
            </h4>
            <Link
            className='btn btn-primary btn-block btn-squared' to={`/thoughts${thought._id}`}>
                Join the discussio on this thought.
            </Link>
            </div>
            })}
        </div>
    );
};

export default ThoughtList;