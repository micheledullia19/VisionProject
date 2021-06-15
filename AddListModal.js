import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
const currentDate = new Date();

//form per scegliere nome, colore dello spazio, la data in automatico
export default class AddListModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        name: "",
        date: currentDate.getTime(),
        color: this.backgroundColors[0]
    };

    createTodo = () => {
        const { name, date, color } = this.state;

        const list = { name, date, color };

        this.props.addList(list);
        
        this.setState({ name: "" });
        this.setState({ date: currentDate.getTime() });
        this.props.closeModal();
    };

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            );
        });
    }

// Creazione di uno spazio e relativa scelta colore e nome spazio

    render() {
        return (
            //Chiusura della schermata di creazione
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                    {/* Testo crea uno spazio */}
                   <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>Crea uno Spazio</Text>


                     {/* Testo di Input per settare un nome */}
                    <TextInput
                        style={styles.input}
                        placeholder="Come vuoi chiamare lo Spazio?"
                        onChangeText={text => this.setState({ name: text, date: currentDate.getTime() })}
                    />

                     {/* Settaggio colore dello spazio*/}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.renderColors()}
                    </View>

                     {/*Bottone per creazione dello spazio con parametri impostati precedentemente */}
                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}
                    >
                        <Text style={{ color: colors.white, fontWeight: "600" }}>Aggiungi !</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});
