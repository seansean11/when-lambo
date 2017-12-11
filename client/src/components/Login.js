import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { postLogin } from '../core/api-service';
import Header from './Header';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { email, password } = this.state;

    postLogin({ email, password })
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(() => this.setState({ error: 'Login was unsuccessful.  Please try again.' }));
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { error, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Header />
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment raised>
                <Form.Input
                  fluid
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleInputChange}
                />
                {error && <Message negative>{error}</Message>}
                <Button onClick={this.handleLogin} color="green" fluid size="large">Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object
  })
};

Login.defaultProps = {
  location: {
    state: {}
  }
}

export default Login;
