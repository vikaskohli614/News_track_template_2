import React, { useState, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useLocation } from "react-router-dom";
import axios from 'axios';
function Epaper_details() {
  const location = useLocation();
  const initialState = location.state
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdfUrl = `http://174.138.101.222:8080${initialState.pdf}`;
  const [pdf, setPdf] = useState(pdfUrl);
  const [size, setSize] = useState(pdfUrl);



  // const fetchPageSize = async () => {
  //   let formdata = new FormData();
  //   formdata.append("pdf", pdf);
  //   try {
  //     const response = await axios.post(
  //       "http://174.138.101.222:5000/api/coordinate",
  //       formdata,
  //       {
  //         headers: {
  //           "Content-type": "multipart/form-date",
  //         },
  //       }
  //     );

  //     response.data.coordinates.forEach((item, index) => {
  //       setSize((prevSize) => ({
  //         ...prevSize,
  //         [index]: item[1],
  //       }));
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     console.error("Response Data:", error.response.data);
  //     alert("Error Occured");
  //   }
  // };

  // const fetchPageSize = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://174.138.101.222:5000/api/coordinate",
  //       { pdf: pdfUrl }, // Send the PDF URL as a JSON object
  //       {
  //         headers: {
  //           "Content-Type": "application/json", // Use JSON content type
  //         },
  //       }
  //     );

  //     response.data.coordinates.forEach((item, index) => {
  //       setSize((prevSize) => ({
  //         ...prevSize,
  //         [index]: item[1],
  //       }));
  //     });
  //   } catch (error) {
  //     console.error("Axios Error:", error);
  //     console.error("Response Data:", error.response.data);
  //     alert("Error Occurred");
  //   }
  // };


  // useEffect(() => {
  //   fetchPageSize()
  // }, []);



  return (
    <div >
      {/* <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <h5>{initialState.category}</h5>
      </div> */}
      <div className="viewer">
        {pdf && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer fileUrl={pdf}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={0.5}
              defaultPage={1} />
          </Worker>
        )}
        {!pdf && <>No file is selected yet</>}
      </div>
    </div>
  );
}

export default Epaper_details;
