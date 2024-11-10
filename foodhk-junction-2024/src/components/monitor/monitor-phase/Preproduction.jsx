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
                console.log('Latest data:', latestData);
                if (latestData.prod1) {
                    setProductName1(latestData.prod1?.prodName);
                    setNotifications1(latestData.prod1?.notifications);
                    setProductId1(latestData.prod1?.prodId);
                    setDeviations1(latestData.prod1?.deviations);
                }
                if (latestData.prod2) {
                    setProductName2(latestData.prod2?.prodName);
                    setNotifications2(latestData.prod2?.notifications);
                    setProductId2(latestData.prod2?.prodId);
                    setDeviations2(latestData.prod2?.deviations);
          
                }
                
                // console.log(productName1, productId1, notifications1, deviations1, 'okok');
            } catch (error) {
                console.error("Failed to load notifications:", error);
            }
        };
        fetchLatestData();
    }, [refetch]);

    
    useEffect(() => {
        const socket = io("https://hkfood-junction-2024.fly.dev/"); // Connect to the server

        // Listen for real-time data from the server
        socket.on('newProduct', (data) => {
            setRefetch(!refetch)

            console.log('Received real-time data:', data);
            console.log('Product ID:', data.prodId);
            console.log('Product ID 1:', productId1);
            console.log('Product ID 2:', productId2);

        console.log("DAAATAAA", data)
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
                <title>Preproduction</title>
            </Helmet>
            <TopNavigation darkTheme={darkTheme} handleMode={handleMode} title = "Preproduction" />
            <div className="flex h-dvh gap-6 w-dvw">
                <div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "mt-16 basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName1} </h2>
                        <PreproductionNotification notifications={notifications1} notification={notification}  />
                    </div>    
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight deviations of the last 10 final products </h2>
                        <PreproductionGraph deviations = {deviations1}/>
                    </div>
                </div>
                {!!productName2 && (<div className="basis-1/2 mt-6 flex flex-col items-center justify-center">
                    <div className = "mt-16 basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> {productName2} </h2>
                        <PreproductionNotification notifications={notifications2} notification={notification} />
                    </div>
                    <div className = "basis-1/2 flex flex-col items-center">
                        <h2 className = "mb-4 text-xl text-bold"> Weight deviations of the last 10 final products </h2>
                        <PreproductionGraph deviations = {deviations2} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Preproduction;
