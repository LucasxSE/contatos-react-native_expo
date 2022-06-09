import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  let [error, setError] = useState(undefined);
  let [contacts, setContacts] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // console.log(data);
          setContacts(data);
        } else {
          setError("Nenhum contato encontrado");
        }
      } else {
        setError("Permissão para acessar os contatos negada.")
      }
    })();
  }, []);

  let getPhoneNumbers = (contact) => {
    if (contact.phoneNumbers) {
      return contact.phoneNumbers.map((phoneNumber, index) => {
        return (
          <View key={index}>
            <Text>Telefone: {phoneNumber.number}</Text>
          </View>
        );
      }); 
    }
  }

  let getContactRows = () => {
    if(contacts !== undefined) {
      return contacts.map((contact, index) => {
        return (
          <View key={index}>
            <Text>Nome: {contact.firstName} {contact.LastName}</Text>
            <Text>{getPhoneNumbers(contact)}</Text>
          </View>
        );
      })
    } else {
      return <Text>Aguardando contatos</Text>
    }
  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      {getContactRows()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
