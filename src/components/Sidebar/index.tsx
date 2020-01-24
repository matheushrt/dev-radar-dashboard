import React, { useState, useEffect, FormEvent } from 'react';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC<{ refreshDevsList: Function }> = ({
  refreshDevsList
}) => {
  const [githubUser, setGithubUser] = useState<string>('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techToAdd, setTechToAdd] = useState<string>('');
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [isLocating, setIsLocating] = useState<boolean>(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setIsLocating(false);
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        },
        err => {
          console.error(err);
          setIsLocating(false);
        }
      );
    }
  }, []);

  useEffect(() => {}, [isLocating, techToAdd, technologies]);

  const createDev = async () => {
    const res = await await fetch('http://localhost:4000/dev', {
      method: 'POST',
      body: JSON.stringify({
        github_username: githubUser,
        techs: technologies,
        coordinates: [longitude, latitude]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status === 201) refreshDevsList();
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    createDev();
    document.forms.item(0)?.reset();
  };

  return (
    <aside className={styles.Sidebar}>
      <strong>Cadastrar</strong>
      <form onSubmit={onSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Github User</label>
          <input
            type="text"
            name="github_username"
            id="github_username"
            required
            onChange={e => {
              setGithubUser(e.target.value);
            }}
          />
        </div>

        <div className="input-block">
          <div className="add-tech">
            <label htmlFor="techs">Technologies</label>
            <button
              disabled={!techToAdd}
              onClick={e => {
                e.preventDefault();
                setTechnologies(prev => [...prev, techToAdd]);
                setTechToAdd('');
              }}
            >
              Add +
            </button>
          </div>
          <input
            type="text"
            name="techs"
            id="techs"
            onChange={e => {
              setTechToAdd(e.target.value);
            }}
            value={techToAdd}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              disabled={isLocating}
              type="number"
              name="latitude"
              id="latitude"
              required
              onChange={e => {
                setLatitude(parseFloat(e.target.value));
              }}
              defaultValue={latitude?.toFixed(5)}
              onFocus={e => {
                e.currentTarget.value = '';
              }}
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              disabled={isLocating}
              type="number"
              name="longitude"
              id="longitude"
              required
              onChange={e => {
                setLongitude(parseFloat(e.target.value));
              }}
              defaultValue={longitude?.toFixed(5)}
              onFocus={e => {
                e.currentTarget.value = '';
              }}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </aside>
  );
};

export default Sidebar;
