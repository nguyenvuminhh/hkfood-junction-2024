import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import TopNavigation from '../main pages/TopNavigation';
import useDarkMode from '../../hooks/useDarkMode';
import productService from '../../services/productService';

function ProductForm() {
  const [prodId, setProdId] = useState('');
  const [prodName, setProdName] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [csvFile, setCSVFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  const handleInputErrors = () => {
    if (!prodId || !targetWeight || !csvFile) {
      toast.error('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleInputErrors()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('prodId', prodId);
      formData.append('prodName', prodName);
      formData.append('targetWeight', parseFloat(targetWeight)); // Ensure targetWeight is a number
      formData.append('file', csvFile); // Match the server’s expected file name

      const response = await productService.newProduct(formData);

      if (response.error) {
        toast.error(response.error);
      } else {
        setProdId('');
        setProdName('');
        setCSVFile('');
        toast.success('Form submitted successfully');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || `Server error: ${error.message}`;
      toast.error(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-dvh dark:bg-primary_login_dark bg-white flex flex-col items-center justify-center">
      <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
      <Helmet>
        <title>Add new product</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="basis-2/3 pb-10">
        <div className="w-[40vw] p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg dark:shadow-white border sm:max-w-md xl:p-0
                        bg-white dark:bg-secondary_login_dark dark:border-gray-700 border-gray-300">
          <h1 className="text-center mt-4 text-xl font-semibold leading-tight tracking-tight md:text-2xl text-[#232d42] dark:text-white">
            Add new product
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="ml-4 mr-4">
              <label htmlFor="prodId" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                Product ID
              </label>
              <input
                type="text"
                name="prodId"
                id="prodId"
                value={prodId}
                onChange={(e) => setProdId(e.target.value)}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                              placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                placeholder="Enter product ID"
                required
                disabled={loading}
              />
            </div>
            <div className="ml-4 mr-4">
              <label htmlFor="prodName" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                name="prodName"
                id="prodName"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                              placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                placeholder="Enter product name"
                required
                disabled={loading}
              />
            </div>
            <div className="ml-4 mr-4">
              <label htmlFor="targetWeight" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                Target Weight
              </label>
              <input
                type="number"
                name="targetWeight"
                id="targetWeight"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                              placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                placeholder="Enter target weight"
                required
                disabled={loading}
              />
            </div>
            <div className="ml-4 mr-4">
              <label htmlFor="csvfile" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                CSV File
              </label>
              <input
                type="file"
                name="csvfile"
                id="csvfile"
                onChange={(e) => setCSVFile(e.target.files[0])}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                              placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                required
                disabled={loading}
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
