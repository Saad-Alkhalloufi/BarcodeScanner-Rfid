import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import {View,StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'
import Button from '../components/Button'
import {useAuthValue} from "../providers/AuthContext";
import {signOut} from "@firebase/auth";
import {auth} from "../../casaevents.config";
import {IconName} from '@expo/vector-icons/Ionicons';
import { ScreenStackHeaderLeftView } from 'react-native-screens'


export default function Dashboard({navigation}) {
    const {currentUser} = useAuthValue();

    return (

        <Background>
            <Logo/>
            <View>
                <Text>
                    Hello, {currentUser?.email}
                </Text>
            </View>
            
                

            
            <Button 
                mode="contained"
                icon="logout"
                
                
                
                
                onPress={() =>
                    signOut(auth)
                }
                >
            Logout
            </Button>
            
            
            
        </Background>
        
        
    )
    
    
}

