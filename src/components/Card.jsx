export default function Card({ children, className = '' }) {
  return (
    <div
      className={`
        relative
        w-full
        max-w-sm
        rounded-2xl
        p-5
        bg-white/85
        backdrop-blur-md
        shadow-lg
        border border-pink-200
        transition-transform
        duration-300
        hover:scale-[1.02]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

import PropTypes from 'prop-types';

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
