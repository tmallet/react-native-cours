import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { getForecastWeatherByCity } from '../actions';
import { kelvinToCelsius } from '../services/temperature';

class AdvancedDetailScreen extends Component {

  componentDidMount() {
    const city = this.props.navigation.getParam("city");
    this.props.getForecastWeatherByCity(city);
  }

  getTemperatures() {
    //return this.props.forecastWeather.list.map(weather => kelvinToCelsius(weather.main.temp));
    return [];
  }

  getHumidities() {
    //return this.props.forecastWeather.list.map(weather => weather.main.humidity);
    return [];
  }

  getLabels() {
    return this.props.forecastWeather.list.map((_, index) => {
      let day = index / 8
      return index === 0 ? "t" : index % 8 === 0 ? "t+" + day + "j" : ""
    });
  }

  renderChart(data) {
    return (
      <LineChart
        data={{
          labels: this.getLabels(),
          datasets: [{
            data
          }]
        }}
        width={wp("90%")} // from react-native
        height={hp("30%")}
        yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        {this.props.forecastWeather ? this.renderChart(this.getTemperatures()) : <Text>Loading</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    forecastWeather: state.weather.forecastWeather
  };
}

const mapDispatchToProps = {
  getForecastWeatherByCity
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AdvancedDetailScreen));