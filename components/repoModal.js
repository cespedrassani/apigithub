import React, {Component} from 'react';
import {
    Modal,
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity } 
from 'react-native';

export default class RepoModal extends Component {
    
    state = {
        repoText: '',
    }

    render () {
        return (
            <Modal animationType="fade" transparent={true} visible={this.props.visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}>Adicionar novo repositório</Text>
                        <TextInput autoFocus 
                            autoCapitalize="none"
                            style={styles.boxInput}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="organização/repositório"
                            value={this.state.repoText}
                            onChangeText={repoText => this.setState({ repoText })}></TextInput>    
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} 
                                onPress={this.props.onCancel}>
                                <Text style={styles.buttnText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.submitButton]} 
                                onPress={() => this.props.onAdd(this.state.repoText)}>
                                <Text style={styles.buttnText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>                                           
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxContainer: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
    },

    boxTitle: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 16,
    },

    boxInput: {
        alignSelf: 'stretch',
        marginTop: 10,
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        height: 40,
        borderRadius: 3,
    },

    buttonContainer: {
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },

    cancelButton: {
        backgroundColor: '#E25F5F',
        marginRight: 5,
    },

    submitButton: {
        backgroundColor: '#70BD85',
        marginLeft: 5,
    },

    buttnText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12,
    }

});
