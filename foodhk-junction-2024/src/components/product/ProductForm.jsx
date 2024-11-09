import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import TopNavigation from '../main pages/TopNavigation';
import useDarkMode from '../../hooks/useDarkMode';
//import formService from '../../services/authentication';

function ProductForm() {
  const [productID, setProductID] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [csvFile, setCSVFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  function handleInputErrors() {
    if (!productID || !targetWeight) {
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
      setProductID('');
      setTargetWeight('');
      toast.success('Form submitted successfully');
      setLoading(false);
    }, 2000);
  }
  
  return (
    <section className="h-dvh dark:bg-primary_login_dark bg-white flex flex-col items-center justify-center">
    <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
    <Helmet>
        <title>Add new product</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
        <div className = "basis-2/3">
          <div className="w-[40vw] p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg dark:shadow-white border sm:max-w-md xl:p-0
          bg-white dark:bg-secondary_login_dark dark:border-gray-700 border-gray-300">
            <h1 className="text-center mt-4 text-xl font-semibold leading-tight tracking-tight md:text-2xl text-[#232d42] dark:text-white">
              Add new product
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className = "ml-4 mr-4">
            <label htmlFor="productID" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Product ID
                </label>
                <input
                  type="text"
                  name="productID"
                  id="productID"
                  value={productID}
                  onChange={(e) => setProductID(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter product ID"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
                <label htmlFor="targetWeight" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Target Weight
                </label>
                <input
                  type="text"
                  name="targetWeight"
                  id="targetWeight"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter target weight"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
                <label htmlFor="csvfile" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  CSV File
                </label>
                <input
                  type="file"
                  name="csvfile"
                  id="csvfile"
                  value={csvFile}
                  onChange={(e) => setCSVFile(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter csv file"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center
                bg-[#232d42]
                dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner" /> : 'Submit'}
              </button>
            </form>
          </div>
        </div>
    </section>
  );
}

export default ProductForm;
