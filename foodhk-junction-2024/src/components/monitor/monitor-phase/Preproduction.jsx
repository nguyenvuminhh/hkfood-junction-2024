import React, { useEffect, useState } from 'react';
import PreproductionGraph from '../graphs/PreproductionGraph';
import PreproductionNotification from '../notifications/PreproductionNotifications';
import TopNavigation from '../../main pages/TopNavigation';
import useDarkMode from '../../../hooks/useDarkMode';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import productService from '../../../services/productService';
import io from 'socket.io-client';


const Preproduction = () => {
    const [notifications1, setNotifications1] = useState([]);
    const [notifications2, setNotifications2] = useState([]);
    const [productId1, setProductId1] = useState(null);
    const [productId2, setProductId2] = useState(null);
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
                setProductName1(latestData.prod1.prodName);
                setProductName2(latestData.prod2.prodName);
                setProductId1(latestData.prod1.prodId);
                setProductId2(latestData.prod2.prodId);
                setNotifications1(latestData.prod1.notifications);
                setNotifications2(latestData.prod2.notifications);
                setDeviations1(latestData.prod1.deviations);
                setDeviations2(latestData.prod2.deviations);
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
            console.log('Product ID:', data.prodId);
            console.log('Product ID 1:', productId1);
            console.log('Product ID 2:', productId2);
        if (data.prodId === "5409") {
            setNotifications1((prevNotifications) => {
                const newNotifications = [data, ...prevNotifications];
                return newNotifications.length > 6 ? newNotifications.slice(0, -1) : newNotifications;
            });
        } else if (data.prodId === "5030") {
            setNotifications2((prevNotifications) => {
                const newNotifications = [data, ...prevNotifications];
                return newNotifications.length > 6 ? newNotifications.slice(0, -1) : newNotifications;
            });
        }
        });

        // Clean up the listener and disconnect socket on unmount
        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="dark:bg-secondary_login_dark bg-white flex flex-col items-center text-black dark:text-white min-h-dvh">
            <Helmet>
                <title>Preproduction</title>
            </Helmet>
            <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
            <h1 className="text-center text-5xl mt-8">Preproduction</h1>
            <div className="flex h-dvh gap-6 w-dvw">
                <div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName1} </h2>
                        <PreproductionNotification notifications={notifications1} notification={notification}  />
                    </div>    
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight deviations of the last 10 final products </h2>
                        <PreproductionGraph deviations = {deviations1}/>
                    </div>
                </div>
                <div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName2} </h2>
                        <PreproductionNotification notifications={notifications2} notification={notification} />
                    </div>
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight deviations of the last 10 final products </h2>
                        <PreproductionGraph deviations = {deviations2} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preproduction;
