import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';
import Constants from 'expo-constants';

const reducer = (state, action) => {
    return {...state, foodArray: state.foodArray.push(action.payload) }
}

const HomeScreen = ({ navigation }) => {
    let totalFood = [];
    let current_totalFood = [];

    const [userData, setUserData] = useState({
        calories: 0,
        carbs: 0,
        proteins: 0,
        fats: 0,
    });
    const [current, setCurrent] = useState({
        current_calories: 0,
        current_carbs: 0,
        current_proteins: 0,
        current_fats: 0,
    });

    const [totalFoodArray, setTotalFoodArray] = useState([]);
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const [current_totalFoodArray, setCurrentTotalFoodArray] = useState([]);
    const [current_breakfast, setCurrentBreakfast] = useState([]);
    const [current_lunch, setCurrentLunch] = useState([]);
    const [current_dinner, setCurrentDinner] = useState([]);
    const [current_snacks, setCurrentSnacks] = useState([]);

    const [dateSelected, setDateSelected] = useState(moment().format('MMMM DD YYYY'));
    const [dateMoment, setDateMoment] = useState(moment());

    const bannerUriBreakfast = require('../../assets/banners/banner-breakfast.png');
    const bannerUriLunch = require('../../assets/banners/banner-lunch.png')
    const bannerUriDinner = require('../../assets/banners/banner-dinner.png')
    const bannerUriSnacks = require('../../assets/banners/banner-snacks.png')

    const [isDeleted, setIsDeleted] = useState();

    const deleteData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const calories = await AsyncStorage.getItem('total_calories');
            const carbs = await AsyncStorage.getItem('total_carbs');
            const proteins = await AsyncStorage.getItem('total_proteins');
            const fats = await AsyncStorage.getItem('total_fats');
            setUserData({
                calories: calories,
                carbs: carbs,
                proteins: proteins,
                fats: fats
            });
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const syncBreakfastData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty'){
                setBreakfast([]);
            } else{
                x =  JSON.parse(data);
                setBreakfast(x); // overwrites breakfast
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const syncLunchData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty'){
                setLunch([]);
            } else{
                x =  JSON.parse(data);
                setLunch(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const syncDinnerData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty'){
                setDinner([]);
            } else{
                x =  JSON.parse(data);
                setDinner(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const syncSnacksData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty'){
                setSnacks([]);
            } else{
                x =  JSON.parse(data);
                setSnacks(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const syncFoodsData = async () => {
		try {
            let a,b,c,d = 0;
            let x_date = [];
            const breakfast1 = await AsyncStorage.getItem('total_breakfast') || 'empty';
            const lunch1 = await AsyncStorage.getItem('total_lunch') || 'empty';
            const dinner1 = await AsyncStorage.getItem('total_dinner') || 'empty';
            const snacks1 = await AsyncStorage.getItem('total_snacks') || 'empty';
           
            if(breakfast1 === 'empty'){

            } else{
                a =  JSON.parse(breakfast1);
                
                for (let i = 0; i < a.length; i++) {
                    if(a[i].dateConsumed === dateSelected){
                        totalFood.push(a[i]);
                        x_date.push(a[i])
                    }
                }
                setCurrentBreakfast(x_date);
            }
            x_date = [];

            if(lunch1 === 'empty'){
  
            } else{
                b =  JSON.parse(lunch1);
                for (let i = 0; i < b.length; i++) {
                    if(b[i].dateConsumed === dateSelected){
                        totalFood.push(b[i]);
                        x_date.push(b[i]);
                    }
               }
               setCurrentLunch(x_date);
            }
            x_date = [];

            if(dinner1 === 'empty'){

            } else{
                c =  JSON.parse(dinner1);
                for (let i = 0; i < c.length; i++) {
                    if(c[i].dateConsumed === dateSelected){
                        totalFood.push(c[i]);
                        x_date.push(c[i]);
                    }
               }
               setCurrentDinner(x_date);
            }
            x_date = [];
            if(snacks1 === 'empty'){
 
            } else{
                d =  JSON.parse(snacks1);
                for (let i = 0; i < d.length; i++) {
                    if(d[i].dateConsumed === dateSelected){
                        totalFood.push(d[i]);
                        x_date.push(d[i]);
                    }
               }
               setCurrentSnacks(x_date);
            }
            x_date = [];

            var calories = 0;
            var carbs = 0;
            var proteins = 0;
            var fats = 0;
            for (let i = 0; i < totalFood.length; i++) {
                calories = calories + totalFood[i].calories;
                carbs = carbs + totalFood[i].carbs;
                proteins = proteins + totalFood[i].proteins;
                fats = fats + totalFood[i].fats;
            }
            setCurrent({
                current_calories: calories,
                current_carbs: carbs,
                current_proteins: proteins,
                current_fats: fats
            });
            saveCurrentUserData('current_calories', JSON.stringify(calories));
            saveCurrentUserData('current_carbs', JSON.stringify(carbs));
            saveCurrentUserData('current_proteins', JSON.stringify(proteins));
            saveCurrentUserData('current_fats', JSON.stringify(fats));
            
           
            setTotalFoodArray(totalFood);            
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const saveCurrentUserData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};

    const saveData = async (key, value) => {
		try {
            await (AsyncStorage.setItem(key, value), syncFoodsData());
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
    };
    const saveDeletionData = async () => {
		try {
            await (AsyncStorage.setItem('total_breakfast', JSON.stringify(breakfast)));
            await (AsyncStorage.setItem('total_lunch', JSON.stringify(lunch)));
            await (AsyncStorage.setItem('total_dinner', JSON.stringify(dinner)));
            await (AsyncStorage.setItem('total_snacks', JSON.stringify(snacks)));
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
    };


    //////////////////////////////////////
    //
    // DELETE FOR DEV PURPOSES ONLY
    // deleteData('total_breakfast');
    // deleteData('total_lunch');
    // deleteData('total_dinner');
    // deleteData('total_snacks');
    // console.log(totalFoodArray);
    //
    //////////////////////////////////////


    useEffect(() => {
        syncBreakfastData('total_breakfast');
        syncLunchData('total_lunch');
        syncDinnerData('total_dinner');
        syncSnacksData('total_snacks');
        syncFoodsData();
        //syncCurrentUserData();
        getUserData();
    },[]);

    useEffect(() => {
        if(breakfast.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
            saveData('total_breakfast', JSON.stringify(breakfast));
        } else{
            //console.log("OLD USER");
            saveData('total_breakfast', JSON.stringify(breakfast));
            //setTotalFoodArray([...totalFoodArray, breakfast]);
            //getData('total_breakfast'); 
        }
    }, [breakfast]);

    useEffect(() => {
        if(lunch.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
            saveData('total_lunch', JSON.stringify(lunch));
        } else{
            //console.log("OLD USER");
            saveData('total_lunch', JSON.stringify(lunch));
            //setTotalFoodArray([...totalFoodArray,lunch]);
            //getData('total_lunch'); 
        }
    }, [lunch]);

    useEffect(() => {
        if(dinner.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
            saveData('total_dinner', JSON.stringify(dinner));
        } else{
            //console.log("OLD USER");
            saveData('total_dinner', JSON.stringify(dinner));
            //setTotalFoodArray([...totalFoodArray, dinner]);
            //getData('total_dinner'); 
        }
    }, [dinner]);

    useEffect(() => {
        if(snacks.length == 0){
            //console.log("NEW USERS");
            //getData('total_snacks');
            saveData('total_snacks', JSON.stringify(snacks));
        } else{
            //console.log("OLD USER");
            saveData('total_snacks', JSON.stringify(snacks));
            //setTotalFoodArray([...totalFoodArray, snacks]);
            //getData('total_snacks'); 
        }
    }, [snacks]);

    useEffect(() => {
        syncFoodsData();
    }, [dateSelected]);

    useEffect(() => {
        //syncCurrentUserData();
        //saveData('total_breakfast', JSON.stringify(breakfast));
        //saveData('total_lunch', JSON.stringify(lunch));
        //saveData('total_dinner', JSON.stringify(dinner));
        //saveData('total_snacks', JSON.stringify(snacks));
        saveDeletionData();
        syncFoodsData();
    }, [isDeleted]);

    return( 
        <ScrollView style={styles.main}>
            <View style={styles.status_bar}/>

            <CalendarStrip
                style={styles.calendar}
                daySelectionAnimation={{type: 'background', duration: 200, highlightColor: ThemeConstants.MAIN_YELLOW}}
                calendarHeaderStyle={{color: 'white'}}
                calendarColor={ThemeConstants.MAIN_BLUE}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                highlightDateNumberStyle={{color: 'white'}}
                highlightDateNameStyle={{color: 'white'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                onDateSelected={(onDateSelected) => {
                    var currentDateSelected = moment(onDateSelected).format('MMMM DD YYYY');
                    setDateSelected(currentDateSelected);
                    setDateMoment(moment(onDateSelected));
                    //console.log(moment('2019-11-30T13:51:45.046Z').format('MMMM DD YYYY')); // FOR DEV PURPOSES ONLY
                }}
                
            />
            
            <StatsContainer
                valuesTotal = {userData}
                valuesCurrent = {current}
            />

            <IntakeFoodContainer
                food={current_breakfast}
                mealTitle='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast,
                    currentDate: dateMoment,
                    deleteID: Math.floor(Math.random() * 99999)
                })}
                onDeletion={setCurrentBreakfast}
                onDeletion2={setIsDeleted}
                onDeletion3={setBreakfast}
                onDeletion4={dateSelected}
                onDeletion5={breakfast}
            />

            <IntakeFoodContainer
                food={current_lunch}
                mealTitle='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch,
                    currentDate: dateMoment,
                    deleteID: Math.floor(Math.random() * 99999)
                })}
                onDeletion={setCurrentLunch}
                onDeletion2={setIsDeleted}
                onDeletion3={setLunch}
                onDeletion4={dateSelected}
                onDeletion5={lunch}
            />

            <IntakeFoodContainer
                food={current_dinner}
                mealTitle='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner,
                    currentDate: dateMoment,
                    deleteID: Math.floor(Math.random() * 99999)
                })}
                onDeletion={setCurrentDinner}
                onDeletion2={setIsDeleted}
                onDeletion3={setDinner}
                onDeletion4={dateSelected}
                onDeletion5={dinner}
            />

            <IntakeFoodContainer
                food={current_snacks}
                mealTitle='Snacks'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: snacks,
                    setFoodArray: setSnacks,
                    currentDate: dateMoment,
                    deleteID: Math.floor(Math.random() * 99999)
                })}
                onDeletion={setCurrentSnacks}
                onDeletion2={setIsDeleted}
                onDeletion3={setSnacks}
                onDeletion4={dateSelected}
                onDeletion5={snacks}
            />
            
            <IntakeWaterContainer/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    calendar: {
        height:100,
        paddingTop: 5,
        paddingBottom: 5
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        flex: 1
    },
    status_bar: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: Constants.statusBarHeight+5
    }
});

export default HomeScreen;