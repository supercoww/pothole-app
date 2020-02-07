import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, StyleSheet } from 'react-native';
import { Appbar, FAB, Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';

export default class Main extends Component {
	navigation: NavigationProp<any>;

	constructor(props: any) {
		super(props);
		console.log('nav', props.navigation);

		this.navigation = props.navigation;
		console.log(props.user);
	}

	render() {
		return (
			<>
				<SafeAreaView>
					<Text>App works!</Text>
				</SafeAreaView>
				<FAB
					style={styles.fab}
					label="New"
					icon="plus"
					onPress={() => this.navigation.navigate('Camera')}
				/>
			</>
		);
	}
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		alignSelf: 'center',
		backgroundColor: '#6200ee',
		bottom: 0,
	},
});

const sendImage = () => {
	var url = 'http://192.168.43.90:5000/cross'; // File upload web service path

	var request = new XMLHttpRequest();
	request.setRequestHeader('Content-type', 'multipart/form-data');
	request.onreadystatechange = e => {
		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			console.log('success', request.responseText);
		} else {
			console.warn('error');
		}
	};

	request.open('GET', url);
	request.send();

	var photo = {
		uri: this.state.picturePath, // CameralRoll Url
		type: 'image/jpeg',
		name: 'photo.jpg',
	};

	var formData = new FormData();
	formData.append('file', photo);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	console.log('OPENED', xhr.status);

	xhr.onprogress = function() {
		console.log('Sending', xhr.status);
	};

	xhr.onload = function() {
		console.log('DONE', xhr.status);
	};

	xhr.setRequestHeader('authorization', this.state.token);
	xhr.send(formData);

	// request.open('GET', 'http://10.3.7.86:5000/cross/');

	// return fetch('http://10.3.7.86:5000/cross/')
	// 	.then(response => response.json())
	// 	.then(responseJson => {
	// 		console.log(responseJson);
	// 	})
	// 	.catch(error => {
	// 		console.error(error);
	// 	});
};
