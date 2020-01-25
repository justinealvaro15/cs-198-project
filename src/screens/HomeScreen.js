import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';
import Constants from 'expo-constants';
import { any } from 'prop-types';




const reducer = (state, action) => {
    return {...state, foodArray: state.foodArray.push(action.payload) }
}

const total_water_data = [];


let ccc= 0;

let global = '';
let token = 0;

const waterTemplate = 
    {
    dateConsumed: '',
};



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
    //array of waters
    const [water, setWater] = useState([]);
    const [currentWater, setCurrentWater] = useState([]);
    const [waterDeleted, setWaterDeleted] = useState();

    const [current_totalFoodArray, setCurrentTotalFoodArray] = useState([]);
    const [current_breakfast, setCurrentBreakfast] = useState([]);
    const [current_lunch, setCurrentLunch] = useState([]);
    const [current_dinner, setCurrentDinner] = useState([]);
    const [current_snacks, setCurrentSnacks] = useState([]);

    const [dateSelected, setDateSelected] = useState(moment().format('MMMM DD YYYY'));
    const [dateMoment, setDateMoment] = useState(moment());

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

    const deleteMagic = async () => {
        setIsDeleted(Math.random());
        setWaterDeleted(Math.random());
        //setIsWaterAdded(Math.random());
        console.log("RE-INITIALIZE");
    };

    const syncBreakfastData = async (key) => {
		try {
            let x = 0;
            let xx = []
            //const data2 = await (AsyncStorage.getItem('total_water') || 'empty');
            //console.log("HAAAAAAAHAHAAHA");
            //console.log(data2);
            //console.log("HAAAAAAAHAHAAHA");
            const data = await (AsyncStorage.getItem(key) || 'empty');
           
            //console.log(data);
            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false ){
                setBreakfast([]);
            } else{
                x =  JSON.parse(data);
                setBreakfast(x); //naooverwirite si breakfast 
            } 
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }      
        //console.log("function#1: breakfast sync");
    };

    const syncLunchData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false ){
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
        //console.log("function#2: lunch sync");  
    };

    const syncDinnerData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false){
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
        //console.log("function#3: dinner sync");
    };

    const syncSnacksData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false){
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
        //console.log("function#4: snacks sync");
    };
    const syncWaterDataFromJson = async (key) => {
        try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';
            
            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false){
                setWater([]);
            } else{
                x =  JSON.parse(data);
                setWater(x);
            }
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }      
    };

    const syncWaterData2 =  async () => {
        try{
            let a = 0;
            let x_date = [];
            const water1 = await AsyncStorage.getItem('total_water') || 'empty';
            //console.log('------------DATA---------------');
            //console.log(water1);
            //console.log('------------DATA---------------');
            if(water1 === 'empty'){
                setCurrentWater(0);
            }else{
                a = JSON.parse(water1);
                for (let i = 0; i < a.length; i++) {
                    if(a[i].dateConsumed === dateSelected){
                        //console.log(a[i].count);
                        x_date.push(a[i]);
                    }
                }
            
                setCurrentWater(x_date.length);
            }
            x_date = [];

        }catch(error){
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
                calories = calories + (totalFood[i].calories * totalFood[i].serving);
                carbs = carbs + (totalFood[i].carbs * totalFood[i].serving);
                proteins = proteins + (totalFood[i].proteins * totalFood[i].serving);
                fats = fats + (totalFood[i].fats * totalFood[i].serving);
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
        
        //console.log("function#5: current food sync");
    };

    const saveCurrentUserData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }
        //console.log("function#6: save current user data");
	};

    const saveData = async (key, value) => {
		try {
            await (AsyncStorage.setItem(key, value), syncFoodsData());
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }
       // console.log("function#7: save data");
    };

    const saveWaterData = async (key,value) => {
        try {
            await (AsyncStorage.setItem(key, value), syncWaterData2());
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }
        //console.log("function#12: SAVE WATER DATA");
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
        //console.log("function#8: delete save data");
    };
    

    //////////////////////////////////////
    //
    // DELETE FOR DEV PURPOSES ONLY
    // deleteData('total_breakfast');
    // deleteData('total_lunch');
    // deleteData('total_dinner');
    // deleteData('total_snacks');
    // deleteData('total_water');
    // console.log(totalFoodArray);
    //
    //////////////////////////////////////


    useEffect(() => {
        syncBreakfastData('total_breakfast');
        syncLunchData('total_lunch');
        syncDinnerData('total_dinner');
        syncSnacksData('total_snacks');
        syncWaterDataFromJson('total_water');
        
        //syncFoodsData();
        //syncCurrentUserData();
        getUserData();
        //console.log("useEffect#1 in action: sync data from startup");
    },[]);

    useEffect(() => {
        if(breakfast.length == 0){
            saveData('total_breakfast', JSON.stringify(breakfast));
           
        } else{
            //console.log("OLD USER");
            saveData('total_breakfast', JSON.stringify(breakfast));
            
        }
    }, [breakfast]);

    useEffect(() => {
        if(lunch.length == 0){
            saveData('total_lunch', JSON.stringify(lunch));
        }else{
            saveData('total_lunch', JSON.stringify(lunch));
            //setTotalFoodArray([...totalFoodArray,lunch]);  
        }
        //console.log("useEffect#3 in action: lunch sync ");
    }, [lunch]);

    useEffect(() => {
        if(dinner.length == 0){
            //console.log("NEW USERS");
            saveData('total_dinner', JSON.stringify(dinner));
        } else{
            //console.log("OLD USER");
            saveData('total_dinner', JSON.stringify(dinner)); 
        }
        //console.log("useEffect#4 in action: dinner sync ");
    }, [dinner]);

    useEffect(() => {
        if(snacks.length == 0){
            saveData('total_snacks',JSON.stringify(snacks));
        }else{
            //console.log("NEW USERS");
            //getData('total_snacks');
            saveData('total_snacks', JSON.stringify(snacks));
        }
        //console.log("useEffect#5 in action: snacks sync ");
    }, [snacks]);

    useEffect( () => {
        if(water.length == 0){
            saveWaterData('total_water',JSON.stringify(water));
        }else{
            saveWaterData('total_water', JSON.stringify(water));
        }
    }, [water]);

    useEffect( () => {
        if(water.length == 0){
            saveWaterData('total_water',JSON.stringify(water));
        }else{
            saveWaterData('total_water', JSON.stringify(water));
        }
    }, [waterDeleted]);

    useEffect(() => {
        syncFoodsData();
        syncWaterData2();
    }, [dateSelected]);

    useEffect(() => {
        //syncCurrentUserData();
        //saveData('total_breakfast', JSON.stringify(breakfast));
        //saveData('total_lunch', JSON.stringify(lunch));
        //saveData('total_dinner', JSON.stringify(dinner));
        //saveData('total_snacks', JSON.stringify(snacks));
        saveDeletionData();
        syncFoodsData();
       // console.log("useEffect#7 in action: data is deleted");
    },[isDeleted]);

    useEffect( () => {
        syncWaterData2();
    },[waterDeleted])

 useEffect( () => {
    setTimeout(function() { deleteMagic(); }, 3000);
    //setTimeout(function() { syncWaterData2('total_water'); }, 5000);
    //setTimeout(function() { saveWaterData(); }, 1000);
 }, []);

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
            
            <View>
                <View style={styles.padding}></View>

                <StatsContainer
                    valuesTotal = {userData}
                    valuesCurrent = {current}
                />
            </View>
            
            <IntakeFoodContainer
                food={current_breakfast}
                mealTitle='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast,
                    currentDate: dateMoment,
                    deleteID: 0
                })}
                onDeletion={setCurrentBreakfast}
                onDeletion2={setIsDeleted}
                onDeletion3={setBreakfast}
                onDeletion4={dateSelected}
                onDeletion5={breakfast}
                foodArray1 = {breakfast}
                setFoodArray1 = {setBreakfast}
            />

            <IntakeFoodContainer
                food={current_lunch}
                mealTitle='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch,
                    currentDate: dateMoment,
                    deleteID: 0
                })}
                onDeletion={setCurrentLunch}
                onDeletion2={setIsDeleted}
                onDeletion3={setLunch}
                onDeletion4={dateSelected}
                onDeletion5={lunch}
                foodArray1 = {lunch}
                setFoodArray1 = {setLunch}
                
            />

            <IntakeFoodContainer
                food={current_dinner}
                mealTitle='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner,
                    currentDate: dateMoment,
                    deleteID: 0
                })}
                onDeletion={setCurrentDinner}
                onDeletion2={setIsDeleted}
                onDeletion3={setDinner}
                onDeletion4={dateSelected}
                onDeletion5={dinner}
                foodArray1 = {dinner}
                setFoodArray1 = {setDinner}
            />

            <IntakeFoodContainer
                food={current_snacks}
                mealTitle='Snacks'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: snacks,
                    setFoodArray: setSnacks,
                    currentDate: dateMoment,
                    deleteID: 0
                })}
                onDeletion={setCurrentSnacks}
                onDeletion2={setIsDeleted}
                onDeletion3={setSnacks}
                onDeletion4={dateSelected}
                onDeletion5={snacks}
                foodArray1 = {snacks}
                setFoodArray1 = {setSnacks}
            />
            
            <IntakeWaterContainer
                water = {water}
                setWater = {setWater}
                currentDate = {dateMoment}
                waterTemplate = {waterTemplate}
                waterCount = {currentWater}
                setWaterDeleted = {setWaterDeleted}
            />
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
    padding: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: 100,
        position: 'absolute',
        left: 0,
        right: 0
    },
    status_bar: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: Constants.statusBarHeight+5
    },
    stats: {
        position: 'relative',
    }
});

export default HomeScreen;