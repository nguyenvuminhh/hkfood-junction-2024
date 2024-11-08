import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
//import formService from '../../services/authentication';
import useDarkMode from '../hooks/useDarkMode';

function Form() {
  const [finalWeight, setFinalWeight] = useState('');
  const [beginStorage, setBeginStorage] = useState('');
  const [endStorage, setEndStorage] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  function handleInputErrors() {
    if (!finalWeight || !beginStorage || !endStorage) {
      toast.error('Please fill in all fields');
      return false;
    }

    return true;
  }

  /*const handleSubmit = async (e) => {
    e.preventDefault();
  
    const check = handleInputErrors();
    if (!check) return;
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('finalWeight', finalWeight);
      formData.append('beginStorage', beginStorage);
      formData.append('endStorage', endStorage);
      
      //const response = await formService.register(formData);
  
      if (response.error) {
        toast.error(response.error);
      } else {
        setFinalWeight('');
        setBeginStorage('');
        setEndStorage('');
        toast.success('Form submitted successfully');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.log(`The server responds with a ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };*/
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const check = handleInputErrors();
    if (!check) return;
  
    setLoading(true);
    setTimeout(() => {
      setFinalWeight('');
      setBeginStorage('');
      setEndStorage('');
      toast.success('Form submitted successfully');
      setLoading(false);
    }, 2000);
  }
  
  return (
    <section className="dark:bg-primary_login_dark bg-rose-300">
      <Helmet>
        <title>Submit Form</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-6 h-dvh">
        <label className="swap absolute top-10 right-40">
          <span
            onClick={handleMode}
            className={`transition-transform transform ${darkTheme ? 'rotate-0' : 'rotate-180'}`}
          >
            {darkTheme ? (
              <FaMoon size="2.1em" className="top-navigation-icon text-slate-400" />
            ) : (
              <FaSun size="2.1em" className="top-navigation-icon text-slate-400" />
            )}
          </span>
        </label>
        <div
          className="w-full rounded-lg shadow-2xl shadow-rose-600 dark:shadow-white border sm:max-w-md xl:p-0
          bg-rose-200 dark:bg-secondary_login_dark dark:border-gray-700 border-rose-200"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
              Submit your details
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="finalWeight" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Final Weight
                </label>
                <input
                  type="text"
                  name="finalWeight"
                  id="finalWeight"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter final weight"
                  required
                />
              </div>
              <div>
                <label htmlFor="beginStorage" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Begin Storage
                </label>
                <input
                  type="text"
                  name="beginStorage"
                  id="beginStorage"
                  value={beginStorage}
                  onChange={(e) => setBeginStorage(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter beginning storage"
                  required
                />
              </div>
              <div>
                <label htmlFor="endStorage" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  End Storage
                </label>
                <input
                  type="text"
                  name="endStorage"
                  id="endStorage"
                  value={endStorage}
                  onChange={(e) => setEndStorage(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter ending storage"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600
                dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner" /> : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
