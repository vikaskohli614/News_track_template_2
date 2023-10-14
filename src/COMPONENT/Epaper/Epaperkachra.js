// import React, { useState,  } from 'react';
// import { Worker } from '@react-pdf-viewer/core';
// import { Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import { useLocation } from "react-router-dom";
// // import axios from 'axios';
// function Epaper_details() {
//   const location = useLocation();
//   const initialState = location.state
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   // const pdfUrl = `http://174.138.101.222:8080${initialState.pdf}`;
  // const pdfUrl = initialState.pdf;
//   const coordinate = initialState.sizes;
//   console.log(coordinate,'aaa')
//   const [pdf, setPdf] = useState(pdfUrl);

//   return (
//     <div >
//       <div className="viewer">
//         {pdf && (
//           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
//             <Viewer fileUrl={pdf}
//               plugins={[defaultLayoutPluginInstance]}
//               defaultScale={0.5}
//               defaultPage={1} />
//           </Worker>
//         )}
//         {!pdf && <>No file is selected yet</>}
//       </div>
//     </div>
//   );
// }

// export default Epaper_details;