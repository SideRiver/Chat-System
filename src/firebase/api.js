import { db, firebase } from "./init.js"

const messageRef = db.collection('messages')

const postMessage = (user, content) => {
    messageRef.add({
        content,
        uid: user.uid,
        displayName: user.displayName,
        icon: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

const deleteMessage = (id) => {
    messageRef.doc(id).delete()
}

const updateMessage = (id, content) => {
    messageRef.doc(id).update({ content })
}

const formatData = (doc) => {
    const message = {
        id: doc.id,
        ...doc.data()
    }
    if(message.timestamp === null) {
        message.timestamp = new Date(Date.now())
    } else {
    message.timestamp = message.timestamp.toDate()
    }
    return message
}

const setMessageListener = (added, modified, removed) => {
    messageRef.orderBy('timestamp' , 'asc').onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            switch(change.type) {
                case 'added':
                    added(formatData(change.doc))
                    break
                case 'modified':
                    modified(formatData(change.doc))
                    break
                case 'removed':
                    removed(change.doc.id)
                    break
            }
        })
    })
}
export { postMessage, deleteMessage, updateMessage, setMessageListener}