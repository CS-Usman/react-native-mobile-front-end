/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Alert } from 'react-native';
import Contacts from 'react-native-contacts';

import LoadingPopup from '../../components/LoadingPopup';
import { SearchField } from '../../components/TextInput';
import CheckBox from '@react-native-community/checkbox';
import { AddToEmergencyContactBtn } from '../../components/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { updateUserApi } from '../../services/ApiService';
import { CommonActions } from '@react-navigation/native';


const EditContactScreen = (props) => {
    const [searchText, setSearchText] = useState('');
    const [contactsData, setContactsData] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userData, token } = props.route.params;

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        Contacts.getAll()
            .then((contacts) => {
                if (contacts.length > (contacts.length / 3)) {
                    setContactsData(contacts);
                    setFilteredContacts(contacts);
                }
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = contactsData.filter((contact) =>
            contact.givenName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredContacts(filtered);
    };

    const handleContactSelection = (contactId) => {
        const updatedContacts = filteredContacts.map((contact) => {
            if (contact.rawContactId === contactId) {
                return { ...contact, isSelected: !contact.isSelected };
            } else {
                return contact;
            }
        });
        setFilteredContacts(updatedContacts);
    };


    const handleAddToEmergencyContacts = async () => {
        const selectedContacts = filteredContacts.filter(
            (contact) => contact.isSelected
        );
        setEmergencyContacts((prevEmergencyContacts) => [
            ...prevEmergencyContacts,
            ...selectedContacts,
        ]);
        if (emergencyContacts.length > 0) {
            const formattedContacts = emergencyContacts.map((contact) => {
                const displayName = contact.displayName;
                const rawContactId = contact.rawContactId;
                const phoneNumbers = contact.phoneNumbers[0].number;
                return { displayName, phoneNumbers, rawContactId };
            });
            const response = await updateUserApi({ email: userData.email, emergencyContacts: formattedContacts }, token);
            if (response) {
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    })
                );
            }
        }
        else {
            Alert.alert('Note', 'Selected contacts should be between 1-5');

        }
    };

    const renderItem = ({ item }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={styles.contactItem}>
            <View>
                <Text style={styles.contactName}>{item.givenName}</Text>
                <Text style={styles.contactName}>{item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'No phone number'}</Text>
            </View>
            <CheckBox
                value={item.isSelected}
                onChange={() => handleContactSelection(item.rawContactId)}
                onCheckColor="#4df8e8"
                tintColors="#a9a9a9"
            />
        </View>
    );

    return (
        <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={styles.img}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchField onChangeText={handleSearch} value={searchText} />
                </View>
                <FlatList
                    data={filteredContacts}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.rawContactId}`}
                    contentContainerStyle={styles.listContainer}
                />
                <AddToEmergencyContactBtn
                    btnLabel="Change Emergency Contacts"
                    Press={handleAddToEmergencyContacts}
                />
                {loading && <LoadingPopup />}
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    img: {
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
        paddingHorizontal: responsiveWidth(4.2),
        backgroundColor: '#1B1B1B',
    },
    searchContainer: {
        marginVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4.2),
        paddingVertical: responsiveWidth(0.7),
        borderRadius: 28,
    },
    searchInput: {
        fontSize: responsiveFontSize(2),
    },
    listContainer: {
        flexGrow: 1,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        width: '100%',
        padding: responsiveHeight(1.3),
    },
    contactName: {
        fontSize: responsiveFontSize(2.2),
        color: '#a9a9a9',

    },
});
export default EditContactScreen;
