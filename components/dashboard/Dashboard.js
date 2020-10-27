import React, { Component } from "react";
import { Text, View, Button } from "react-native";
// import { Link } from "react-router-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <View style={{ height: "75vh" }} className="container valign-wrapper">
        <View className="row">
          <View className="landing-copy col s12 center-align">
            <View>
              <Text>Hello, {user.name.split(" ")[0]}</Text>
              <Text className="flow-text grey-text text-darken-1">
                You are logged into this{" "} app.
              </Text>
            </View>
            <Button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
