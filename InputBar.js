import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

const InputBar = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(todoInput) => props.textChange(todoInput)}
        value={props.todoInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={props.addNewTodo}>
        <Text style={styles.addButtonText}>INVIA</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 3 },
    marginLeft: 10,
    marginRight: 10, 
    marginTop: 30, 
    borderRadius: 50, // adds the rounded corners
    shadowColor: '#171717',
    shadowOpacity: .3
  },
  input: {
    backgroundColor: '#F3F3F3',
    flex: 1,
    fontSize: 18,
    alignItems: 'center',
    height: 35,
    shadowOffset: { width: 0, height: 3 },
    marginLeft: 10,
    marginRight: 10, 
    marginTop: 1, 
    borderRadius: 10, // adds the rounded corners
  },
  addButton: {
    width: 100,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    marginLeft: 10,
    marginRight: 10, 
    marginTop: 1, 
    borderRadius: 30, // adds the rounded corners
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700'
  }
})

export default InputBar;
