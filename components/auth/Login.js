import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { Link } from "react-router-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Formik } from 'formik';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <View className="container">
        <View style={{ marginTop: "4rem" }} className="row">
          <View className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <Text>Back to home</Text>
            </Link>
            <View className="col s12" style={{ paddingLeft: "11.250px" }}>
              <Text>
                Login below
              </Text>
              <Text className="grey-text text-darken-1">
                <Text>Don't have an account?</Text>
                <Link to="/register">Register</Link>
              </Text>
            </View>
            <Formik noValidate onSubmit={this.onSubmit}>
              <View className="input-field col s12">
                <TextInput
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <Text>E-Mail</Text>
                <Text className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </Text>
              </View>
              <View className="input-field col s12">
                <TextInput
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <Text>Password</Text>
                <Text className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </Text>
              </View>
              <View className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  <Text>Login</Text>
                </Button>
              </View>
            </Formik>
          </View>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
