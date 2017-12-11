import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Image, Label } from 'semantic-ui-react';
import { logout, getUserData, isLoggedIn } from '../core/api-service';
import logo from '../logo.svg';

class Header extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.user = getUserData() || { first_name: '', last_name: '' };
  }

  handleLogout() {
    logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <header className="Header">
          {isLoggedIn() && (
            <nav>
              <Label image size="large">
                <img alt="avatar" src="/avatar.jpg" />
                {`${this.user.first_name} ${this.user.last_name}`}
              </Label>
              <Button onClick={this.handleLogout} color="blue" floated="right" size="small">Logout</Button>
            </nav>
          )}
          <Image src={logo} className="Header-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Header);
