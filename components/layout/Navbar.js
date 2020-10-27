import React, { Component } from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";

class Navbar extends Component {
  render() {
    return (
      <View className="navbar-fixed">
        <View className="z-depth-0">
          <View className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <Text>MERN Stack Auth Starter</Text>
            </Link>
          </View>
        </View>
      </View>
    );
  }
}

export default Navbar;
