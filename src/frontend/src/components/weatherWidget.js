import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * @function WeatherWidget
 * @description Renders a weather widget displaying the current temperature, weather description, and location.
 * @returns {JSX.Element} A React fragment containing a weather widget with the current temperature, weather description, and location.
 */
function WeatherWidget() {
    const [weatherResult, setWeather] = useState(null);
    const getCurrentWeather = async (lon, lat) => {
        let apiKey = process.env.REACT_APP_WEATHER_APP_APIKEY;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        let data = await fetch(url);
        let result = await data.json();
        console.log(result);
        setWeather(result);
    };

    useEffect(() => {
        getCurrentWeather(-96.3344, 30.628);
    }, []);

    if (weatherResult == null) {
        return (
            <div
                style={{
                    marginTop: "10px",
                    marginLeft: "48%",
                }}
            >
                <ClipLoader
                    size={50}
                    color={"#490905"}
                    loading={true}
                ></ClipLoader>
            </div>
        );
    }
    return (
        <>
            <div
                className="container-fluid text-white my-auto"
                style={{ maxWidth: "13%", maxHeight: "20%" }}
            >
                <div className="container mx-auto my-4 py-4">
                    <div className="row justify-content-center text-center">
                        <p
                            className="col-12"
                            style={{ backgroundColor: "#490905" }}
                        >
                            {weatherResult.main.temp} &#8451;,{" "}
                            {weatherResult.weather[0].description} in{" "}
                            {weatherResult.name}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeatherWidget;
