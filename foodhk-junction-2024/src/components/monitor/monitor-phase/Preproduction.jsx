import React, { useEffect, useState } from 'react';
import PreproductionGraph from '../graphs/PreproductionGraph';
import PreproductionNotification from '../notifications/PreproductionNotifications';
import TopNavigation from '../../main pages/TopNavigation';
import useDarkMode from '../../../hooks/useDarkMode';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import productService from '../../../services/productService';

const Preproduction = () => {
    const [notifications1, setNotifications1] = useState([]);
    const [notifications2, setNotifications2] = useState([]);
    const notification = useSelector((state) => state.selectedNotification);
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                const latestData = await productService.getLatestProductData();
                setNotifications1(latestData.prod1.notifications);
                setNotifications2(latestData.prod2.notifications);
            } catch (error) {
                console.error("Failed to load notifications:", error);
            }
        };
        fetchLatestData();
    }, []);

    return (
        <div className="h-dvh dark:bg-secondary_login_dark bg-white flex flex-col items-center text-black dark:text-white">
            <Helmet>
                <title>Preproduction</title>
            </Helmet>
            <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
            <h1 className="text-center text-5xl mt-8">Preproduction</h1>
            <div className="flex h-dvh gap-6 w-dvw">
                <div className="basis-1/2 mt-24">
                    <PreproductionNotification notifications={notifications} notification={notification} />
                </div>
                <div className="basis-1/2 mt-24">
                    <PreproductionGraph />
                </div>
            </div>
        </div>
    );
}

export default Preproduction;
