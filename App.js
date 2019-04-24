import React from 'react';
import SearchScreen from './screens/search-screen';
import AdvancedDetailScreen from './screens/advanced-detail-screen';
import IndexScreen from './screens/index-screen';
import store from './store';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

const StackNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Detail: AdvancedDetailScreen,
    Index: IndexScreen
  },
  {
    initialRouteName: "Index",
    headerMode: "none"
  }
);

const Routes = createAppContainer(StackNavigator);