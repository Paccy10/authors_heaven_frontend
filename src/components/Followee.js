import React from 'react';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReadMoreAndLess from 'react-read-more-less';

const Follower = ({ followee }) => {
  return (
    <div className="follower">
      <Avatar
        src={followee.image ? followee.image.url : ''}
        className="avatar"
      />
      <div className="follower-details">
        <p className="name">
          {followee.firstname} {followee.lastname}
        </p>
        <div className="follower-bio">
          {followee.bio ? (
            <ReadMoreAndLess
              className="read-more-content"
              charLimit={150}
              readMoreText="Show more"
              readLessText="Show less"
            >
              {followee.bio}
            </ReadMoreAndLess>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="action">
        <button type="button">Unfollow</button>
      </div>
    </div>
  );
};

Follower.propTypes = {
  followee: PropTypes.object
};

export default Follower;
