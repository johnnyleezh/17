import React, { Component } from 'react';
import { StyleSheet, Button, View, Image, Text, FlatList, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { InputWithLabel, TrolleyTable, TrolleySummary } from '../UI';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StackNav = createStackNavigator();
let SQLite = require('react-native-sqlite-storage');
export default class TrolleyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: {
                name: '',
                price: 0,
                ticket: 0,
            },
            temp: {
                name: '',
                price: 0,
                ticket: 0,
            },
            userId: 1, //default userId of a profile, replace this if other profile is used.
            empty: true,
        }
        this._query = this._query.bind(this);
        this.db = SQLite.openDatabase(
            { name: 'movieHistory', createFromLocation: '~db.sqlite' },
            this.openCallback,
            this.errorCallback,
        );
    }
    componentDidMount() {
        //this._deleteRow();
        this._query();

    }

    _query() {
        this.db.transaction(tx =>
            tx.executeSql('SELECT * FROM trolley WHERE userId = (?)', [this.state.userId],
                (tx, results) => {
                    if (results.rows.length != 0) {
                        this.setState({
                            movies: results.rows.item(0)
                        });
                    }
                    else {
                        this.setState({
                            movies: this.state.temp
                        });
                    }
                    if (this.state.movies.ticket > 0)
                    {
                        this.setState({empty: false})
                    }
                },
            ),
        );
    }
    _deleteRow() {
        this.db.transaction(tx =>
            tx.executeSql('DELETE FROM trolley WHERE userId=(?)', [this.state.userId]
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
                <Text style={styles.title}>Trolley</Text>
                <TrolleyTable
                    movie={this.state.movies}
                >
                </TrolleyTable>
                <TrolleySummary
                    movie={this.state.movies}
                >
                </TrolleySummary>
                <View style={styles.controlContainer}>
                    <View style={styles.controlClearContainer}>
                        <TouchableOpacity
                        disabled={this.state.empty}
                            onPress={() => {
                                this._deleteRow()
                                this.props.navigation.push('Trolley')
                            }}>
                            <Text style={styles.button}>
                                Clear
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlConfirmContainer}>
                        <TouchableOpacity disabled={this.state.empty} onPress={() => this.props.navigation.push('Confirm',
                            { id: this.state.movies.id, name: this.state.movies.name, date: this.state.movies.date, ticket: this.state.movies.ticket, price: this.state.movies.price, movies: this.state.movies })}>
                            <Text style={styles.button}>
                                Proceed
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: 'center',
        flex: 1,
    },
    controlContainer: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'stretch',
    },
    controlClearContainer: {
        alignSelf: 'stretch',
        flex: 1,
        borderRightWidth: 0.5,
        backgroundColor: 'red',
    },
    controlConfirmContainer: {
        alignSelf: 'stretch',
        flex: 1,
        borderLeftWidth: 0.5,
        backgroundColor: 'lightgreen',
    },
    historyContainer: {
        paddingTop: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    summaryContainer: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 250,
        height: 250,
        marginTop: 20,
        marginBottom: 20,
    },
});