import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import {Dimensions} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'

const currentDate = new Date(); //metodo per prendere la data che mette in currentDate

const screenWidth = Dimensions.get('window').width

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
//inizia la classe con list user ect.
export default class App extends React.Component {
    state = {
        addTodoVisible: false,
        lists: [],
        user: {},
        loading: true
    };
    
        componentDidMount() {
            firebase = new Fire((error, user) => {
                if (error) {
                    return alert("Oh Damn, non funge qualcosa");
                }
    
                firebase.getLists(lists => {
                    this.setState({ lists, user }, () => {
                        this.setState({ loading: false });
                    });
                });
    
                this.setState({ user });
            });
        }
    
        componentWillUnmount() {
            firebase.detach();
        }
    
        toggleAddTodoModal() {
            this.setState({ addTodoVisible: !this.state.addTodoVisible });
        }
    
        renderList = list => {
            return <TodoList list={list} updateList={this.updateList} />;
        };
    
        addList = list => {
            firebase.addList({
                name: list.name,
                color: list.color,
                date: list.date,
                todos: []
            });
        };
    
        updateList = list => {
            firebase.updateList(list);
        };
    
        render() {

            //const list = this.props.list;
            //const completedCount = list.todos.filter(todo => todo.completed).length;
            //const remainingCount = list.todos.length - completedCount;
            //alert(JSON.stringify(this.state.lists[0]))

            const lists = JSON.stringify(this.state.lists); //trasforma in JSON tutto quello che cè in state.lists
            const numero_liste = lists.length; //numero liste indica il numero di spazi creati e list.lenght dice la lunghezza ovvero quanti spazi creati
            

            //const c = lists.substr(37, 13);
            //const c = "\'" + lists + "\'";
            //alert(numero_liste);
            //const data_spazi ="";

            const data_spazi= [0,0,0,0,0,0,0]; //crea il vettore da usare er creare il grafico..lo riempie riga 115
            //const timestamp = currentDate.getTime(); //prende il timestamp di questo momento
            //alert(numero_liste);


            //
            for (let i=0;i<numero_liste;i++) {
                var list = JSON.stringify(this.state.lists[i]); // prende i dati in JSON
                var d = String(list); //lo trasforma in stringa
                var dd = d.substr(36,13); //prende solo il tampstamp
                var date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(dd);
                
                
                var tt = new Date(date) 

                //alert(tt);
                //alert(dd[0]);
                //array[tt.getDay()] += 1;

                //ciclo magico che controlla se il primo numero del timestamp == undefined che è un errore che non va bene spesso usciva undefined per motivi a noi ignoti
                // se invece è un numero normale va bene
                if(dd[0]!=undefined){
                    var num_tt = tt.getDay(); //prende il numero corrente del giorno in cui è stato creato lo spazio
                    //array.push(tt.getDay());
                        //metodo brutto ciao noi diciam
                        //alert(dd);
                    data_spazi[num_tt-1]++; //incremente di 1 il giorno in cui è stato creato lo spazio
                }   
                
                /*if(dd > (currentDate-86400)){
                    data_spazi[6]+=1;
                }else if(dd > (currentDate-(86400*2))&& dd < (currentDate-(86400*3)) ){
                    data_spazi[5]+=1;
                }else if(dd > (currentDate-(86400*3)) && dd < (currentDate-(86400*4))){
                    data_spazi[4]+=1;
                }else if(dd > (currentDate-(86400*4))&& dd < (currentDate-(86400*5))){
                    data_spazi[3]+=1;
                }else if(dd > (currentDate-(86400*5))&& dd < (currentDate-(86400*6))){
                    data_spazi[2]+=1;
                }else if(dd > (currentDate-(86400*6))&& dd < (currentDate-(86400*7))){
                    data_spazi[1]+=1;
                }else if(dd > (currentDate-(86400*7))&& dd < (currentDate-(86400*8))){
                    data_spazi[0]+=1;
                }else{
                    data_spazi[0]++;
                    //alert(data_spazi[0]);
                }*/

            
            }
            
            if (this.state.loading) {
                return (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={colors.blue} />
                    </View>
                );
            }
            
            return (
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        visible={this.state.addTodoVisible}
                        onRequestClose={() => this.toggleAddTodoModal()}
                    >
                        <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                    </Modal>
    
                    <View style={{ flexDirection: "row",  marginVertical: 70, marginBottom: 5 }}>
                        <View style={styles.divider} />
                        <Text style={styles.title}>
                            Vision <Text style={{ fontWeight: "300", color: colors.purple }}>App</Text>
                        </Text>
                        <View style={styles.divider} />
                    </View>                         
    
                    <View style={{ marginVertical: 48}}>
                        <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
                            <AntDesign name="plus" size={16} color={colors.purple} />
                        </TouchableOpacity>
    
                        <Text style={styles.add}>Aggiungi Spazio</Text>

                        {/*<Text style={styles.add}>{data_spazi[3]}</Text>
                         <Text style={styles.add}>"altro"+{array}</Text>
                       <Text style={styles.add}>{"ciao" + c}</Text>
                        <Text style={styles.add}>{lists.substr(37, 13)+lists.substr(37, 13)}</Text>*/}
                        
                
                   {/*    <Text style={styles.add}>{lists}</Text>*/}


                    </View>                                                                                                                                                                                                                                                                                                                                                                                             
    
                    <View style={{ height: 275, paddingLeft: 32 }}>
                        <FlatList
                            data={this.state.lists}
                            keyExtractor={item => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this.renderList(item)}
                            keyboardShouldPersistTaps="always"
                        />
                    </View>
                    <View style={styles.container}>
                       
                     <StatusBar style="auto" />
                <View>
                
                <LineChart
                    data={{     //grafico 
                     labels: ["Lun","Mar","Mer","Giov","Ven","Sab","Dom"],
                                  //if(lists.date==currentDate)
                     datasets: [{
                        data: [
                            data_spazi[0],
                            data_spazi[1],
                            data_spazi[2],
                            data_spazi[3],
                            data_spazi[4],
                            data_spazi[5],
                            data_spazi[6] //è il conteggio degli spazi creati.
                        ]
                    }]
                    }}
                    //fino a qui
                    width={360} // from react-native
                    height={200}
                    chartConfig={{
                    backgroundColor: '#8f00ff',
                    backgroundGradientFrom: '#8f00ff',
                    backgroundGradientTo: '#0000ff',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 1,
                    borderRadius: 16
                    }}
                />
                </View>
                    </View>
                </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#0a0a0a",
            alignItems: "center",
            justifyContent: "center"
        },
        divider: {
            backgroundColor: colors.purple,
            height: 1,
            flex: 1,
            alignSelf: "center"
        },
        title: {
            fontSize: 38,
            fontWeight: "800",
            color: colors.white,
            paddingHorizontal: 64
        },
        addList: {
            borderWidth: 2,
            borderColor: colors.purple,
            borderRadius: 4,
            padding: 15,
            alignItems: "center",
            justifyContent: "center"
        },
        add: {
            color: colors.white,
            fontWeight: "600",
            fontSize: 14,
            marginTop: 8
    
        }
       
    });
