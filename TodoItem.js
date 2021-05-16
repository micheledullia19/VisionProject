import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, Image } from 'react-native';

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const todoItem = this.props.todoItem;

    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => this.props.toggleDone()}
      >
        <Text style={(todoItem.done) ? { color: '#00BB2D' } : { color: '#313131' }}>
          { todoItem.title }
        </Text>

        <Button
          title="Rimuovi"
          color={(todoItem.done) ? 'rgba(200, 0, 0, 0.5)' : 'rgba(255, 0, 0, 1)' }
          onPress={() => this.props.removeTodo()}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  todoItem: {
    width: '90%',
    height: 40,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    shadowOffset: { width: 1, height: 3 },
    marginLeft: 10,
    marginRight: 10, 
    marginTop: 30, 
    borderRadius: 30, // adds the rounded corners
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    
  }
})
