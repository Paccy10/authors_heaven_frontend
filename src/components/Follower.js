import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReadMoreAndLess from 'react-read-more-less';

const Follower = ({ follower, followerId, followees }) => {
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    for (const followee of followees) {
      if (followee.followeeId === followerId) {
        setFollow(true);
      }
    }
  }, [followees]);

  return (
    <div className="follower">
      <Avatar
        src={follower.image ? follower.image.url : ''}
        className="avatar"
      />
      <div className="follower-details">
        <p className="name">
          {follower.firstname} {follower.lastname}
        </p>
        <div className="follower-bio">
          {follower.bio ? (
            <ReadMoreAndLess
              className="read-more-content"
              charLimit={150}
              readMoreText="Show more"
              readLessText="Show less"
            >
              {follower.bio}
            </ReadMoreAndLess>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="action">
        <button type="button">{follow ? 'Unfollow' : 'Follow'}</button>
      </div>
    </div>
  );
};

Follower.propTypes = {
  follower: PropTypes.object,
  followerId: PropTypes.number,
  followees: PropTypes.array
};

export default Follower;
