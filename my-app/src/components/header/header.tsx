import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { headerData } from '../../routes';

export default function Header() {
  const [curPath, setCurPath] = useState(window.location.pathname);

  const handleClick = (path: string) => {
    setCurPath(path);
  };

  useEffect(() => {
    const headerTitle = headerData.find(({ path }) => path === curPath)?.title;
    document.title = headerTitle || 'Not found!';
  }, [curPath]);

  return (
    <header className="header">
      {headerData.map(({ title, path }) => (
        <div key={path} className="header-wrapper">
          <Link
            className={`${curPath === path ? 'a--active' : ''}`}
            to={path}
            onClick={() => handleClick(path)}
          >
            {title.toUpperCase()}
          </Link>
        </div>
      ))}
    </header>
  );
}
