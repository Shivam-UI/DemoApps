/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import axios from 'axios';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const App = () => {

  const [FoodData, setFoodData] = React.useState([]);
  const [FilterFoodData, setFilterFoodData] = React.useState([]);
  const [SearchText, setSearchText] = React.useState('');
  const [activeSections, setActiveSections] = React.useState([]);
  const [isLoading, setLoadingDone] = React.useState(false);

  const search = (searchText) => {
    setSearchText(searchText);

    let filteredData = FoodData.filter(function (item) {
      return item.title.includes(searchText);
    });

    setFilterFoodData(filteredData);
  };

  const _renderSectionTitle = (section) => {

    // console.log(JSON.stringify(section.data))

    return (
      <View style={styles.content}>
        {/* <Text>{section.title}</Text> */}
      </View>
    );
  };

  const _renderHeader = (section, index, isActive, sections) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)'), flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomColor: '#f1f1f1', borderBottomWidth: 1 }}>
        <View style={{ padding: 6, backgroundColor: '#f21e0542', marginRight: 10, borderRadius: 5, elevation: 3 }}>
          <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('./assets/img/bibimbap.png')} />
        </View>
        <Text style={styles.headerText}>{section.title}</Text>
        <Image style={{ width: isActive ? 15 : 20, height: isActive ? 15 : 20, resizeMode: 'contain', marginRight: 10, tintColor: isActive ? 'grey' : '#b4b4b4' }} source={isActive ? require('./assets/img/arrow_up.png') : require('./assets/img/downward_arrow.png')} />
      </Animatable.View>
    );
  }

  const _renderContent = (section, i, isActive, sections) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)'), flexDirection: 'column', alignItems: 'center' }}>
        {section.data.map((items, index) => {
          return (
            <Animatable.View style={{ width: '90%', padding: 12, borderBottomColor: '#f3f3f3', borderBottomWidth: 1, marginBottom: 5 }}>
              <Animatable.Text
                duration={300}
                easing="ease-out"
                style={{ textTransform: 'capitalize' }}
                animation={isActive ? 'zoomIn' : false}>{items.title}</Animatable.Text>
            </Animatable.View>
          )
        })}
      </Animatable.View>
    );
  }

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  React.useEffect(() => {
    setLoadingDone(true);
    getFoodDetails();
  }, [false]);

  getFoodDetails = () => {
    axios.get('https://api.jsonbin.io/b/60e7f4ebf72d2b70bbac2970')
      .then((res) => {
        if (res.data.status === 1) {
          console.log('FoodDetails', JSON.stringify(res.data));
          setFoodData(res.data.data);
          setFilterFoodData(res.data.data);
          setLoadingDone(false);
        } else {
          setLoadingDone(false);
        }
      })
      .catch((error) => {
        console.log('Error', error);
        setLoadingDone(false);
      })
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#f1f1f1', flex: 1, }}>
      <StatusBar barStyle={'light-content'} />
      {isLoading ? <ActivityIndicator color={'white'} size={'small'} style={{ position: 'absolute', marginTop: Dimensions.get('screen').width, right: Dimensions.get('screen').width / 2 - 20, zIndex: 999, padding: 15, backgroundColor: '#f21e0566', borderRadius: 10 }} hidesWhenStopped={true} /> : null}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={{ padding: 25, paddingBottom: 15, elevation: 3 }}>
          <Text style={{ fontSize: 33, fontWeight: 'bold', }}>Approved Foods List</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF9F6', height: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, elevation: 3 }}>
          <Image style={{ width: 25, height: 25, resizeMode: 'contain', marginLeft: 20, tintColor: '#b4b4b4' }} source={require('./assets/img/magnifying_glass.png')} />
          <TextInput
            style={{ marginLeft: 15 }}
            defaultValue={SearchText}
            placeholder={"Try Searching, fat, sauces, names.."}
            onChangeText={(e) => search(e)}
          />
        </View>
        <View style={{ padding: 20, elevation: 3 }}>
          <Accordion
            sections={FilterFoodData}
            activeSections={activeSections}
            renderSectionTitle={_renderSectionTitle}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
    fontWeight: '600',
    fontSize: 16
  }
});

export default App;
