import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ value, text }) {
  console.log(value);
  return (
    <>
      <div className='rating'>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>
            {value >= index + 1 ? (
              <FaStar />
            ) : value >= index + 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}

        <span className='rating-text'>{text && text}</span>
      </div>
    </>
  );
}

export default Rating;
