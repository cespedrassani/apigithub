/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Repo from './components/repo'
import RepoModal from './components/repoModal'

export default class App extends Component {
  state = {
    modalVisible: false,
    repos: []
  }

  async componentDidMount() {
    const repos = JSON.parse(await AsyncStorage.getItem('@Apigithub:repositories')) || [];

    this.setState({ repos });
  }

  _addRepositorie = async (repoText) => {
    const repoCall = await fetch(`http://api.github.com/repos/${repoText}`);
    const response = await repoCall.json();

    const repositoy = {
      id: response.id,
      thumbnail : response.owner.avatar_url,
      title: response.name,
      author: response.owner.login,
    }

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos,
        repositoy,
      ]
    });

    await AsyncStorage.setItem('@Apigithub:repositories', JSON.stringify(this.state.repos));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Repositorios</Text>
            <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
              <Text style={styles.headerButton}> + </Text>
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          {this.state.repos.map(repo =>
            <Repo key={repo.id} data={repo}/>
          )}
        </ScrollView>

        <RepoModal 
          onCancel={() => this.setState({ modalVisible: false })} 
          onAdd={this._addRepositorie}
          visible={this.state.modalVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },

  header: {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222'
  },

  repoList: {
    padding: 20,
  },

  repositories: {
    padding: 20,
    backgroundColor: '#FFF',
    height: 120,
    marginBottom: 20,
    borderRadius: 5,
  },

  headerButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222'
  }
});
