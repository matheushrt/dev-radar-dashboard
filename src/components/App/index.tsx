import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Sidebar from '../Sidebar';
import Card from '../Card';

interface IDev {
  _id: string;
  name: string;
  github_username: string;
  techs: string[];
  bio: string;
  avatar_url: string;
}

const App: React.FC = () => {
  const [devs, setDevs] = useState<IDev[]>();

  useEffect(() => {
    getDevsList();
  }, []);

  useEffect(() => {}, [devs]);

  const getDevsList = async () => {
    const devs = await (await fetch('http://localhost:4000/dev')).json();
    setDevs(devs);
  };

  const refreshDevsList = () => {
    getDevsList();
  };

  return (
    <div className={styles.App}>
      <Sidebar refreshDevsList={refreshDevsList} />
      <main>
        <ul>
          {devs?.length &&
            devs.map(dev => (
              <Card
                key={dev._id}
                name={dev.name}
                githubUserName={dev.github_username}
                techs={dev.techs}
                bio={dev.bio}
                avatarURL={dev.avatar_url}
              />
            ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
