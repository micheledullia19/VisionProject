import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCR9ca7iMLm_L9jPC3OXLBHGX8oUgHc_kQ",
    authDomain: "michelevisionofficial.firebaseapp.com",
    projectId: "michelevisionofficial",
    storageBucket: "michelevisionofficial.appspot.com",
    messagingSenderId: "307250136154",
    appId: "1:307250136154:web:32c454f3b7992872c58463"
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;
