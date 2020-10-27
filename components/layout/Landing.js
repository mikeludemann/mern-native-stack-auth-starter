import React, { Component } from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to home page, should redirect them to dashboard
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

  render() {
    return (
      <View style={{ height: "75vh" }} className="container valign-wrapper">
        <View className="row">
          <View className="col s12 center-align">
            <View>
              <Text>Hello, Stranger{" "} </Text>
              <Text>MERN Stack Auth Starter</Text>
            </View>
            <Text className="flow-text grey-text text-darken-1">
              An User authentication setup with Passport and JWT
            </Text>
            <View className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </View>
            <View className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Landing);
