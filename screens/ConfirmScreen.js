import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TrolleyScreen from './TrolleyScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { InputWithLabel } from '../UI';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StackNav = createStackNavigator();
let SQLite = require('react-native-sqlite-storage');
export default class ConfirmScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: this.props.route.params.movies,
            totalPrice: this.props.route.params.movies.ticket * this.props.route.params.movies.price,
        }
        this.db = SQLite.openDatabase(
            { name: 'movieHistory', createFromLocation: '~db.sqlite' },
            this.openCallback,
            this.errorCallback,
        );
    }
    _insert() {
        this.db.transaction(tx => {
            tx.executeSql('INSERT INTO movieHistory(userId, movieId, name, date, time, ticket, price) VALUES(?,?,?,?,?,?,?)',
                [this.state.movies.userId, this.state.movies.movieId, this.state.movies.name, this.state.movies.date, this.state.movies.time, this.state.movies.ticket, this.state.movies.price])
        });
        console.log("Insert done");
    }
    _deleteRow() {
        this.db.transaction(tx =>
            tx.executeSql('DELETE FROM trolley WHERE id=(?)', [this.state.movies.id])
        );
        console.log([this.state.movies.id]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title} >Confirmation</Text>
                <View style={styles.receiptContainer}>
                    <InputWithLabel
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={2}
                        label='Movie'
                        flexText={3}
                        text={this.state.movies.name}
                    ></InputWithLabel>
                    <InputWithLabel
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={2}
                        label='Date'
                        flexText={3}
                        text={this.state.movies.date}
                    ></InputWithLabel>
                    <InputWithLabel
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={2}
                        label='Time'
                        flexText={3}
                        text={this.state.movies.time}
                    ></InputWithLabel>
                    <InputWithLabel
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={2}
                        label='Ticket'
                        flexText={3}
                        text={this.state.movies.ticket}
                    ></InputWithLabel>
                    <InputWithLabel
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={2}
                        label='Price'
                        flexText={3}
                        text={'RM' + this.state.movies.price}
                    ></InputWithLabel>
                    <InputWithLabel
                        orientation={'horizontal'}
                        editable={false}
                        flexLabel={2}
                        label='Total Price'
                        flexText={3}
                        text={'RM' + this.state.totalPrice}
                    ></InputWithLabel>
                </View>
                <StackNav.Navigator>
                    <StackNav.Screen
                        name="Trolley"
                        component={TrolleyScreen}
                        options={styles.HomeHeader}
                    />
                </StackNav.Navigator>
                <View style={styles.controlContainer}>
                    <View style={styles.controlClearContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Trolley')}>
                            <Text style={styles.button}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlConfirmContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this._insert()
                                this._deleteRow()
                                this.props.navigation.push('Trolley')
                            }}
                        >
                            <Text style={styles.button}>
                                Confirm
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
    receiptContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        flex: 9,
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