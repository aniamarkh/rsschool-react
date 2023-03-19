import React from 'react';
import { Link } from 'react-router-dom';
import { headerData } from '../../routes';

export default class Header extends React.Component {
  state = {
    curPath: window.location.pathname,
  };

  handleClick = (path: string) => {
    this.setState({ curPath: path });
  };

  render() {
    const { curPath } = this.state;
    return (
      <header className="header" data-testid="header-test">
        {headerData.map(({ title, path }) => (
          <div key={path} className="header-wrapper">
            <Link
              className={`${curPath === path ? 'a--active' : ''}`}
              to={path}
              onClick={() => this.handleClick(path)}
            >
              {title.toUpperCase()}
            </Link>
          </div>
        ))}
      </header>
    );
  }
}
