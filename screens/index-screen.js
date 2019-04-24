import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { facebookLogin, setToken } from '../actions';

class IndexScreen extends Component {

  componentDidMount() {
    AsyncStorage.getItem("fbToken").then(token => {
      if (token) {
        this.props.setToken(token);
        this.goToSearch();
      } else {
        this.props.facebookLogin(this.goToSearch);
      }
    })
  }

  goToSearch() {
    this.props.navigation.push("Search");
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = {
  facebookLogin,
  setToken
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(IndexScreen));
