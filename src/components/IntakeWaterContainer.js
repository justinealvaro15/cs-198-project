import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import * as ThemeConstants from '../common/Themes';
import moment from "moment";
//item.dateConsumed = moment(currentDate).format('MMMM DD YYYY');


const IntakeWaterContainer = ({water, setWater, currentDate, waterTemplate, waterCount, setWaterDeleted}) => {
    
    //console.log(waterIntake);
    let temp = [];
    let x_date = [];
    let counter = 0;
    let deleteID = '';
    let waterDrink = {
        dateConsumed: waterTemplate.dateConsumed,
        waterID: waterTemplate.waterID
    };
    //console.log(currentWater);

    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.text_header}>Water Intake</Text>

                <View 
                    style={{alignItems: 'center', 
                        justifyContent: 'space-between',
                        flexDirection: 'row'}}
                    >
                    <TouchableHighlight
                        style={styles.button_add}
                        onPress={ () => {
                            x_date = [];
                            counter = 0;
                            //setCurrentWaterIntake(currentWaterIntake[0].count + 1);
                            if(waterCount> 0){
                                for (let i = 0; i < water.length; i++) {
                                    
                                    if(water[i].dateConsumed === moment(currentDate).format('MMMM DD YYYY')){
                                        x_date.push(water[i]);
                                        
                                    }
                                }
                                //
                                //x_date contains all water for specific date
                                deleteID = x_date[0].waterID;
                                x_date.splice(0,1); //delete one water entry
                                for (let i = 0; i < water.length; i++) {
                                    if (water[i].waterID != deleteID ){
                                        counter = counter + 1;
                                    }
                                    else{
                                        break;
                                    }
                                }
                        
                                temp = water;
                                temp.splice(counter,1);
                                setWater(temp);
                                //console.log(temp)
                                setWaterDeleted(Math.random());

                            }
                        }
                    }
                    >
                        <View>
                            <Text style={styles.text_button}>-</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.glass}>
                        <Text style={styles.text_water}>{waterCount} {waterCount <= 1 ? 'glass' : 'glasses'}</Text>
                    </View>

                    <TouchableHighlight
                        style={styles.button_add}
                        onPress={ () => {
                            waterDrink.dateConsumed = moment(currentDate).format('MMMM DD YYYY');
                            waterDrink.waterID = Math.floor(Math.random() * 99999);
                            //console.log(waterTemplate.count);
                            //console.log('----------------ADDED---------------');
                            //console.log(waterDrink);
                            //console.log('----------------ADDED---------------');
                            setWater([...water, waterDrink]);




                            //setCurrentWaterIntake(currentWaterIntake[0].count + 1);
                            //console.log(waterIntake.length);
                            /*for (let i = 0; i < waterIntake.length; i++) {
                                if(waterIntake[i].dateConsumed === dateSelected){
                                    waterIntake[i].count = waterIntake[i].count + 1;
                                }
                            }
                            setWaterIntake(waterIntake);
                            setIsWaterAdded(Math.random());
                            */
                            }
                        }
                    >
                        <View>
                            <Text style={styles.text_button}>+</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button_add: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        paddingHorizontal: ThemeConstants.CONTAINER_MARGIN
    },
    container: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        borderTopLeftRadius: ThemeConstants.CONTAINER_RADIUS,
        borderTopRightRadius: ThemeConstants.CONTAINER_RADIUS 
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginBottom: ThemeConstants.CONTAINER_MARGIN
    },
    glass: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        paddingHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5
    },
    text_button: {
        alignContent: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        textAlign: 'center'
    },
    text_header: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/3,
        paddingTop: ThemeConstants.CONTAINER_MARGIN*1.25
    },
    text_water: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2
    }
});

export default IntakeWaterContainer;