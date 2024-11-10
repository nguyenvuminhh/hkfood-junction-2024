import React, { useEffect, useState } from 'react';
import CookingGraph from '../graphs/CookingGraph';
import CookingNotification from '../notifications/CookingNotifications';
import TopNavigation from '../../main pages/TopNavigation';
import useDarkMode from '../../../hooks/useDarkMode';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import productService from '../../../services/productService';
import io from 'socket.io-client';


const Cooking = () => {
    const [notifications1, setNotifications1] = useState([]);
    const [notifications2, setNotifications2] = useState([]);
    const [productName1, setProductName1] = useState("");
    const [productName2, setProductName2] = useState("");
    const [deviations1, setDeviations1] = useState([]);
    const [deviations2, setDeviations2] = useState([]);
    const notification = useSelector((state) => state.selectedNotification);
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                const latestData = await productService.getLatestProductData();
                setProductName1(latestData.prod1?.prodName);
                setProductName2(latestData.prod2?.prodName);
                setNotifications1(latestData.prod1?.notifications);
                setNotifications2(latestData.prod2?.notifications);
                setDeviations1(latestData.prod1?.deviations);
                setDeviations2(latestData.prod2?.deviations);
            } catch (error) {
                console.error("Failed to load notifications:", error);
            }
        };
        fetchLatestData();
    }, []);

    
    useEffect(() => {
        const socket = io("http://localhost:3000"); // Connect to the server

        // Listen for real-time data from the server
        socket.on('notification', (data) => {
            console.log('Received real-time data:', data);
            if (data.prodId === 1) {
                setNotifications1((prevNotifications) => [ data, ...prevNotifications]);
            } else {
                setNotifications2((prevNotifications) => [ data, ...prevNotifications]);
            }
        });

        // Clean up the listener and disconnect socket on unmount
        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, []); // Empty dependency array to run only once on mount

    console.log('prod2',!!!productName2)
    return (
        <div className="dark:bg-secondary_login_dark bg-white flex flex-col items-center text-black dark:text-white min-h-dvh">
            <Helmet>
                <title>Cooking</title>
            </Helmet>
            <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
            <h1 className="text-center text-5xl mt-8">Cooking</h1>
            <div className="flex h-dvh gap-6 w-dvw">
                <div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName1} </h2>
                        <CookingNotification notifications={notifications1} notification={notification}  />
                    </div>    
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight deviations of the last 10 final products </h2>
                        <CookingGraph deviations = {deviations1}/>
                    </div>
                </div>
                {!!productName2 && (<div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName2} </h2>
                        <CookingNotification notifications={notifications2} notification={notification} />
                    </div>
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight deviations of the last 10 final products </h2>
                        <CookingGraph deviations = {deviations2} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Cooking;
