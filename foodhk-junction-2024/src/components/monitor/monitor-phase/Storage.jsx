import React, { useEffect, useState } from 'react';
import StorageGraph from '../graphs/StorageGraph';
import StorageNotification from '../notifications/StorageNotifications';
import TopNavigation from '../../main pages/TopNavigation';
import useDarkMode from '../../../hooks/useDarkMode';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import productService from '../../../services/productService';
import io from 'socket.io-client';


const Storage = () => {
    const [notifications1, setNotifications1] = useState([]);
    const [notifications2, setNotifications2] = useState([]);
    const [productId1, setProductId1] = useState("");
    const [productId2, setProductId2] = useState("");
    const [productName1, setProductName1] = useState("");
    const [productName2, setProductName2] = useState("");
    const [deviations1, setDeviations1] = useState([]);
    const [deviations2, setDeviations2] = useState([]);
    const notification = useSelector((state) => state.selectedNotification);
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                const latestData = await productService.getLatestProductData();
                if (latestData.prod1) {
                    setProductName1(latestData.prod1?.prodName);
                    setNotifications1(latestData.prod1?.notifications);
                    setProductId1(latestData.prod1?.prodId);
                    setDeviations1(latestData.prod1?.storageWeightLossDeviations)
                }
                if (latestData.prod2) {
                    setProductName2(latestData.prod2?.prodName);
                    setNotifications2(latestData.prod2?.notifications);
                    setProductId2(latestData.prod2?.prodId);
                    setDeviations2(latestData.prod2?.storageWeightLossDeviations);
                }
            } catch (error) {
                console.error("Failed to load notifications:", error);
            }
        };
        fetchLatestData();
    }, []);

    
    useEffect(() => {
        const socket = io("http://localhost:3000"); // Connect to the server

        // Listen for real-time data from the server
        socket.on('newProduct', (data) => {
            setRefetch(!refetch)

            console.log('Received real-time data:', data);
            console.log("1111111111", data.prodId, productId1, productId1 == data.prodId)
            if (data.prodId === productId1) {
                setNotifications1(() => {
                    const newNotifications = data.notifications.slice(-6);
                    
                    return newNotifications;
                })
                
                setDeviations1((prevDev) => {

                    const newDev = data.deviations.slice(-10);
                    console.log('newwwdevvvv', newDev)
                    return newDev
    
                })
            } else if (data.prodId === productId2) {
                setNotifications2((prevNotifications) => {
                    const newNotifications = data.notifications.slice(-6);
                    
                    return newNotifications;
                });
                setDeviations2((prevDev) => {
                    const newDev = data.deviations.slice(-10);
                    console.log('newwwdevvvv', newDev)
                    return newDev
                })
            }
        });

        // Clean up the listener and disconnect socket on unmount
        return () => {
            socket.off('newProduct');
            socket.disconnect();
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="dark:bg-secondary_login_dark bg-white flex flex-col items-center text-black dark:text-white min-h-dvh">
            <Helmet>
                <title>Storage</title>
            </Helmet>
            <TopNavigation darkTheme={darkTheme} handleMode={handleMode} title="Storage" />
            <div className="flex h-dvh gap-6 w-dvw">
                <div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName1} </h2>
                        <StorageNotification notifications={notifications1} notification={notification}  />
                    </div>    
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight loss deviation during storage </h2>
                        <StorageGraph deviations = {deviations1}/>
                    </div>
                </div>
                {!!productName2 && (<div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName2} </h2>
                        <StorageNotification notifications={notifications2} notification={notification} />
                    </div>
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight loss deviation during storage </h2>
                        <StorageGraph deviations = {deviations2} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Storage;
