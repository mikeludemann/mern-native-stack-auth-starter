import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { Link, withRouter } from "react-router-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Formik } from 'formik';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <View className="container">
        <View className="row">
          <View className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <Text>Back to home</Text>
            </Link>
            <View className="col s12" style={{ paddingLeft: "11.250px" }}>
              <Text>
                Register below
              </Text>
              <View className="grey-text text-darken-1">
                <Text>Already have an account? </Text>
                <Link to="/login">Log in</Link>
              </View>
            </View>
            <Formik noValidate onSubmit={this.onSubmit}>
              <View className="input-field col s12">
                <TextInput
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <Text>Name</Text>
                <Text className="red-text">{errors.name}</Text>
              </View>
              <View className="input-field col s12">
                <TextInput
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <Text>E-Mail</Text>
                <Text className="red-text">{errors.email}</Text>
              </View>
              <View className="input-field col s12">
                <TextInput
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <Text>Password</Text>
                <Text className="red-text">{errors.password}</Text>
              </View>
              <View className="input-field col s12">
                <TextInput
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <Text>Confirm Password</Text>
                <Text className="red-text">{errors.password2}</Text>
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
                  <Text>Sign up</Text>
                </Button>
              </View>
            </Formik>
          </View>
        </View>
      </View>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
