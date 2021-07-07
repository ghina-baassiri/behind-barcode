import React, { useEffect, createContext, useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');

export const BadgeContext = createContext({});

export const BadgeProvider = ({ children }) => {
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); 
    }

    const db = firebase.firestore();
    const [badge, setBadge] = useState(10)
    const [allMessages, setAllMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if(user) {
        console.log('USER FROM BADGE: ', user)
        db
        .collection('notifications')
        .onSnapshot(collection => {
          db
          .collection('notifications')
          .get()
          .then(snapshot => {
            console.log('DATA FROM BADGE: ', snapshot.docss)

            let msgs = snapshot.docs.map((doc, index) => ({
              barcode: doc.data().barcode,
              createdAt: doc.data().createdAt.toDate(),
              details: doc.data().details,
              title: doc.data().title,
              usersSeen: doc.data().usersSeen
            }))
            setAllMessages(msgs)
          })
        })} 
    },[user])

    useEffect(() => {
      let userMsgs = []
      if(allMessages) {
        for(let j=0; j<allMessages.length; j++) {
          if(!allMessages[j].usersSeen || (allMessages[j].usersSeen && !allMessages[j].usersSeen.hasOwnProperty(user._id))) {
           userMsgs.push(allMessages[j])
          }
        }
        console.log('userMsgs FROM BADGE: ', userMsgs)

        setUserMessages(userMsgs)
      }
    }, [allMessages])


    useEffect(() => {          
      setBadge(userMessages.length)       
      console.log('userMessages length FROM BADGE: ', userMessages.length)
    }, [userMessages])

    useEffect(() => {          
      console.log('COUNT FROM BADGE: ', badge)       
    }, [badge])

    return (
      <BadgeContext.Provider
        value={{
          badge,
          setBadge
        }}
      >
        {children}
      </BadgeContext.Provider>
    )
  }