import React, { Component } from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { InputWithLabel, HistoryTable } from '../UI';

let SQLite = require('react-native-sqlite-storage');
export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            user: { //Change this part by getting the data from the database.
                id: 1,
                name: 'John Doe',
                email: 'johndoe@gmail.com'
            }
        };
        this._query = this._query.bind(this);
        this.db = SQLite.openDatabase(
            { name: 'movieHistory', createFromLocation: '~db.sqlite' },
            this.openCallback,
            this.errorCallback,
        );
    }

    componentDidMount() {
        this._query();
    }
    _query() {
        this.db.transaction(tx =>
            tx.executeSql('SELECT * FROM movieHistory WHERE userId = (?)', [1], (tx, results) =>
                this.setState({ movies: results.rows.raw() }),
            ),
        );
    }

    openCallback() {
        console.log('database open success');
    }
    errorCallback(err) {
        console.log('Error in opening the database: ' + err);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title} >Account Info</Text>
                <View style={styles.profileContainer}>
                    <InputWithLabel
                        label='Name'
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={1}
                        flexText={3}
                        text={this.state.user.name}
                    ></InputWithLabel>
                    <InputWithLabel
                        label='Email'
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={1}
                        flexText={3}
                        text={this.state.user.email}
                    ></InputWithLabel>
                </View>
                <Text style={[styles.title, { marginTop: 0 }]} >History</Text>
                <View style={styles.historyContainer}>
                    <HistoryTable
                        movies={this.state.movies}
                    >
                    </HistoryTable>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 50
    },
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'green',
    },
    historyContainer: {
        paddingTop: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        flex: 2,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
    },
    logo: {
        width: 250,
        height: 250,
        marginTop: 20,
        marginBottom: 20,
    },
});