import PreproductionGraph from './graphs/PreproductionGraph';
import PreproductionNotification from './notifications/PreproductionNotifications';
import TopNavigation from '../main pages/TopNavigation';
import useDarkMode from '../../hooks/useDarkMode';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

const notifications = [
    {
        id: 1,
        phase: "preproduction",
        type: "success",
        description: "Materials are ready for preproduction.",
        time: "2024-11-09 10:00 AM"
    },
    {
        id: 2,
        phase: "cooking",
        type: "warning",
        description: "Cooking started, please monitor the process.",
        time: "2024-11-09 11:00 AM"
    },
    {
        id: 3,
        phase: "storage",
        type: "info",
        description: "Items have been moved to storage.",
        time: "2024-11-09 12:00 PM"
    },
    {
        id: 4,
        phase: "packing",
        type: "success",
        description: "All items have been packed.",
        time: "2024-11-09 01:00 PM"
    },
    {
        id: 5,
        phase: "unknown",
        type: "error",
        description: "Phase information is missing.",
        time: "2024-11-09 02:00 PM"
    }
];

const Preproduction = () => {
    const notification = useSelector((state) => state.selectedNotification);
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
        <div className="h-dvh dark:bg-secondary_login_dark bg-white flex flex-col items-center text-black dark:text-white">
        <Helmet>
            <title>Preproduction</title>
        </Helmet>
        <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
        <h1 className = "text-center text-5xl mt-8"> Preproduction </h1>
        <div className = "flex h-dvh gap-6 w-dvw">
            <div className = "basis-1/2 mt-24">
                <PreproductionNotification notifications = {notifications} notification = {notification}/>
            </div>
            <div className = "basis-1/2 mt-24">
                <PreproductionGraph />
            </div>
        </div>
        </div>
    );
}

export default Preproduction;