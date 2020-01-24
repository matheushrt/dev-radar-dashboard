import React from 'react';
import styles from './Card.module.scss';

const Card: React.FC<{
  name: string;
  githubUserName: string;
  techs: string[];
  bio: string;
  avatarURL: string;
}> = ({ name, githubUserName, techs, bio, avatarURL }) => {
  return (
    <li className={styles.Card}>
      <div className="header">
        <div
          style={{
            backgroundImage: `url(${avatarURL})`
          }}
          className="avatar"
        ></div>
        <div className="user-info">
          <div className="name">{name}</div>
          <div className="techs">{techs.join(', ')}</div>
        </div>
      </div>
      <div className="body">{bio}</div>
      <a
        href={`https://github.com/${githubUserName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="footer"
      >
        See Github Profile
      </a>
    </li>
  );
};

export default Card;
